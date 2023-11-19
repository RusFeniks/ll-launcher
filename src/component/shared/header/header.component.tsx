'use client';

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      href: "/",
    },
    {
      id: 2,
      title: "Дополнения",
      href: "/addons",
    },
    {
      id: 3,
      title: "Настройки",
      href: "/settings",
    },
  ];

  const pathName = usePathname();

  return (
    <header className={classNames(style["header"], props.className)}>
      <div className={style["header__brand"]}>
        <Image
          className={style["header__icon"]}
          src="icon.svg"
          alt="Иконка проекта"
          width={40}
          height={44}
        />
        <div>
          <h1 className={style["header__title"]}>Lost Lands</h1>
          <p className={style["header__description"]}>
            Сервер Minecraft на краю света
          </p>
        </div>
      </div>
      <nav className={style["header__navigation-wrapper"]}>
        {navigationLinks.map((link) => (
          <Link
            key={link.id}
            className={classNames(
              style["header__navigation-link"],
              pathName === link.href &&
                style["header__navigation-link--current"]
            )}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
