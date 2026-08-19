import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db, schema } from "../database/db";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    user: {
        additionalFields: {
            isOwner: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },
            isActive: {
                type: "boolean",
                required: false,
                defaultValue: true,
                input: false,
            },
        },
    },
    trustedOrigins: [process.env.ADMIN_URL, ...(process.env.CORS_ORIGINS || "").split(",")]
        .map((origin) => origin?.trim())
        .filter((origin): origin is string => Boolean(origin)),
    account: {
        accountLinking: {
            enabled: true,
            allowDifferentEmails: true,
            requireLocalEmailVerified: false,
            trustedProviders: ["google", "email-password"],
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 30,
    },
    advanced: {
        disableOriginCheck: true,
        disableCSRFCheck: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            accessType: "offline",
            prompt: "select_account consent",
            scope: [
                "openid",
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
                "https://mail.google.com/",
            ],
        },
    },
});
