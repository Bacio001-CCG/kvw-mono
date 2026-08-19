import { eq } from "drizzle-orm";

import { db } from "../database/db";
import { userPermissions } from "../database/schema";

export async function ensureUserPermissions(userId: string) {
    const [existing] = await db
        .select({ userId: userPermissions.userId })
        .from(userPermissions)
        .where(eq(userPermissions.userId, userId))
        .limit(1);

    if (existing) return;

    await db.insert(userPermissions).values({
        userId,
        permissions: "[]",
    });
}
