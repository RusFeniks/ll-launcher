import style from "./update-button.styles.module.scss";

export default function UpdateButton() {
  return (
    <button className={style["update-button"]} disabled>
      ОБНОВИТЬ
    </button>
  );
}
