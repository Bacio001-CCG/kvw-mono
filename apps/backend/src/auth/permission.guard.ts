import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";

import { DrizzleService } from "../database/drizzle.service";
import { assertPermission } from "./permissions";
import { PERMISSION_KEY } from "./require-permission.decorator";
import type { AdminPermission } from "./permissions";

type AuthRequest = Request & {
    user?: { id: string };
    session?: { user?: { id: string } };
};

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly drizzle: DrizzleService
    ) {}

    async canActivate(context: ExecutionContext) {
        const permission = this.reflector.getAllAndOverride<AdminPermission | undefined>(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!permission) return true;

        const request = context.switchToHttp().getRequest<AuthRequest>();
        const userId = request.user?.id ?? request.session?.user?.id;
        if (!userId) {
            throw new UnauthorizedException("Niet ingelogd.");
        }

        try {
            await assertPermission(this.drizzle.db, userId, permission);
        } catch (error) {
            if (error instanceof ForbiddenException) throw error;
            throw new ForbiddenException("Geen toegang.");
        }

        return true;
    }
}
