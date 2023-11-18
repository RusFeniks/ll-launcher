import { AddonInfo } from "@/app/addons/page";
import styles from "./addon-info.styles.module.scss";

interface AddonInfoProps {
  addon: AddonInfo;
}

/**
 * Картинка-превью дополнения
 */
const AddonImage = (src: string) => (
  <img src={src} className={styles["addon-info__image"]} />
);

/**
 * Кнопка "Установить"
 */
const InstallButton = () => (
  <button className={styles["addon-info__install-button"]}>
    <img
      src="/install-icon.svg"
      className={styles["addon-info__install-icon"]}
      draggable="false"
    ></img>
    Установить
  </button>
);

/**
 * Ссылка на официальный веб-ресурс модификации
 */
const WebsiteLink = (href: string) => (
  <a
    href={href}
    target="__blank"
    className={styles["addon-info__website-link"]}
  >
    Официальный сайт
  </a>
);

/**
 * Ссылка на гайд или обзор модификации
 */
const GuideLink = (href: string) => (
  <a href={href} target="__blank" className={styles["addon-info__guide-link"]}>
    Обзор мода
  </a>
);

/**
 * Информация о дополнении
 */
export default function AddonInfoComponent({ addon }: AddonInfoProps) {
  const isLinksShowed = Boolean(addon.guideLink || addon.website);

  return (
    <div className={styles["addon-info"]}>
      <div className={styles["addon-info__header"]}>
        {addon.image && AddonImage(addon.image)}
        <div className={styles["addon-info__header-content"]}>
          <h2 className={styles["addon-info__title"]}>{addon.title}</h2>
          {isLinksShowed && (
            <div className={styles["addon-info__links"]}>
              {addon.website && WebsiteLink(addon.website)}
              {addon.guideLink && GuideLink(addon.guideLink)}
            </div>
          )}
          <div className={styles["addon-info__controls"]}>
            <InstallButton />
          </div>
        </div>
      </div>
      <div className={styles["addon-info__separator"]}></div>
      <p
        className={styles["addon-info__description"]}
        dangerouslySetInnerHTML={{ __html: addon.description }}
      ></p>
    </div>
  );
}
