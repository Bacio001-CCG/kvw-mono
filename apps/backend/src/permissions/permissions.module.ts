import { Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PermissionGuard } from "../auth/permission.guard";
import { PermissionsController } from "./permissions.controller";
import { PermissionsService } from "./permissions.service";

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService, PermissionGuard, Reflector],
    exports: [PermissionsService],
})
export class PermissionsModule {}
