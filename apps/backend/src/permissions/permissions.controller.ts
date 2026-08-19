import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

import { PermissionGuard } from "../auth/permission.guard";
import { RequirePermission } from "../auth/require-permission.decorator";
import { PermissionsService } from "./permissions.service";

@Controller("permissions")
@UseGuards(PermissionGuard)
export class PermissionsController {
    constructor(private readonly permissions: PermissionsService) {}

    @Get("me")
    getMine(@Session() session: UserSession) {
        return this.permissions.getMine(session.user.id);
    }

    @Get("users")
    @RequirePermission("team")
    listUsers(@Session() session: UserSession) {
        return this.permissions.list(session.user.id);
    }

    @Post("users")
    @RequirePermission("team")
    createUser(
        @Session() session: UserSession,
        @Body() body: { email?: string; name?: string; permissions?: string[] }
    ) {
        return this.permissions.createUser(session.user.id, {
            email: body.email || "",
            name: body.name || "",
            permissions: body.permissions,
        });
    }

    @Put("users/:userId/permissions")
    @RequirePermission("team")
    updatePermissions(
        @Session() session: UserSession,
        @Param("userId") userId: string,
        @Body() body: { permissions?: string[] }
    ) {
        return this.permissions.updatePermissions(session.user.id, userId, body.permissions || []);
    }

    @Patch("users/:userId")
    @RequirePermission("team")
    updateUser(
        @Session() session: UserSession,
        @Param("userId") userId: string,
        @Body() body: { name?: string; isActive?: boolean }
    ) {
        return this.permissions.updateUser(session.user.id, userId, body);
    }
}
