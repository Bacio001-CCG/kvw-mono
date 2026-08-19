"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
    FileText,
    FolderOpen,
    Handshake,
    LayoutDashboard,
    LogOut,
    Mail,
    Shield,
    UserCog,
    Users,
    UserRound,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";
import type { AdminPermission } from "@/lib/permissions";

const links: { href: string; label: string; icon: typeof LayoutDashboard; permission: AdminPermission }[] = [
    { href: "/", label: "Overzicht", icon: LayoutDashboard, permission: "overview" },
    { href: "/inschrijvingen", label: "Inschrijvingen", icon: FolderOpen, permission: "registrations" },
    { href: "/kinderen", label: "Kinderen", icon: Users, permission: "children" },
    { href: "/vrijwilligers", label: "Vrijwilligers", icon: UserRound, permission: "volunteers" },
    { href: "/teksten", label: "Teksten", icon: FileText, permission: "content" },
    { href: "/documenten", label: "PDF's", icon: Shield, permission: "documents" },
    { href: "/sponsors", label: "Sponsoren", icon: Handshake, permission: "sponsors" },
    { href: "/contact", label: "Contact", icon: Mail, permission: "contact" },
    { href: "/gebruikers", label: "Gebruikers", icon: UserCog, permission: "team" },
];

function AdminShellInner({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { me, loading, can } = useAuth();
    const visibleLinks = links.filter((link) => can(link.permission));

    return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[240px_1fr]">
            <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between px-5 py-5 lg:block">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">KVW HeKoS</p>
                        <h1 className="mt-1 text-lg font-semibold">Beheer</h1>
                        {me?.user ? (
                            <p className="mt-1 text-xs text-slate-500">{me.user.name}</p>
                        ) : null}
                    </div>
                    <Button
                        variant="outline"
                        className="lg:mt-6"
                        onClick={async () => {
                            await authClient.signOut();
                            window.location.href = "/login";
                        }}
                    >
                        <LogOut className="size-4" /> Uitloggen
                    </Button>
                </div>
                <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:px-3">
                    {loading ? (
                        <p className="px-3 py-2 text-sm text-slate-500">Laden...</p>
                    ) : visibleLinks.length ? (
                        visibleLinks.map((link) => {
                            const active = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                                        active ? "bg-orange-500 text-white" : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {link.label}
                                </Link>
                            );
                        })
                    ) : (
                        <p className="px-3 py-2 text-sm text-slate-500">Geen rechten toegewezen.</p>
                    )}
                </nav>
            </aside>
            <main className="px-4 py-6 sm:px-8">{children}</main>
        </div>
    );
}

export default function AdminShell({ children }: { children: ReactNode }) {
    return <AdminShellInner>{children}</AdminShellInner>;
}
