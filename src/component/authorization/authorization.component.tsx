import style from "./authorization.styles.module.scss";

export default function Authorization() {
  return (
    <form className={style["authorization"]}>
      <div>
        <label className={style["authorization__label"]}>Логин</label>
        <input type="text" className={style["authorization__input"]} />
      </div>
      <div>
        <label className={style["authorization__label"]}>Пароль</label>
        <input type="password" className={style["authorization__input"]} />
      </div>
    </form>
  );
}
