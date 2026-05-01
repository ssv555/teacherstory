import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core"
import { auditColumns, softDeleteColumns } from "./audit-columns"

export const timelineEvents = pgTable(
  "timeline_events",
  {
    eventId: uuid("event_id").primaryKey().defaultRandom(),
    year: integer("year").notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    albumId: uuid("album_id"),
    coverHash: varchar("cover_hash", { length: 64 }),
    sortOrder: integer("sort_order").notNull().default(0),
    isVisible: boolean("is_visible").notNull().default(true),
    ...auditColumns,
    ...softDeleteColumns,
  },
  (t) => [
    index("idx_timeline_year").on(t.year, t.isVisible, t.deletedAt),
  ]
)

export type TimelineEvent = typeof timelineEvents.$inferSelect
export type NewTimelineEvent = typeof timelineEvents.$inferInsert
