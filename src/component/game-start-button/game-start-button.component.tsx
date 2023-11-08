import classNames from "classnames";
import style from "./game-start-button.styles.module.scss";

export default function GameStartButton() {
  return (
    <button className={classNames(style["game-start-button"])}>
      Играть
    </button>
  );
}
