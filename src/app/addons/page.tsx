"use client";
import AddonInfoComponent from "@/component/addons/addon-info/addon-info.component";
import AddonsList from "@/component/addons/addons-list/addons-list.component";
import Preloader from "@/component/shared/preloader/preloader.component";
import { useEffect, useState } from "react";
import styles from "./page.styles.module.scss";

export interface AddonInfo {
  id: number;
  title: string;
  description: string;
  guideLink?: string;
  image?: string;
  website?: string;
}

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
  const [addonsGettingError, setAddonsGettingError] = useState<string>();

  useEffect(() => {
    getAddonsListFromBackend()
      .then(setAddonsList)
      .catch((error) => setAddonsGettingError(error.message));
  }, []);

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
