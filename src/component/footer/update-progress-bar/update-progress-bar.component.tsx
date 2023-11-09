import classNames from "classnames";
import style from "./update-progress-bar.style.module.scss";

export default function UpdateProgressBar() {
  return (
    <div
      className={classNames(
        style["update-progress-bar"],
        style["update-progress-bar--disabled"]
      )}
    ></div>
  );
}
