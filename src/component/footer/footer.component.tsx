import classNames from "classnames";
import Authorization from "./authorization/authorization.component";
import style from "./footer.styles.module.scss";
import GameStartButton from "./game-start-button/game-start-button.component";
import UpdateButton from "./update-button/update-button.component";
import UpdateProgressBar from "./update-progress-bar/update-progress-bar.component";

interface FooterProps {
  className?: string;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={classNames(style["footer"], props.className)}>
        <UpdateProgressBar/>
        <div className={style['footer__row']}>
            <Authorization/>
            <div className={style['footer__controls']}>
                <UpdateButton/>
                <GameStartButton/>
            </div>
        </div>
    </footer>
  );
}
