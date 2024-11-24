"use client";
import Row from "@/component/settings/row/row.component";
import { Config } from "@/service/shared/config.service";
import { open } from "@tauri-apps/plugin-dialog";
import classNames from "classnames";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServiceContainer } from "../service.provider";
import styles from "./page.styles.module.scss";

const JAVA_PATH = "javaPath";
const GAME_PATH = "gamePath";

export default function Settings() {
  const [config, setConfig] = useState<Config>();
  const { configService } = useContext(ServiceContainer);

  useEffect(() => {
    configService.getAll().then(setConfig);
  }, []);

  /**
   * Изменение параметра по ключу через текстовое поле.
   */
  const updateConfigWhenInputChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const [key, value] = [event.target.name, event.target.value];

      configService.setByKey(key, value);

      const newData = { [key]: value };
      setConfig(Object.assign({}, config, newData));
    },
    [config]
  );

  /**
   * Выбор пути к папке с игрой
   */
  const selectGamePath = useCallback(() => {
    open({
      directory: true,
      multiple: false,
      defaultPath: config?.gamePath,
    }).then((newPath) => {
      if (!newPath) return;
      configService.setByKey(GAME_PATH, newPath);
      setConfig(Object.assign({}, config, { gamePath: newPath } as Config));
    });
  }, [config]);

  /**
   * Сброс пути к папке с игрой
   */
  const resetGamePath = useCallback(() => {
    configService.getDefaults().then((defaultConfig) => {
      configService.setByKey(GAME_PATH, defaultConfig.gamePath);
      setConfig(
        Object.assign({}, config, {
          gamePath: defaultConfig.gamePath,
        } as Config)
      );
    });
  }, [config]);

  /**
   * Выбор пути к исполняемому файлу Java
   */
  const selectJavaPath = useCallback(() => {
    open({
      directory: false,
      multiple: false,
      defaultPath: config?.javaPath,
    }).then((newPath) => {
      if (newPath) return;
      configService.setByKey(JAVA_PATH, newPath);
      setConfig(Object.assign({}, config, { javaPath: newPath } as Config));
    });
  }, [config]);

  /**
   * Сброс пути к исполняемому файлу Java
   */
  const resetJavaPath = useCallback(() => {
    configService.getDefaults().then((defaultConfig) => {
      configService.setByKey(JAVA_PATH, defaultConfig.javaPath);
      setConfig(
        Object.assign({}, config, {
          javaPath: defaultConfig.javaPath,
        } as Config)
      );
    });
  }, [config]);

  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__form"]}>
        <Row label="Выделяемая оперативная память:">
          <input
            name="ram"
            type="number"
            defaultValue={config?.ram}
            className={styles["settings__input"]}
            onChange={updateConfigWhenInputChanged}
          />
        </Row>

        <Row label="Путь до клиента игры:">
          <input
            name="gamePath"
            type="text"
            className={styles["settings__input"]}
            defaultValue={config?.gamePath}
            readOnly
          />
          <button
            name="selectGamePath"
            type="button"
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
            onClick={selectGamePath}
          >
            Выбрать папку
          </button>
          <button
            name="resetGamePath"
            type="button"
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
            onClick={resetGamePath}
          >
            Сброс
          </button>
        </Row>

        <Row label="Путь до установленной Java:">
          <input
            name="javaPath"
            type="text"
            className={styles["settings__input"]}
            defaultValue={config?.javaPath}
            readOnly
          />
          <button
            name="selectJavaPath"
            type="button"
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
            onClick={selectJavaPath}
          >
            Выбрать файл
          </button>
          <button
            name="resetJavaPath"
            type="button"
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
            onClick={resetJavaPath}
          >
            Сброс
          </button>
        </Row>

        <Row label="Параметры запуска:">
          <input
            name="launchParams"
            type="text"
            className={styles["settings__input"]}
            defaultValue={config?.launchParams}
            onChange={updateConfigWhenInputChanged}
          />
        </Row>

        <Row label="">
          <button
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
          >
            Принудительно проверить обновления клиента
          </button>
        </Row>

        <Row label="">
          <button
            className={classNames(
              styles["settings__button"],
              styles["settings__button--secondary"]
            )}
          >
            Открыть папку пользовательских модов
          </button>
        </Row>
      </div>
    </div>
  );
}
