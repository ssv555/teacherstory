import {
  pgTable,
  uuid,
  bigint,
  varchar,
  timestamp,
  index,
  uniqueIndex,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { auditColumns, softDeleteColumns } from "./audit-columns";

export interface UserInfo {
  created: string;
  userId: number | string;
  lang: "en" | "ru";
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  email?: string;
  phone?: string;
}

export interface UserSettings {
  auth_app: {
    telegram?: UserInfo;
    vk?: UserInfo;
    max?: UserInfo;
  };
}

export const users = pgTable(
  "users",
  {
    userId: uuid("user_id").primaryKey().defaultRandom(),

    // Provider IDs (generated from settings.auth_app JSONB)
    vkUserId: bigint("vk_user_id", { mode: "number" }).generatedAlwaysAs(
      sql`CASE WHEN (settings->'auth_app'->'vk'->>'userId') ~ '^[0-9]+$' THEN (settings->'auth_app'->'vk'->>'userId')::bigint END`
    ),
    mxUserId: bigint("mx_user_id", { mode: "number" }).generatedAlwaysAs(
      sql`CASE WHEN (settings->'auth_app'->'max'->>'userId') ~ '^[0-9]+$' THEN (settings->'auth_app'->'max'->>'userId')::bigint END`
    ),
    telegramUserId: bigint("telegram_user_id", { mode: "number" }).generatedAlwaysAs(
      sql`CASE WHEN (settings->'auth_app'->'telegram'->>'userId') ~ '^[0-9]+$' THEN (settings->'auth_app'->'telegram'->>'userId')::bigint END`
    ),

    lang: varchar("lang", { length: 2 }).default("ru"),
    settings: jsonb("settings").$type<UserSettings>(),

    lastAuthAt: timestamp("last_auth_at").notNull(),
    lastAuthApp: varchar("last_auth_app", { length: 10 }),
    dtBanned: timestamp("dt_banned"),
    tokensInvalidBefore: timestamp("tokens_invalid_before", { withTimezone: true }),

    ...auditColumns,
    ...softDeleteColumns,
  },
  (users) => [
    index("idx_users_vk_user_id").on(users.vkUserId),
    index("idx_users_mx_user_id").on(users.mxUserId),
    index("idx_users_tg_user_id").on(users.telegramUserId),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
