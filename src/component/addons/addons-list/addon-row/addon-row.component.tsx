import AddonInfo from "@/models/addons/addon-info.interface";
import classNames from "classnames";
import styles from "./addon-row.styles.module.scss";

interface AddonRowProps {
  addon: AddonInfo;
  setSelectedAddon: Function;
  isSelected: boolean;
}

export default function AddonRow({
  addon,
  setSelectedAddon,
  isSelected,
}: AddonRowProps) {
  return (
    <div
      className={classNames(
        styles["addon-row"],
        isSelected && styles["addon-row--selected"]
      )}
      onClick={() => setSelectedAddon(addon)}
    >
      {addon.title}
    </div>
  );
}
