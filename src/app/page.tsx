import { format } from "date-fns";
import style from "./page.styles.module.scss";

interface News {
  id: number;
  date: string;
  content: string;
}

async function getAllNews(): Promise<News[]> {
  const newsUrl = `${process.env.API_URL}/news`;
  const result = await fetch(newsUrl);

  return result.json();
}

export default async function Home() {
  let error = null;
  const news: News[] = await getAllNews().catch((requestError) => {
    error = requestError.message;
    return [];
  });

  return (
    <div className={style["home"]}>
      {error && (
        <div className={style["home__news-error"]}>
          Ошибка при получении новостей: {error}
        </div>
      )}
      <div className={style["home__news-feed"]}>
        {news.map((element) => (
          <article key={element.id} className={style["home__news-element"]}>
            <h3 className={style["home__news-timestamp"]}>
              {format(new Date(element.date), "dd.MM.yyyy")}
            </h3>
            <p className={style["home__news-content"]}>{element.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
