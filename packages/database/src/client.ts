import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./db/schema";

export function createDb(databaseUrl: string) {
    const pool = new Pool({
        connectionString: databaseUrl,
        ssl: databaseUrl.includes("neon.tech") ? { rejectUnauthorized: false } : undefined,
    });

    return {
        pool,
        db: drizzle(pool, { schema }),
    };
}

export type Database = ReturnType<typeof createDb>["db"];
