import { eq, and } from "drizzle-orm"
import { db } from "./index"
import { users, type UserSettings } from "./schema/users"
import { userRoleTypes } from "./schema/user-role-types"
import { userRoles } from "./schema/user-roles"
import { C_SERVICE_USER_ID } from "../shared/constants"

// ─── Seed UUIDs ─────────────────────────────────────────────────────────────

const SEED_UUIDS = {
  SERVICE:  "00000000-0000-0000-0000-000000000000",
  ADMIN:    "00000000-0000-0000-0000-000000000001",
} as const

// ─── Role Types Dictionary ──────────────────────────────────────────────────

const ROLE_SEED_DATA = [
  { code: "service", name: "Service", description: "System service account for automated operations.", sortOrder: 0 },
  { code: "admin",   name: "Admin",   description: "Site administrator — manages albums, photos, timeline, payments.", sortOrder: 1 },
  { code: "viewer",  name: "Viewer",  description: "Registered user — can view public content and purchase access to paid albums.", sortOrder: 2 },
]

// ─── Initial Users ──────────────────────────────────────────────────────────

const INITIAL_USERS = [
  {
    userId: SEED_UUIDS.SERVICE,
    lastAuthAt: "2026-05-01 00:00:00",
    lastAuthApp: null,
    settings: { auth_app: {} } as UserSettings,
  },
]

// userId → role codes
const USER_ROLE_MAP: Record<string, string[]> = {
  [SEED_UUIDS.SERVICE]: ["service"],
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function seedRoleTypes() {
  for (const role of ROLE_SEED_DATA) {
    const existing = await db
      .select({
        roleId: userRoleTypes.roleId,
        name: userRoleTypes.name,
        description: userRoleTypes.description,
        sortOrder: userRoleTypes.sortOrder,
      })
      .from(userRoleTypes)
      .where(eq(userRoleTypes.code, role.code))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(userRoleTypes).values({ ...role, createdBy: C_SERVICE_USER_ID })
      console.log(`[SEED] Inserted role type: ${role.code}`)
      continue
    }

    const e = existing[0]!
    const patch: Record<string, unknown> = {}
    if (e.sortOrder !== role.sortOrder) patch.sortOrder = role.sortOrder
    if (e.name !== role.name) patch.name = role.name
    if (e.description !== role.description) patch.description = role.description

    if (Object.keys(patch).length > 0) {
      await db.update(userRoleTypes)
        .set(patch)
        .where(eq(userRoleTypes.code, role.code))
      console.log(`[SEED] Updated role type '${role.code}': ${Object.keys(patch).join(', ')}`)
    }
  }
}

async function seedUsers() {
  for (const u of INITIAL_USERS) {
    const existing = await db
      .select({ userId: users.userId })
      .from(users)
      .where(eq(users.userId, u.userId))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(users).values({
        userId: u.userId,
        lastAuthAt: new Date(u.lastAuthAt),
        lastAuthApp: u.lastAuthApp,
        settings: u.settings,
        createdBy: C_SERVICE_USER_ID,
      })
      console.log(`[SEED] Inserted user: ${u.userId}`)
    }
  }
}

async function seedUserRoles() {
  const allRoles = await db
    .select({ roleId: userRoleTypes.roleId, code: userRoleTypes.code })
    .from(userRoleTypes)
  const roleMap = new Map(allRoles.map((r) => [r.code, r.roleId]))

  for (const u of INITIAL_USERS) {
    const rolesToAssign = USER_ROLE_MAP[u.userId] ?? []

    for (const roleCode of rolesToAssign) {
      const roleId = roleMap.get(roleCode)
      if (!roleId) {
        console.error(`[SEED] Role not found: ${roleCode}`)
        continue
      }

      const existing = await db
        .select({ id: userRoles.id })
        .from(userRoles)
        .where(and(eq(userRoles.userId, u.userId), eq(userRoles.roleId, roleId)))
        .limit(1)

      if (existing.length === 0) {
        await db.insert(userRoles).values({ userId: u.userId, roleId, createdBy: C_SERVICE_USER_ID })
        console.log(`[SEED] Assigned role ${roleCode} to user ${u.userId}`)
      }
    }
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

export async function seed() {
  await seedRoleTypes()
  await seedUsers()
  await seedUserRoles()
  console.log("[SEED] All seeds completed")
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[SEED] Failed:", err)
    process.exit(1)
  })
