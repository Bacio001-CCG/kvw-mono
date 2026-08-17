import { Module } from "@nestjs/common";

import { AdminController } from "./admin.controller";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthGuard } from "./auth/auth.guard";
import { DatabaseModule } from "./database/database.module";
import { PublicController } from "./public.controller";
import { SiteService } from "./site/site.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AppController, AuthController, AdminController, PublicController],
    providers: [AppService, SiteService, AuthGuard],
})
export class AppModule {}
