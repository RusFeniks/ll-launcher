import classNames from "classnames";
import Image from "next/image";
import style from "./header.styles.module.scss";

interface HeaderProps {
  className?: string;
}

interface NavigationLink {
  id: number;
  title: string;
  href: string;
}

export default function Header(props: HeaderProps) {
  const navigationLinks: NavigationLink[] = [
    {
      id: 1,
      title: "Новости",
      href: "#",
    },
    {
      id: 2,
      title: "Дополнения",
      href: "#",
    },
    {
      id: 3,
      title: "Настройки",
      href: "#",
    },
  ];

  return (
    <div className={classNames(style["header"], props.className)}>
      <Image
        className={style["header__logotype"]}
        src="logotype.png"
        alt="Логотип проекта"
        width={407}
        height={63}
      />
      <nav className={style["header__navigation-wrapper"]}>
        {navigationLinks.map((link) => (
          <a
            key={link.id}
            className={style["header__navigation-link"]}
            href={link.href}
          >
            {link.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
