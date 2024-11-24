import AddonInfo from "@/models/addons/addon-info.interface";

/**
 * Сервис для работы с клиентскими дополнениями.
 */
export default class AddonsService {
  private addonsInfo?: AddonInfo[];

  public async getAddonsInfo(refresh: boolean = false): Promise<AddonInfo[]> {
    return !this.addonsInfo || refresh
      ? this.getAddonsFromApi()
      : this.addonsInfo;
  }

  private async getAddonsFromApi(): Promise<AddonInfo[]> {
    const apiUrl = "";

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((addonsInfo) => {
        this.addonsInfo = addonsInfo;

        return addonsInfo;
      });
  }
}
