import { AddonInfo } from "@/app/addons/page";
import classNames from "classnames";
import { useCallback } from "react";
import styles from "./addons-list.styles.module.scss";

interface AddonsListProps {
  addons: AddonInfo[];
  selectedAddon: AddonInfo | undefined;
  setSelectedAddon: Function;
}

export default function AddonsList({
  addons,
  selectedAddon,
  setSelectedAddon,
}: AddonsListProps) {
  const addonRow = useCallback(
    (currentAddon: AddonInfo): JSX.Element => {
      const isAddonSelected = (addon: AddonInfo): boolean =>
        addon === selectedAddon;

      return (
        <div
          key={currentAddon.id}
          className={classNames(
            styles["addons-list__row"],
            isAddonSelected(currentAddon)
              ? styles["addons-list__row--selected"]
              : null
          )}
          onClick={() => setSelectedAddon(currentAddon)}
        >
          {currentAddon.title}
        </div>
      );
    },
    [selectedAddon]
  );

  return <div className={styles["addons-list"]}>{addons.map(addonRow)}</div>;
}
