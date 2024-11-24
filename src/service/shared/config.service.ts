"use client";
import { path } from "@tauri-apps/api";

export interface Config {
  [key: string]: string;

  ram: string;
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
  public async getAll(): Promise<Config> {
    if (this.cachedConfig) {
      return this.cachedConfig;
    }

    const config = this.getFromLocalStorage() || (await this.getDefaults());
    this.cachedConfig = config;

    return this.cachedConfig;
  }

  /**
   * Получить значение конфигурации по ключу
   */
  public async getByKey(key: string): Promise<any> {
    const config = await this.getAll();

    return config[key];
  }

  /**
   * Сохранить значение конфигурации по ключу
   */
  public async setByKey(key: string, value: any): Promise<void> {
    const config = await this.getAll();

    config[key] = value;

    this.saveToLocalStorage(config);
  }

  /**
   * Получить конфигурацию по-умолчанию
   */
  public async getDefaults(): Promise<Config> {
    return {
      ram: "2000",
      gamePath: await path.appDataDir(),
      javaPath: "javaw",
      launchParams: "",
    } as Config;
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
}
