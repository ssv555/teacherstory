import {
  pgTable,
  varchar,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core"

/**
 * Content-addressable storage: one row per unique file BYTES.
 * Primary key = hex SHA-256 of the final (post-processed) bytes.
 * Physical files live at: back/data/content/{hash[0:2]}/{hash[2:4]}/{hash}.{ext}
 */
export const contentFiles = pgTable(
  "content_files",
  {
    contentHash: varchar("content_hash", { length: 64 }).primaryKey(),
    kind:        varchar("kind",          { length: 16 }).notNull(),
    mimeType:    varchar("mime_type",     { length: 64 }).notNull(),
    sizeBytes:   integer("size_bytes").notNull(),
    width:       integer("width"),
    height:      integer("height"),
    hasThumb:    boolean("has_thumb").notNull().default(false),
    createdAt:   timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_content_files_kind").on(t.kind),
  ],
)

export type ContentFile    = typeof contentFiles.$inferSelect
export type NewContentFile = typeof contentFiles.$inferInsert
