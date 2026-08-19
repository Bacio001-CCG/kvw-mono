import { existsSync } from "node:fs";
import path from "node:path";

import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { config as loadEnv } from "dotenv";

import { AppModule } from "./app.module";

for (const envPath of [path.join(process.cwd(), ".env"), path.resolve(__dirname, "../.env")]) {
    if (existsSync(envPath)) {
        loadEnv({ path: envPath, override: false });
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: false,
    });

    app.enableCors({
        origin: [process.env.ADMIN_URL, ...(process.env.CORS_ORIGINS || "").split(",")]
            .map((item) => item?.trim())
            .filter((origin): origin is string => Boolean(origin)),
        credentials: true,
    });
    app.getHttpAdapter().getInstance().disable("x-powered-by");

    const port = Number(process.env.PORT) || 4000;
    await app.listen(port, "0.0.0.0");
}

bootstrap();
