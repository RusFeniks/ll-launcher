import AddonInfo from "@/models/addons/addon-info.interface";
import AddonsService from "./addons.service";

describe("Сервис работы с дополнениями", () => {
  const serverResponse: AddonInfo[] = [
    {
      id: 1,
      title: "Название дополнения #1",
      description: "Описание дополнения",
      files: [
        {
          downloadUrl: "https://test.ru/file1.jar",
          installPath: "mods",
          hash: "aaabb123ccc456dd",
        },
        {
          downloadUrl: "https://test.ru/file2.zip",
          installPath: "resources",
          hash: "123abcd456dcba0",
        },
      ],
    },
  ];

  let addonsService: AddonsService;

  beforeEach(() => {
    addonsService = new AddonsService();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(serverResponse),
      })
    ) as jest.Mock;
  });

  describe("получение списка дополнений", () => {
    it("должен получить с backend список дополнений и вернуть его", async () => {
      const resultAddonsList = await addonsService.getAddonsInfo();

      expect(global.fetch).toHaveBeenCalled();
      expect(resultAddonsList).toStrictEqual(serverResponse);
    });

    it("должен закешировать полученный список дополнений и вернуть его", async () => {
      const resultAddonsListBeforeCaching = await addonsService.getAddonsInfo();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(resultAddonsListBeforeCaching).toStrictEqual(serverResponse);

      const resultAddonsListAfterCaching = await addonsService.getAddonsInfo();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(resultAddonsListAfterCaching).toStrictEqual(serverResponse);
    });

    it("должен запросить список дополнений у сервера, даже если он закеширован", async () => {
      const resultAddonsListFirstRequest = await addonsService.getAddonsInfo();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(resultAddonsListFirstRequest).toStrictEqual(serverResponse);

      const resultAddonsListSecondRequest = await addonsService.getAddonsInfo(
        true
      );

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(resultAddonsListSecondRequest).toStrictEqual(serverResponse);
    });

    it("если сервер вернул ошибку, должен перенаправить её пользователю", async () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Текст ошибки"))
      ) as jest.Mock;

      await expect(addonsService.getAddonsInfo()).rejects.toThrow(
        "Текст ошибки"
      );
    });
  });
});
