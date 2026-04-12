import * as path from 'node:path';
import { existsSync } from 'node:fs';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const envCandidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'packages/database/.env'),
    path.resolve(process.cwd(), '../../packages/database/.env'),
    path.resolve(process.cwd(), '../../../packages/database/.env'),
    path.resolve(process.cwd(), 'node_modules/@repo/database/.env'),
];

for (const envPath of envCandidates) {
    if (existsSync(envPath)) {
        dotenv.config({ path: envPath, override: false });
    }
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Configure it in your app .env or packages/database/.env');
}

const pool = new Pool({
    connectionString: databaseUrl,
});

const db = drizzle(pool);

export { db };
export * from "./db/schema";
