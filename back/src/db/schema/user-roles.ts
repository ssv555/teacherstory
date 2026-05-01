import {
  pgTable,
  uuid,
  integer,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core"
import { auditColumns, softDeleteColumns } from "./audit-columns"

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    roleId: integer("role_id").notNull(),
    assignedAt: timestamp("assigned_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    assignedBy: uuid("assigned_by"),
    ...auditColumns,
    ...softDeleteColumns,
  },
  (t) => [
    uniqueIndex("uniq_user_roles_user_role").on(t.userId, t.roleId),
    index("idx_user_roles_user_id").on(t.userId),
  ]
)
