import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  numeric,
  index,
  jsonb,
} from "drizzle-orm/pg-core"
import { auditColumns, softDeleteColumns } from "./audit-columns"

export const albums = pgTable(
  "albums",
  {
    albumId: uuid("album_id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    year: integer("year").notNull(),
    eventType: varchar("event_type", { length: 50 }),
    coverHash: varchar("cover_hash", { length: 64 }),
    isPublic: boolean("is_public").notNull().default(true),
    price: numeric("price", { precision: 10, scale: 2 }),
    sortOrder: integer("sort_order").notNull().default(0),
    photoCount: integer("photo_count").notNull().default(0),
    settings: jsonb("settings").default({}),
    ...auditColumns,
    ...softDeleteColumns,
  },
  (t) => [
    index("idx_albums_year").on(t.year),
    index("idx_albums_public").on(t.isPublic, t.deletedAt),
  ]
)

export type Album = typeof albums.$inferSelect
export type NewAlbum = typeof albums.$inferInsert
