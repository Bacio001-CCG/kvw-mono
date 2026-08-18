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
    const origins = (process.env.CORS_ORIGINS || process.env.ADMIN_ORIGIN || "*")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const allowAll = origins.includes("*");

    app.enableCors({
        origin: allowAll
            ? true
            : (origin, callback) => {
                  if (!origin || origins.includes(origin)) {
                      callback(null, true);
                      return;
                  }
                  callback(null, false);
              },
        credentials: true,
    });
    app.getHttpAdapter().getInstance().disable("x-powered-by");

    const port = Number(process.env.PORT) || 4000;
    await app.listen(port, "0.0.0.0");
}

bootstrap();
