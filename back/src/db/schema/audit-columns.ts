import { uuid, timestamp } from "drizzle-orm/pg-core"

/** Service user UUID — inline to keep schema files free of application imports */
const SERVICE_USER_ID = "00000000-0000-0000-0000-000000000000"

/** Audit: who and when created the record */
export const auditColumns = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  createdBy: uuid("created_by").notNull().default(SERVICE_USER_ID),
}

/** Soft-delete: who and when deleted the record */
export const softDeleteColumns = {
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  deletedBy: uuid("deleted_by"),
}
