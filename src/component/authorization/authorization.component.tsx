import classNames from "classnames";
import style from "./authorization.styles.module.scss";

export default function Authorization() {
  return (
    <div className={classNames(style["authorization"])}>
        Authorization Form
    </div>
  );
}
