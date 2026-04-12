import { randomBytes } from "node:crypto";

/**
 * Generates a random API key for database connections
 * @returns A random 32-character alphanumeric string
 */
export function generateDatabaseKey(): string {
    return randomBytes(24).toString("hex");
}
