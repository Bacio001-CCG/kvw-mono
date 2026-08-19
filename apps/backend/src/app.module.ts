import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { AuthModule } from "@thallesp/nestjs-better-auth";

import { AdminController } from "./admin.controller";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { auth } from "./auth/auth";
import { PermissionGuard } from "./auth/permission.guard";
import { DatabaseModule } from "./database/database.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { PublicController } from "./public.controller";
import { SiteService } from "./site/site.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule.forRoot({ auth, bodyParser: { rawBody: true } }),
        DatabaseModule,
        PermissionsModule,
    ],
    controllers: [AppController, AdminController, PublicController],
    providers: [AppService, SiteService, PermissionGuard, Reflector],
})
export class AppModule {}
