import { render } from "@testing-library/react";
import Header from "./header.component";

describe("Header", () => {
  it("должен содержать ожидаемые динамически-сгенерированные ссылки", () => {
    const { container } = render(<Header />);

    const links = container.querySelectorAll<HTMLLinkElement>(
      ".header__navigation-link"
    );

    expect(links.length).toBe(3);

    const navigationLinks = [
      {
        title: "Новости",
        href: "/",
      },
      {
        title: "Дополнения",
        href: "/addons",
      },
      {
        title: "Настройки",
        href: "/settings",
      },
    ];

    links.forEach((link: HTMLLinkElement, index: number) => {
      expect(link.innerHTML).toBe(navigationLinks[index].title);
      expect(link.href).toBe(`http://localhost${navigationLinks[index].href}`);
    });
  });
});
