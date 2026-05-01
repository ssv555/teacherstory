import {
  pgTable,
  serial,
  varchar,
  text,
  smallint,
  boolean,
} from "drizzle-orm/pg-core"
import { auditColumns, softDeleteColumns } from "./audit-columns"

export const ROLE_CODES = {
  SERVICE: "service",
  ADMIN: "admin",
  VIEWER: "viewer",
} as const

export type RoleCode = (typeof ROLE_CODES)[keyof typeof ROLE_CODES]

export const userRoleTypes = pgTable("user_role_types", {
  roleId: serial("role_id").primaryKey(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
  sortOrder: smallint("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  ...auditColumns,
  ...softDeleteColumns,
})
