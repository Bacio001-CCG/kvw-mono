import { existsSync } from "node:fs";
import path from "node:path";

import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

for (const envPath of [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "../../.env"),
    path.join(process.cwd(), "src/database/.env"),
]) {
    if (existsSync(envPath)) {
        loadEnv({ path: envPath, override: false });
    }
}

if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL is not set. Start PostgreSQL first (docker compose up postgres -d) and set DATABASE_URL in apps/backend/.env"
    );
}

export default defineConfig({
    out: "./drizzle",
    schema: "./src/database/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
