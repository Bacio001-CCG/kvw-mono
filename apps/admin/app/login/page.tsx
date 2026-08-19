"use client";

import { useState } from "react";

import { Button } from "@workspace/ui/components/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.194 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.656 16.108 19.02 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.338 6.306 14.691z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.191l-6.19-5.238C29.149 35.091 26.715 36 24 36c-5.175 0-9.617-3.324-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.793 2.241-2.231 4.149-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
        </svg>
    );
}

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = async () => {
        setError("");
        setLoading(true);
        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}/`,
            });

            if (result.error) {
                throw new Error(result.error.message || "Inloggen mislukt.");
            }

            // Better Auth redirects automatically; if a URL is returned, follow it.
            const redirectUrl =
                (result.data as { url?: string } | undefined)?.url ??
                (result.data as { redirect?: boolean; url?: string } | undefined)?.url;

            if (redirectUrl) {
                window.location.assign(redirectUrl);
                return;
            }
        } catch (item) {
            setError(
                item instanceof Error
                    ? item.message
                    : "Inloggen met Google is mislukt. Controleer of je account is aangemaakt door een beheerder."
            );
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">KVW HeKoS</p>
                    <CardTitle>Beheer inloggen</CardTitle>
                    <CardDescription>
                        Log in met je Google-account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full justify-center gap-2"
                        disabled={loading}
                        onClick={() => void signInWithGoogle()}
                    >
                        <GoogleIcon />
                        {loading ? "Doorverwijzen..." : "Doorgaan met Google"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
