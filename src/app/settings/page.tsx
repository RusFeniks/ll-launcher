import styles from "./page.styles.module.scss";

interface SettingsRowProps {
  label: string;
  children: any;
}

const SettingsRow = (props: SettingsRowProps) => (
  <div className={styles["settings__row"]}>
    <label>{props.label}</label>
    <div className={styles["settings__input-group"]}>{props.children}</div>
  </div>
);

export default function Settings() {
  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__form"]}>
        <SettingsRow label="Выделяемая оперативная память:">
          <input type="number" className={styles["settings__input"]} />
        </SettingsRow>

        <SettingsRow label="Путь до клиента игры:">
          <input type="text" className={styles["settings__input"]} readOnly />
          <button className={styles["settings__button"]}>Выбрать папку</button>
          <button className={styles["settings__button"]}>Сброс</button>
        </SettingsRow>

        <SettingsRow label="Путь до установленной Java:">
          <input type="text" className={styles["settings__input"]} readOnly />
          <button className={styles["settings__button"]}>Выбрать папку</button>
          <button className={styles["settings__button"]}>Сброс</button>
        </SettingsRow>

        <SettingsRow label="Параметры запуска:">
          <input type="text" className={styles["settings__input"]} />
        </SettingsRow>

        <SettingsRow label="">
          <button className={styles["settings__button"]}>
            Принудительно проверить обновления клиента
          </button>
        </SettingsRow>

        <SettingsRow label="">
          <button className={styles["settings__button"]}>
            Открыть папку пользовательских модов
          </button>
        </SettingsRow>
      </div>
    </div>
  );
}
