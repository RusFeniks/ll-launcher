import { NewsPost } from "@/models/shared/news-post.interface";
import NewsService from "@/service/shared/news.service";
import { format } from "date-fns";
import style from "./page.styles.module.scss";

export default async function Home() {
  const newsService = new NewsService();

  let error = null;

  const news: NewsPost[] = await newsService.getAll().catch((requestError) => {
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
            <span className={style["home__news-timestamp"]}>
              {format(new Date(element.createdAt), "dd.MM.yyyy")}
            </span>
            <div
              className={style["home__news-content"]}
              dangerouslySetInnerHTML={{ __html: element.content }}
            ></div>
          </article>
        ))}
      </div>
    </div>
  );
}
