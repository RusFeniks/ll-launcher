import styles from "./page.styles.module.scss";

export default function Settings() {
  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__form"]}>
        <div className={styles["settings__row"]}>
          <label>Выделяемая оперативная память:</label>
          <div className={styles["settings__input-group"]}>
            <input type="number" className={styles["settings__input"]} />
          </div>
        </div>

        <div className={styles["settings__row"]}>
          <label>Путь до клиента игры:</label>
          <div className={styles["settings__input-group"]}>
            <input type="text" className={styles["settings__input"]} readOnly/>
            <button className={styles["settings__button"]}>
              Выбрать папку
            </button>
            <button className={styles["settings__button"]}>Сброс</button>
          </div>
        </div>

        <div className={styles["settings__row"]}>
          <label>Путь до установленной Java:</label>
          <div className={styles["settings__input-group"]}>
            <input type="text" className={styles["settings__input"]} readOnly/>
            <button className={styles["settings__button"]}>
              Выбрать папку
            </button>
            <button className={styles["settings__button"]}>Сброс</button>
          </div>
        </div>

        <div className={styles["settings__row"]}>
          <label>Параметры запуска:</label>
          <div className={styles["settings__input-group"]}>
            <input type="text" className={styles["settings__input"]} />
          </div>
        </div>

        <div className={styles["settings__row"]}>
          <label></label>
          <div className={styles["settings__input-group"]}>
            <button className={styles["settings__button"]}>Принудительно проверить обновления клиента</button>
          </div>
        </div>

        <div className={styles["settings__row"]}>
          <label></label>
          <div className={styles["settings__input-group"]}>
            <button className={styles["settings__button"]}>Открыть папку пользовательских модов</button>
          </div>
        </div>
      </div>
    </div>
  );
}
