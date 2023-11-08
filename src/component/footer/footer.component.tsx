import classNames from "classnames";
import Authorization from "../authorization/authorization.component";
import GameStartButton from "../game-start-button/game-start-button.component";
import UpdateButton from "../update-button/update-button.component";
import UpdateProgressBar from "../update-progress-bar/update-progress-bar.component";
import style from "./footer.styles.module.scss";

interface FooterProps {
  className?: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div className={classNames(style["footer"], props.className)}>
        <UpdateProgressBar/>
        <div className={style['footer__row']}>
            <Authorization/>
            <div className={style['footer__controls']}>
                <UpdateButton/>
                <GameStartButton/>
            </div>
        </div>
    </div>
  );
}