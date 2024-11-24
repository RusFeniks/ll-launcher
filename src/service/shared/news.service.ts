import { NewsPost } from "@/models/shared/news-post.interface";

export default class NewsService {
  public getAll(): Promise<NewsPost[]> {
    return fetch(process.env.API_NEWS!).then((response) => response.json());
  }
}
