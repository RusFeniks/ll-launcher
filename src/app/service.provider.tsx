"use client";
import AddonsService from "@/service/addons/addons.service";
import ConfigService from "@/service/shared/config.service";
import NewsService from "@/service/shared/news.service";
import { createContext } from "react";

export const ServiceContainer = createContext({
  configService: new ConfigService(),
  addonsService: new AddonsService(),
  newsService: new NewsService(),
});
