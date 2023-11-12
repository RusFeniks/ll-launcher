"use client";

interface Config {
  [key: string]: any;

  ram: number;
  launchParams: string;
  gamePath: string;
  javaPath: string;
}

export default class ConfigService {
  /**
   * Сохраненная для переиспользования конфигурация
   */
  private cachedConfig?: Config;

  /**
   * Получить объект конфигурации
   */
  public getAll(): Config {
    if (this.cachedConfig) {
      return this.cachedConfig;
    }

    const config = this.getFromLocalStorage() || this.getDefaults();
    this.cachedConfig = config;

    return this.cachedConfig;
  }

  /**
   * Получить значение конфигурации по ключу
   */
  public getByKey(key: string): any {
    const config = this.getAll();

    return config[key];
  }

  /**
   * Сохранить значение конфигурации по ключу
   */
  public setByKey(key: string, value: any): void {
    const config = this.getAll();

    config[key] = value;

    this.saveToLocalStorage(config);
  }

  /**
   * Получить конфигурацию с локального хранилища
   */
  private getFromLocalStorage(): Config | null {
    if (typeof localStorage == "undefined") {
      return null;
    }

    const configString = localStorage.getItem("config");

    return configString ? (JSON.parse(configString) as Config) : null;
  }

  /**
   * Сохранить объект конфигурации в локальное хранилище
   */
  private saveToLocalStorage(config: Config): void {
    if (typeof localStorage == "undefined") {
      return;
    }

    const configString = JSON.stringify(config);
    localStorage.setItem("config", configString);
  }

  /**
   * Получить конфигурацию по-умолчанию
   */
  private getDefaults(): Config {
    return {
      ram: 3000,
      launchParams: "",
      gamePath: "%appdata%/.lost-lands",
      javaPath: "javaw",
    } as Config;
  }
}
