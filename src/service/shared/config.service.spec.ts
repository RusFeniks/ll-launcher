import ConfigService from "./config.service";

describe("Сервис работы с конфигурациями", () => {
  it(
    "при первом обращении к сервису, с целью получения данных," +
      " должен подтянуть эти данные и закешировать их, для последующего переиспользования",
    async () => {
      const localStorageGetItemMock = jest.spyOn(Storage.prototype, "getItem");
      localStorageGetItemMock.mockReturnValue(
        JSON.stringify({
          ram: 4000,
          gamePath: "/home/.minecraft",
        })
      );

      const configService = new ConfigService();

      const dataBeforeCaching = await configService.getAll();

      expect(localStorageGetItemMock).toHaveBeenCalledTimes(1);
      expect(localStorageGetItemMock).toHaveBeenLastCalledWith("config");

      expect(dataBeforeCaching).toStrictEqual({
        ram: 4000,
        gamePath: "/home/.minecraft",
      });

      const dataAfterCaching = await configService.getAll();

      expect(localStorageGetItemMock).toHaveBeenCalledTimes(1);

      expect(dataAfterCaching).toStrictEqual({
        ram: 4000,
        gamePath: "/home/.minecraft",
      });
    }
  );

  it("при сохранении данных по ключу, должен вызвать метод хранилища и обновить закешированные данные", async () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, "getItem");
    localStorageGetItemMock.mockReturnValue(
      JSON.stringify({
        ram: 4000,
        gamePath: "/home/.minecraft",
      })
    );

    const localStorageSetItemMock = jest.spyOn(Storage.prototype, "setItem");

    const configService = new ConfigService();

    const ramBeforeUpdating = await configService.getByKey("ram");

    expect(ramBeforeUpdating).toBe(4000);

    await configService.setByKey("ram", 2000);

    expect(localStorageSetItemMock).toHaveBeenCalled();
    expect(localStorageSetItemMock).toHaveBeenCalledWith(
      "config",
      JSON.stringify({
        ram: 2000,
        gamePath: "/home/.minecraft",
      })
    );

    const ramAfterUpdating = await configService.getByKey("ram");

    expect(ramAfterUpdating).toBe(2000);
  });
});
