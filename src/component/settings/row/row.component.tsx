import styles from "./row.styles.module.scss";

interface RowProps {
  label: string;
  children: any;
}

export default function Row(props: RowProps) {
  return (
    <div className={styles["row"]}>
      <label>{props.label}</label>
      <div className={styles["row__input-group"]}>{props.children}</div>
    </div>
  );
}
