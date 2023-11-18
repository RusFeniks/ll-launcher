import ConfigService, { Config } from "@/service/shared/config.service";
import { queryByName } from "@/utils/test-helper.util";
import { mockIPC } from "@tauri-apps/api/mocks";
import { act, fireEvent, render } from "@testing-library/react";
import Settings from "./page";

jest.mock("@/service/shared/config.service");

describe("Страница настроек", () => {
  const configServiceGetAllMock = ConfigService.prototype.getAll as jest.Mock;
  const configServiceGetDefaultsMock = ConfigService.prototype
    .getDefaults as jest.Mock;
  const configServiceSetByKeyMock = ConfigService.prototype
    .setByKey as jest.Mock;

  const localStorageConfig: Config = {
    ram: "3000",
    gamePath: "test/game/path",
    javaPath: "test/java/path",
    launchParams: "--test-launch-params",
  };

  beforeEach(() => {
    configServiceGetAllMock.mockResolvedValue(localStorageConfig);
  });

  afterEach(() => {
    (ConfigService as jest.Mock).mockClear();
  });

  it(
    "При инициализации должна запросить настройки у сервиса ConfigService" +
      " и заполнить полученными значениями поля",
    async () => {
      const { container } = await act(async () => render(<Settings />));

      expect(configServiceGetAllMock).toHaveBeenCalled();

      expect(queryByName(container, "ram")).toHaveDisplayValue(
        localStorageConfig.ram
      );

      expect(queryByName(container, "gamePath")).toHaveDisplayValue(
        localStorageConfig.gamePath
      );

      expect(queryByName(container, "javaPath")).toHaveDisplayValue(
        localStorageConfig.javaPath
      );

      expect(queryByName(container, "launchParams")).toHaveDisplayValue(
        localStorageConfig.launchParams
      );
    }
  );

  it(
    'по нажатию кнопки "сброс" устанавливать полю "gamePath" ' +
      'значение "по умолчанию", полученное от сервиса ConfigService ' +
      "и вызывать метод на обновление конфигурации",
    async () => {
      const { container } = await act(async () => render(<Settings />));

      expect(queryByName(container, "gamePath")).toHaveDisplayValue(
        localStorageConfig.gamePath
      );

      const resetGamePathButton = queryByName<HTMLButtonElement>(
        container,
        "resetGamePath"
      )!;

      const defaultConfig: Config = {
        ram: "2000",
        gamePath: "test/default/game/path",
        javaPath: "test/default/java/path",
        launchParams: "--test-default-launch-params",
      };

      configServiceGetDefaultsMock.mockResolvedValue(defaultConfig);

      await act(async () => fireEvent.click(resetGamePathButton));

      expect(configServiceGetDefaultsMock).toHaveBeenCalled();
      expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith(
        "gamePath",
        defaultConfig.gamePath
      );

      expect(queryByName(container, "gamePath")).toHaveDisplayValue(
        defaultConfig.gamePath
      );
    }
  );

  it(
    'по нажатию кнопки "сброс" устанавливать полю "javaPath" ' +
      'значение "по умолчанию", полученное от сервиса ConfigService ' +
      "и вызывать метод на обновление конфигурации",
    async () => {
      const { container } = await act(async () => render(<Settings />));

      expect(queryByName(container, "javaPath")).toHaveDisplayValue(
        localStorageConfig.javaPath
      );

      const resetJavaPathButton = queryByName<HTMLButtonElement>(
        container,
        "resetJavaPath"
      )!;

      const defaultConfig: Config = {
        ram: "2000",
        gamePath: "test/default/game/path",
        javaPath: "test/default/java/path",
        launchParams: "--test-default-launch-params",
      };

      configServiceGetDefaultsMock.mockResolvedValue(defaultConfig);

      await act(async () => fireEvent.click(resetJavaPathButton));

      expect(configServiceGetDefaultsMock).toHaveBeenCalledTimes(2);
      expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith(
        "javaPath",
        defaultConfig.javaPath
      );

      expect(queryByName(container, "javaPath")).toHaveDisplayValue(
        defaultConfig.javaPath
      );
    }
  );

  it('при вводе данных в поле "ram", вызывать метод на обновление конфигурации', async () => {
    const { container } = await act(async () => render(<Settings />));

    const ramInput = queryByName<HTMLInputElement>(container, "ram")!;

    expect(ramInput).toHaveDisplayValue(localStorageConfig.ram);

    const newValue = "1500";

    await act(async () =>
      fireEvent.change(ramInput, {
        target: {
          value: newValue,
        },
      })
    );

    expect(ramInput).toHaveDisplayValue(newValue);
    expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith("ram", newValue);
  });

  it('при вводе данных в поле "launchParams", вызывать метод на обновление конфигурации', async () => {
    const { container } = await act(async () => render(<Settings />));

    const launchParamsInput = queryByName<HTMLInputElement>(
      container,
      "launchParams"
    )!;

    expect(launchParamsInput).toHaveDisplayValue(
      localStorageConfig.launchParams
    );

    const newValue = "--new-launch-params";

    await act(async () =>
      fireEvent.change(launchParamsInput, {
        target: {
          value: newValue,
        },
      })
    );

    expect(launchParamsInput).toHaveDisplayValue(newValue);
    expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith(
      "launchParams",
      newValue
    );
  });

  it(
    'При нажатии кнопки "Выбрать папку" вызвать диалог выбора директории,' +
      ' затем установить возвращенное значение в поле "Путь до клиента игры"' +
      " и вызвать метод на обновление конфигурации",
    async () => {
      const { container } = await act(async () => render(<Settings />));

      expect(queryByName(container, "gamePath")).toHaveDisplayValue(
        localStorageConfig.gamePath
      );

      const selectGamePathButton = queryByName<HTMLButtonElement>(
        container,
        "selectGamePath"
      )!;

      const newValue = "test/new/game/path";
      mockIPC((cmd, args: any) => {
        if (cmd === "tauri" && args.message.cmd === "openDialog") {
          expect(args.message.options).toStrictEqual({
            directory: true,
            multiple: false,
            defaultPath: localStorageConfig.gamePath,
          });

          return newValue;
        }
      });

      await act(async () => fireEvent.click(selectGamePathButton));

      expect(queryByName(container, "gamePath")).toHaveDisplayValue(newValue);

      expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith(
        "gamePath",
        newValue
      );
    }
  );

  it(
    'При нажатии кнопки "Выбрать файл" вызвать диалог выбора файла,' +
      ' затем установить возвращенное значение в поле "Путь до установленной Java"' +
      " и вызвать метод обновление конфигурации",
    async () => {
      const { container } = await act(async () => render(<Settings />));

      expect(queryByName(container, "javaPath")).toHaveDisplayValue(
        localStorageConfig.javaPath
      );

      const selectJavaPathButton = queryByName<HTMLButtonElement>(
        container,
        "selectJavaPath"
      )!;

      const newValue = "test/new/java/path";
      mockIPC((cmd, args: any) => {
        if (cmd === "tauri" && args.message.cmd === "openDialog") {
          expect(args.message.options).toStrictEqual({
            directory: false,
            multiple: false,
            defaultPath: localStorageConfig.javaPath,
          });

          return newValue;
        }
      });

      await act(async () => fireEvent.click(selectJavaPathButton));

      expect(queryByName(container, "javaPath")).toHaveDisplayValue(newValue);

      expect(configServiceSetByKeyMock).toHaveBeenLastCalledWith(
        "javaPath",
        newValue
      );
    }
  );
});
