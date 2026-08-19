"use client";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import {
    ADMIN_PERMISSIONS,
    ADMIN_PERMISSION_LABELS,
    type AdminPermission,
    type AdminUserRow,
} from "@/lib/permissions";

export default function UsersPage() {
    const { can, loading: authLoading } = useAuth();
    const [users, setUsers] = useState<AdminUserRow[]>([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
    });

    const loadUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await api<AdminUserRow[]>("/permissions/users");
            setUsers(data);
        } catch (item) {
            setError(item instanceof Error ? item.message : "Laden mislukt.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading || !can("team")) return;
        void loadUsers();
    }, [authLoading, can]);

    const togglePermission = async (user: AdminUserRow, permission: AdminPermission) => {
        if (user.isOwner) return;
        const next = user.permissions.includes(permission)
            ? user.permissions.filter((item) => item !== permission)
            : [...user.permissions, permission];

        try {
            await api(`/permissions/users/${user.id}/permissions`, {
                method: "PUT",
                body: JSON.stringify({ permissions: next }),
            });
            setMessage("Rechten bijgewerkt.");
            await loadUsers();
        } catch (item) {
            setError(item instanceof Error ? item.message : "Opslaan mislukt.");
        }
    };

    const onCreate = async (event: FormEvent) => {
        event.preventDefault();
        setCreating(true);
        setError("");
        setMessage("");
        try {
            await api("/permissions/users", {
                method: "POST",
                body: JSON.stringify(newUser),
            });
            setNewUser({ email: "", name: "" });
            setMessage("Account aangemaakt. De gebruiker kan inloggen met Google zodra je rechten toekent.");
            await loadUsers();
        } catch (item) {
            setError(item instanceof Error ? item.message : "Account aanmaken mislukt.");
        } finally {
            setCreating(false);
        }
    };

    const toggleActive = async (user: AdminUserRow) => {
        try {
            await api(`/permissions/users/${user.id}`, {
                method: "PATCH",
                body: JSON.stringify({ isActive: !user.isActive }),
            });
            await loadUsers();
        } catch (item) {
            setError(item instanceof Error ? item.message : "Opslaan mislukt.");
        }
    };

    if (authLoading) {
        return (
            <AdminShell>
                <div className="mx-auto max-w-3xl">
                    <p className="text-sm text-slate-500">Laden...</p>
                </div>
            </AdminShell>
        );
    }

    if (!can("team")) {
        return (
            <AdminShell>
                <div className="mx-auto max-w-3xl">
                    <p className="text-sm text-red-600">Je hebt geen rechten om gebruikers te beheren.</p>
                </div>
            </AdminShell>
        );
    }

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Gebruikers & rechten</h1>
                    <p className="mt-1 text-muted-foreground">
                        Nieuwe accounts hebben standaard geen rechten. Schakel per account in wat iemand mag doen.
                    </p>
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                {message ? <p className="text-sm text-green-700">{message}</p> : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Nieuw account</CardTitle>
                        <CardDescription>
                            Voeg een Google-account toe op basis van e-mailadres. De gebruiker logt daarna in via Google.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 md:grid-cols-2" onSubmit={onCreate}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Naam</Label>
                                <Input
                                    id="name"
                                    value={newUser.name}
                                    onChange={(event) => setNewUser((prev) => ({ ...prev, name: event.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Google e-mailadres</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(event) => setNewUser((prev) => ({ ...prev, email: event.target.value }))}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" className="bg-orange-500" disabled={creating}>
                                    {creating ? "Aanmaken..." : "Account uitnodigen"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Accounts</CardTitle>
                        <CardDescription>
                            Eigenaars hebben automatisch alle rechten. Overige accounts starten zonder rechten.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {loading ? <p className="text-sm text-slate-500">Laden...</p> : null}
                        {users.map((user) => (
                            <div key={user.id} className="rounded-xl border border-slate-200 p-4">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-slate-600">{user.email}</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {user.isOwner
                                                ? "Eigenaar · alle rechten"
                                                : user.isActive
                                                  ? "Actief"
                                                  : "Gedeactiveerd"}
                                        </p>
                                    </div>
                                    {!user.isOwner ? (
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                className="size-4 rounded border-slate-300"
                                                checked={user.isActive}
                                                onChange={() => void toggleActive(user)}
                                            />
                                            Actief
                                        </label>
                                    ) : null}
                                </div>
                                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {ADMIN_PERMISSIONS.map((permission) => (
                                        <label
                                            key={permission}
                                            className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                className="size-4 rounded border-slate-300"
                                                checked={user.isOwner || user.permissions.includes(permission)}
                                                disabled={user.isOwner}
                                                onChange={() => void togglePermission(user, permission)}
                                            />
                                            {ADMIN_PERMISSION_LABELS[permission]}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}
