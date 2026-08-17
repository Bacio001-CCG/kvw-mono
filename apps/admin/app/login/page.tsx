"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await api("/auth/login", { method: "POST", body: JSON.stringify({ password }) });
            router.replace("/");
        } catch {
            setError("Onjuist wachtwoord.");
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
                        Alleen voor de organisatie. Hier beheer je inschrijvingen, teksten en exports.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={onSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        {error ? <p className="text-sm text-red-600">{error}</p> : null}
                        <Button type="submit" className="bg-orange-500" disabled={loading}>
                            {loading ? "Inloggen..." : "Inloggen"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
