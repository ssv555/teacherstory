import { Elysia } from "elysia";
import { APP_VERSION, APP_VER_DATE } from "../shared/version";

export const versionRoute = new Elysia()
  .get("/version", () => ({
    version: APP_VERSION,
    date: APP_VER_DATE,
  }));
