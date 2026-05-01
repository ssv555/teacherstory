import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  index,
  jsonb,
} from "drizzle-orm/pg-core"
import { auditColumns, softDeleteColumns } from "./audit-columns"

export const photos = pgTable(
  "photos",
  {
    photoId: uuid("photo_id").primaryKey().defaultRandom(),
    albumId: uuid("album_id").notNull(),
    contentHash: varchar("content_hash", { length: 64 }).notNull(),
    caption: text("caption"),
    sortOrder: integer("sort_order").notNull().default(0),
    settings: jsonb("settings").default({}),
    ...auditColumns,
    ...softDeleteColumns,
  },
  (t) => [
    index("idx_photos_album").on(t.albumId, t.deletedAt, t.sortOrder),
  ]
)

export type Photo = typeof photos.$inferSelect
export type NewPhoto = typeof photos.$inferInsert
