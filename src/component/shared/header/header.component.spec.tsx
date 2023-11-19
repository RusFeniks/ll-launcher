import { act, render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Header from "./header.component";

jest.mock("next/navigation");

describe("Компонент шапки", () => {
  const CURRENT_LINK_CLASS = "header__navigation-link--current";

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

  it("выделить текущую ссылку", async () => {
    const usePathnameMock = usePathname as jest.Mock;

    usePathnameMock.mockReturnValue("/");

    const renderResult1 = await act(async () => render(<Header />));

    expect(usePathnameMock).toHaveBeenCalled();

    let links = renderResult1.container.querySelectorAll<HTMLLinkElement>(
      ".header__navigation-link"
    );

    expect(links[0]).toHaveClass(CURRENT_LINK_CLASS);
    expect(links[1]).not.toHaveClass(CURRENT_LINK_CLASS);
    expect(links[2]).not.toHaveClass(CURRENT_LINK_CLASS);

    usePathnameMock.mockReturnValue("/addons");

    const renderResult2 = await act(async () => render(<Header />));

    expect(usePathnameMock).toHaveBeenCalled();

    links = renderResult2.container.querySelectorAll<HTMLLinkElement>(
      ".header__navigation-link"
    );

    expect(links[0]).not.toHaveClass(CURRENT_LINK_CLASS);
    expect(links[1]).toHaveClass(CURRENT_LINK_CLASS);
    expect(links[2]).not.toHaveClass(CURRENT_LINK_CLASS);
  });
});
