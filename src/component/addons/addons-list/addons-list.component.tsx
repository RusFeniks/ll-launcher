import AddonInfo from "@/models/addons/addon-info.interface";
import AddonRow from "./addon-row/addon-row.component";
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
  return (
    <div className={styles["addons-list"]}>
      {addons.map((addon) => (
        <AddonRow
          key={addon.id}
          addon={addon}
          setSelectedAddon={setSelectedAddon}
          isSelected={selectedAddon === addon}
        />
      ))}
    </div>
  );
}
