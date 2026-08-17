import { existsSync } from "node:fs";
import path from "node:path";

import { NestFactory } from "@nestjs/core";
import { config as loadEnv } from "dotenv";

import { AppModule } from "./app.module";

for (const envPath of [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "../../packages/database/.env"),
    path.resolve(__dirname, "../.env"),
]) {
    if (existsSync(envPath)) {
        loadEnv({ path: envPath, override: false });
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const origins = (process.env.ADMIN_ORIGIN || "http://localhost:3002")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    app.enableCors({
        origin: [...origins, "http://localhost:3000", "http://localhost:3001"],
        credentials: true,
    });
    app.getHttpAdapter().getInstance().disable("x-powered-by");

    const port = Number(process.env.PORT) || 4000;
    await app.listen(port);
}

bootstrap();
