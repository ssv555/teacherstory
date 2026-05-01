import {
  pgTable,
  serial,
  uuid,
  varchar,
  smallint,
  numeric,
  timestamp,
  index,
  jsonb,
} from "drizzle-orm/pg-core"

/** Payment stages (from iamrich) */
export const PAYMENT_STAGES = {
  INIT: 0,
  SCREENSHOT: 2,
  DECLINED: 3,
  SUCCESS: 4,
  EXPIRED: 5,
  ORPHAN: 6,
  CANCELED: 7,
} as const

export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    tranId: varchar("tran_id", { length: 255 }).notNull(),
    userId: uuid("user_id").notNull(),
    albumId: uuid("album_id").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    stageId: smallint("stage_id").notNull().default(0),
    screenshot: jsonb("screenshot"),
    note: varchar("note", { length: 512 }),
    dt: timestamp("dt", { withTimezone: true }).notNull().defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (t) => [
    index("idx_payments_user").on(t.userId, t.stageId),
    index("idx_payments_album").on(t.albumId, t.stageId),
    index("idx_payments_tran_id").on(t.tranId),
  ]
)

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
