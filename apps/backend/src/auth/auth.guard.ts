import { createHmac, timingSafeEqual } from "node:crypto";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";

export const ADMIN_COOKIE = "kvw_admin_session";

export function adminPassword() {
    return process.env.ADMIN_PASSWORD || "hekos-dev";
}

export function sessionToken() {
    const secret = process.env.ADMIN_SECRET || adminPassword();
    return createHmac("sha256", secret).update("kvw-admin").digest("hex");
}

export function readCookie(request: Request, name: string) {
    const header = request.headers.cookie;
    if (!header) return undefined;
    for (const part of header.split(";")) {
        const [key, ...rest] = part.trim().split("=");
        if (key === name) return decodeURIComponent(rest.join("="));
    }
    return undefined;
}

export function isValidSession(token?: string) {
    if (!token) return false;
    const expected = sessionToken();
    const left = Buffer.from(token);
    const right = Buffer.from(expected);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
}

export function cookieHeader(token: string, maxAge: number) {
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    return `${ADMIN_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        if (!isValidSession(readCookie(request, ADMIN_COOKIE))) {
            throw new UnauthorizedException("Niet ingelogd.");
        }
        return true;
    }
}
