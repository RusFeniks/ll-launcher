"use client";
import ConfigService from "@/service/config.service";
import { createContext } from "react";

export const ServiceContainer = createContext({
  configService: new ConfigService(),
});