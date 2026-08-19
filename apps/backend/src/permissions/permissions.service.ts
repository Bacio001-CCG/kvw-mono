import { randomBytes } from "node:crypto";

import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { eq } from "drizzle-orm";

import { auth } from "../auth/auth";
import { ensureUserPermissions } from "../auth/permissions-sync";
import { DrizzleService } from "../database/drizzle.service";
import { user, userPermissions } from "../database/schema";
import {
    assertPermission,
    getEffectivePermissions,
    normalizePermissions,
} from "../auth/permissions";

@Injectable()
export class PermissionsService {
    constructor(private readonly drizzle: DrizzleService) {}

    async getMine(userId: string) {
        const [profile] = await this.drizzle.db
            .select({
                id: user.id,
                email: user.email,
                name: user.name,
                isOwner: user.isOwner,
                isActive: user.isActive,
            })
            .from(user)
            .where(eq(user.id, userId))
            .limit(1);

        if (!profile) {
            throw new BadRequestException("Account niet gevonden.");
        }

        const access = await getEffectivePermissions(this.drizzle.db, userId);
        return {
            user: profile,
            ...access,
        };
    }

    async list(actorUserId: string) {
        await assertPermission(this.drizzle.db, actorUserId, "team");

        const users = await this.drizzle.db
            .select({
                id: user.id,
                email: user.email,
                name: user.name,
                isOwner: user.isOwner,
                isActive: user.isActive,
            })
            .from(user)
            .orderBy(user.name);

        return Promise.all(
            users.map(async (row) => {
                const { permissions } = await getEffectivePermissions(this.drizzle.db, row.id);
                return { ...row, permissions };
            })
        );
    }

    async createUser(
        actorUserId: string,
        data: { email: string; name: string; permissions?: string[] }
    ) {
        await assertPermission(this.drizzle.db, actorUserId, "team");

        const email = data.email.trim().toLowerCase();
        const name = data.name.trim();
        const password = randomBytes(24).toString("hex");

        if (!email || !name) {
            throw new BadRequestException("Vul een geldig e-mailadres en naam in.");
        }

        const [existing] = await this.drizzle.db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (existing) {
            throw new BadRequestException("Er bestaat al een account met dit e-mailadres.");
        }

        const result = await auth.api.signUpEmail({
            body: { email, password, name },
        });

        if (!result?.user?.id) {
            throw new BadRequestException("Kon account niet aanmaken.");
        }

        const permissions = normalizePermissions(data.permissions || []);
        await this.drizzle.db
            .insert(userPermissions)
            .values({
                userId: result.user.id,
                permissions: JSON.stringify(permissions),
            })
            .onConflictDoUpdate({
                target: userPermissions.userId,
                set: { permissions: JSON.stringify(permissions) },
            });

        return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            isOwner: false,
            isActive: true,
            permissions,
        };
    }

    async updatePermissions(actorUserId: string, targetUserId: string, permissions: string[]) {
        await assertPermission(this.drizzle.db, actorUserId, "team");

        const [target] = await this.drizzle.db
            .select({ id: user.id, isOwner: user.isOwner })
            .from(user)
            .where(eq(user.id, targetUserId))
            .limit(1);

        if (!target) {
            throw new BadRequestException("Gebruiker niet gevonden.");
        }

        if (target.isOwner) {
            throw new ForbiddenException("Rechten van een eigenaar kunnen niet worden aangepast.");
        }

        await ensureUserPermissions(targetUserId);

        const normalized = normalizePermissions(permissions);
        await this.drizzle.db
            .insert(userPermissions)
            .values({
                userId: targetUserId,
                permissions: JSON.stringify(normalized),
            })
            .onConflictDoUpdate({
                target: userPermissions.userId,
                set: { permissions: JSON.stringify(normalized) },
            });

        return { userId: targetUserId, permissions: normalized };
    }

    async updateUser(
        actorUserId: string,
        targetUserId: string,
        data: { name?: string; isActive?: boolean }
    ) {
        await assertPermission(this.drizzle.db, actorUserId, "team");

        const [target] = await this.drizzle.db
            .select({ id: user.id, isOwner: user.isOwner })
            .from(user)
            .where(eq(user.id, targetUserId))
            .limit(1);

        if (!target) {
            throw new BadRequestException("Gebruiker niet gevonden.");
        }

        if (target.isOwner && data.isActive === false) {
            throw new ForbiddenException("Een eigenaar kan niet worden gedeactiveerd.");
        }

        const updates: Partial<{ name: string; isActive: boolean }> = {};
        if (data.name?.trim()) updates.name = data.name.trim();
        if (typeof data.isActive === "boolean" && !target.isOwner) updates.isActive = data.isActive;

        if (!Object.keys(updates).length) {
            throw new BadRequestException("Geen wijzigingen opgegeven.");
        }

        const [updated] = await this.drizzle.db
            .update(user)
            .set(updates)
            .where(eq(user.id, targetUserId))
            .returning({
                id: user.id,
                email: user.email,
                name: user.name,
                isOwner: user.isOwner,
                isActive: user.isActive,
            });

        const { permissions } = await getEffectivePermissions(this.drizzle.db, targetUserId);
        return { ...updated, permissions };
    }
}
