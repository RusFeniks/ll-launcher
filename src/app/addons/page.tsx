"use client";
import AddonInfoComponent from "@/component/addons/addon-info/addon-info.component";
import AddonsList from "@/component/addons/addons-list/addons-list.component";
import Preloader from "@/component/shared/preloader/preloader.component";
import AddonInfo from "@/models/addons/addon-info.interface";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.styles.module.scss";

/**
 * Получает список дополнений с backend сервера.
 */
async function getAddonsListFromBackend(): Promise<AddonInfo[]> {
  const apiUrl = `${process.env.API_URL}/addons`;

  return (await fetch(apiUrl)).json();
}

export default function Addons() {
  const [addonsList, setAddonsList] = useState<AddonInfo[]>([]);
  const [selectedAddon, setSelectedAddon] = useState<AddonInfo>();
  const [addonsGettingError, setAddonsGettingError] = useState<string | null>(
    null
  );

  const updateAddonsList = useCallback(() => {
    setAddonsGettingError(null);
    getAddonsListFromBackend()
      .then(setAddonsList)
      .catch((error) => setAddonsGettingError(error.message));
  }, []);

  useEffect(updateAddonsList, []);

  return (
    <div className={styles["addons"]}>
      <div className={styles["addons__list"]}>
        {addonsList.length ? (
          <AddonsList
            addons={addonsList}
            selectedAddon={selectedAddon}
            setSelectedAddon={setSelectedAddon}
          />
        ) : (
          <Preloader />
        )}
        {addonsGettingError && (
          <div className={styles["addons__error"]}>
            Ошибка получения: {addonsGettingError}
            <br />
            <span
              className={styles["addons__refresh-list"]}
              onClick={updateAddonsList}
            >
              Попробовать снова
            </span>
          </div>
        )}
      </div>
      <div className={styles["addons__separator"]}></div>
      <div className={styles["addons__info"]}>
        {selectedAddon && <AddonInfoComponent addon={selectedAddon} />}
      </div>
    </div>
  );
}
