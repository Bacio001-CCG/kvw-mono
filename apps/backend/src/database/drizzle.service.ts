import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { createDb, type Database } from "@repo/database";
import type { Pool } from "pg";

@Injectable()
export class DrizzleService implements OnModuleDestroy {
    readonly db: Database;
    private readonly pool: Pool;

    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error("DATABASE_URL is not set. Add it to apps/backend/.env or packages/database/.env");
        }

        const client = createDb(databaseUrl);
        this.db = client.db;
        this.pool = client.pool;
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
