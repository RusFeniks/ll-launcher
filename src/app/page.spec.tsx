import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Домашняя страница", () => {
  it("должна получить с backend список новостей и отрисовать их", async () => {
    const returnedNews = [
      {
        id: 1,
        date: "2023-06-19 13:42:09",
        content: "Содержимое первой новости",
      },
      {
        id: 2,
        date: "2023-05-09 09:50:55",
        content: "Содержимое второй новости.",
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(returnedNews),
      })
    ) as jest.Mock;

    const { container } = render(await Home());

    const news = container.querySelectorAll<HTMLDivElement>(
      "article.home__news-element"
    );

    expect(container.querySelector(".home__news-error")).toBeNull();
    expect(news.length).toBe(2);

    const expectedNews = [
      {
        date: "19.06.2023",
        content: "Содержимое первой новости",
      },
      {
        date: "09.05.2023",
        content: "Содержимое второй новости.",
      },
    ];

    expectedNews.forEach((newsData) => {
      expect(screen.queryByText(newsData.date)).toBeInTheDocument();
      expect(screen.queryByText(newsData.content)).toBeInTheDocument();
    });
  });

  it("при возникновении ошибки, во время получения новостей, отобразить эту ошибку клиенту", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Текст ошибки'))
    ) as jest.Mock;

    const { container } = render(await Home());

    const news = container.querySelectorAll<HTMLDivElement>(
      "article.home__news-element"
    );

    expect(news.length).toBe(0);

    const error = screen.queryByText("Ошибка при получении новостей: Текст ошибки");

    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('home__news-error');
  });
});
