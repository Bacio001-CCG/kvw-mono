import { Injectable, OnModuleDestroy } from "@nestjs/common";

import { db, pool } from "./db";
import type { Database } from "./client";

@Injectable()
export class DrizzleService implements OnModuleDestroy {
    readonly db: Database = db;

    async onModuleDestroy() {
        await pool.end();
    }
}
