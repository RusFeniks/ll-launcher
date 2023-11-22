"use client";
import AddonsService from "@/service/shared/addons.service";
import ConfigService from "@/service/shared/config.service";
import { createContext } from "react";

export const ServiceContainer = createContext({
  configService: new ConfigService(),
  addonsService: new AddonsService(),
});
