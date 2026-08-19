import { ForbiddenException } from "@nestjs/common";
import { eq } from "drizzle-orm";

import type { Database } from "../database/client";
import { user, userPermissions } from "../database/schema";

export const ADMIN_PERMISSIONS = [
    "overview",
    "registrations",
    "children",
    "volunteers",
    "content",
    "documents",
    "sponsors",
    "contact",
    "team",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

export const ALL_ADMIN_PERMISSIONS: AdminPermission[] = [...ADMIN_PERMISSIONS];

function parsePermissions(raw: string | null | undefined): AdminPermission[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (value): value is AdminPermission =>
                typeof value === "string" &&
                (ADMIN_PERMISSIONS as readonly string[]).includes(value)
        );
    } catch {
        return [];
    }
}

export function normalizePermissions(permissions: string[]): AdminPermission[] {
    const unique = new Set<AdminPermission>();
    for (const value of permissions) {
        if ((ADMIN_PERMISSIONS as readonly string[]).includes(value)) {
            unique.add(value as AdminPermission);
        }
    }
    return [...unique];
}

export async function getEffectivePermissions(db: Database, userId: string) {
    const [row] = await db
        .select({
            isOwner: user.isOwner,
            isActive: user.isActive,
            permissions: userPermissions.permissions,
        })
        .from(user)
        .leftJoin(userPermissions, eq(userPermissions.userId, user.id))
        .where(eq(user.id, userId))
        .limit(1);

    if (!row) {
        throw new ForbiddenException("Account niet gevonden.");
    }

    if (!row.isActive) {
        throw new ForbiddenException("Account is niet actief.");
    }

    if (row.isOwner) {
        return { isOwner: true, permissions: [...ALL_ADMIN_PERMISSIONS] };
    }

    return {
        isOwner: false,
        permissions: parsePermissions(row.permissions),
    };
}

export async function assertPermission(db: Database, userId: string, permission: AdminPermission) {
    const { permissions } = await getEffectivePermissions(db, userId);
    if (!permissions.includes(permission)) {
        throw new ForbiddenException(`Geen rechten voor: ${permission.replaceAll("_", " ")}`);
    }
}
