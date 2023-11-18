import { AddonInfo } from "@/app/addons/page";
import styles from "./addon-info.styles.module.scss";

interface AddonInfoProps {
  addon: AddonInfo;
}

export default function AddonInfoComponent({ addon }: AddonInfoProps) {
  return (
    <div className={styles["addon-info"]}>
      <div className={styles["addon-info__header"]}>
        {addon.image && (
          <img src={addon.image} className={styles["addon-info__image"]} />
        )}
        <div className={styles["addon-info__header-content"]}>
          <h2 className={styles["addon-info__title"]}>{addon.title}</h2>
          {(addon.website || addon.guideLink) && (
            <div className={styles["addon-info__links"]}>
              {addon.website && (
                <a
                  href={addon.website}
                  target="__blank"
                  className={styles["addon-info__website-link"]}
                >
                  Сайт
                </a>
              )}
              {addon.guideLink && (
                <a
                  href={addon.guideLink}
                  target="__blank"
                  className={styles["addon-info__guide-link"]}
                >
                  Гайд
                </a>
              )}
            </div>
          )}
          <div className={styles["addon-info__controls"]}>
            <button className={styles["addon-info__install-button"]}>
              <img
                src="/install-icon.svg"
                className={styles["addon-info__install-icon"]}
                draggable="false"
              ></img>
              Установить
            </button>
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
