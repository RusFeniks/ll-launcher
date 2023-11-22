import { queryAllByClass, queryByClass } from "@/utils/test-helper.util";
import { act, fireEvent, render } from "@testing-library/react";
import Addons, { AddonInfo } from "./page";

describe("Страница дополнений", () => {
  const addonsList: AddonInfo[] = [
    {
      id: 1,
      title: "Мод с полностью заполненными полями",
      description:
        "Описание первого мода, включающее в себя <strong>HTML-разметку</strong>.",
      guideLink: "https://test.ru/mods/1/guide",
      website: "https://test.ru/mod/1/website",
      image: "mod-01-image.png",
    },
    {
      id: 2,
      title: "Мод без картинки",
      description:
        "Описание второго мода, включающее в себя <strong>HTML-разметку</strong>.",
      guideLink: "https://test.ru/mods/2/guide",
      website: "https://test.ru/mod/2/website",
    },
    {
      id: 3,
      title: "Мод без ссылки на гайд",
      description:
        "Описание третьего мода, включающее в себя <strong>HTML-разметку</strong>.",
      website: "https://test.ru/mod/3/website",
      image: "mod-03-image.png",
    },
    {
      id: 4,
      title: "Мод без ссылки на вебсайт",
      description:
        "Описание четвертого мода, включающее в себя <strong>HTML-разметку</strong>.",
      guideLink: "https://test.ru/mods/4/guide",
      image: "mod-04-image.png",
    },
    {
      id: 5,
      title: "Мод с минимально заполненным содержимым",
      description:
        "Описание пятого мода, включающее в себя <strong>HTML-разметку</strong>.",
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(addonsList),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("должна запросить с backend список дополнений и вывести их", async () => {
    const { container } = await act(() => render(<Addons />));

    expect(global.fetch as jest.Mock).toHaveBeenCalled();

    const rows = queryAllByClass(container, "addon-row");

    expect(rows).toHaveLength(5);

    addonsList.forEach((addonInfo: AddonInfo, index: number) => {
      expect(rows[index].innerHTML).toBe(addonInfo.title);
    });
  });

  it('при ошибке получения данных с backend вывести ошибку и ссылку "попробовать снова"', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Текст ошибки"))
    ) as jest.Mock;

    const renderResult = await act(() => render(<Addons />));

    expect(global.fetch as jest.Mock).toHaveBeenCalled();

    expect(
      renderResult.queryByText("Ошибка получения: Текст ошибки")
    ).toBeInTheDocument();
  });

  it('при клике на "попробовать снова" заново пытаться получить данные с backend', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Текст ошибки"))
    ) as jest.Mock;

    const renderResult = await act(() => render(<Addons />));

    expect(global.fetch as jest.Mock).toHaveBeenCalled();

    const updateLink = renderResult.queryByText("Попробовать снова");

    expect(updateLink).toBeInTheDocument();

    await act(() => fireEvent.click(updateLink!));

    expect(global.fetch as jest.Mock).toHaveBeenCalledTimes(2);
  });

  it("при клике на дополнение с полностью заполненными полями в списке, необходимо вывести всю его информацию", async () => {
    const { container } = await act(() => render(<Addons />));

    const rows = queryAllByClass(container, "addon-row");

    expect(queryByClass(container, "addon-info")).not.toBeInTheDocument();

    await act(() => fireEvent.click(rows[0]));

    const addonInfo = queryByClass(container, "addon-info");

    expect(addonInfo).toBeInTheDocument();

    expect(queryByClass(addonInfo!, "addon-info__title")).toContainHTML(
      addonsList[0].title
    );

    expect(queryByClass(addonInfo!, "addon-info__description")).toContainHTML(
      addonsList[0].description
    );

    expect(
      queryByClass(addonInfo!, "addon-info__website-link")
    ).toHaveAttribute("href", addonsList[0].website!);

    expect(queryByClass(addonInfo!, "addon-info__guide-link")).toHaveAttribute(
      "href",
      addonsList[0].guideLink!
    );

    expect(queryByClass(addonInfo!, "addon-info__image")).toHaveAttribute(
      "src",
      addonsList[0].image!
    );
  });

  it("при клике на дополнение с минимально заполненными полями в списке, необходимо вывести его информацию", async () => {
    const { container } = await act(() => render(<Addons />));

    const rows = queryAllByClass(container, "addon-row");

    expect(queryByClass(container, "addon-info")).not.toBeInTheDocument();

    await act(() => fireEvent.click(rows[4]));

    const addonInfo = queryByClass(container, "addon-info");

    expect(addonInfo).toBeInTheDocument();

    expect(addonInfo).toBeInTheDocument();

    expect(queryByClass(addonInfo!, "addon-info__title")).toContainHTML(
      addonsList[4].title
    );

    expect(queryByClass(addonInfo!, "addon-info__description")).toContainHTML(
      addonsList[4].description
    );

    expect(
      queryByClass(addonInfo!, "addon-info__website-link")
    ).not.toBeInTheDocument();

    expect(
      queryByClass(addonInfo!, "addon-info__guide-link")
    ).not.toBeInTheDocument();

    expect(
      queryByClass(addonInfo!, "addon-info__image")
    ).not.toBeInTheDocument();
  });

  it("при переключении между дополнениями в списке, менять информацию выводимую пользователю", async () => {
    const { container } = await act(() => render(<Addons />));

    const rows = queryAllByClass(container, "addon-row");

    expect(queryByClass(container, "addon-info")).not.toBeInTheDocument();

    await act(() => fireEvent.click(rows[0]));

    const addonInfo = queryByClass(container, "addon-info");

    expect(addonInfo).toBeInTheDocument();

    expect(queryByClass(addonInfo!, "addon-info__title")).toContainHTML(
      addonsList[0].title
    );

    await act(() => fireEvent.click(rows[4]));

    expect(addonInfo).toBeInTheDocument();

    expect(queryByClass(addonInfo!, "addon-info__title")).toContainHTML(
      addonsList[4].title
    );
  });
});
