import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import type { Response } from "express";
import { AuthGuard, adminPassword, cookieHeader, sessionToken } from "./auth.guard";

@Controller("auth")
export class AuthController {
    @Post("login")
    login(@Body() body: { password?: string }, @Res({ passthrough: true }) response: Response) {
        if (!body?.password || body.password !== adminPassword()) {
            throw new UnauthorizedException("Onjuist wachtwoord.");
        }
        response.setHeader("Set-Cookie", cookieHeader(sessionToken(), 60 * 60 * 24 * 7));
        return { ok: true };
    }

    @Post("logout")
    logout(@Res({ passthrough: true }) response: Response) {
        response.setHeader("Set-Cookie", cookieHeader("", 0));
        return { ok: true };
    }

    @Get("me")
    @UseGuards(AuthGuard)
    me() {
        return { ok: true, role: "admin" };
    }
}
