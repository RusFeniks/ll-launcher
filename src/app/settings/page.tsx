"use client";
import { ChangeEvent, useContext } from "react";
import { ServiceContainer } from "../service.provider";
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
  const { configService } = useContext(ServiceContainer);
  const config = configService.getAll();

  function updateConfig(key: string, value: any) {
    configService.setByKey(key, value);
  }

  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__form"]}>
        <SettingsRow label="Выделяемая оперативная память:">
          <input
            type="number"
            className={styles["settings__input"]}
            defaultValue={config.ram}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              updateConfig("ram", Number(event.target.value));
            }}
          />
        </SettingsRow>

        <SettingsRow label="Путь до клиента игры:">
          <input
            type="text"
            className={styles["settings__input"]}
            defaultValue={config.gamePath}
            readOnly
          />
          <button className={styles["settings__button"]}>Выбрать папку</button>
          <button className={styles["settings__button"]}>Сброс</button>
        </SettingsRow>

        <SettingsRow label="Путь до установленной Java:">
          <input
            type="text"
            className={styles["settings__input"]}
            defaultValue={config.javaPath}
            readOnly
          />
          <button className={styles["settings__button"]}>Выбрать папку</button>
          <button className={styles["settings__button"]}>Сброс</button>
        </SettingsRow>

        <SettingsRow label="Параметры запуска:">
          <input
            type="text"
            className={styles["settings__input"]}
            defaultValue={config.launchParams}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              updateConfig("launchParams", event.target.value);
            }}
          />
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
