import { Elysia } from "elysia";
import { APP_VERSION } from "../shared/version";

export const initRoute = new Elysia()
  .get("/init", () => ({
    version: APP_VERSION,
    authProviders: {
      vk: process.env.VITE_OAUTH_VK_ENABLED === 'true',
      telegram: process.env.VITE_OAUTH_TELEGRAM_ENABLED === 'true',
      max: process.env.VITE_AUTH_MAX_ENABLED === 'true',
    },
  }));
