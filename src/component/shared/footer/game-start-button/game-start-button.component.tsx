import style from "./game-start-button.styles.module.scss";

export default function GameStartButton() {
  return (
    <button className={style["game-start-button"]}>
      Играть
    </button>
  );
}
