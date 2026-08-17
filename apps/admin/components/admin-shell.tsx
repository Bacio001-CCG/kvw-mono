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
    Users,
    UserRound,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { api } from "@/lib/api";

const links = [
    { href: "/", label: "Overzicht", icon: LayoutDashboard },
    { href: "/inschrijvingen", label: "Inschrijvingen", icon: FolderOpen },
    { href: "/kinderen", label: "Kinderen", icon: Users },
    { href: "/vrijwilligers", label: "Vrijwilligers", icon: UserRound },
    { href: "/teksten", label: "Teksten", icon: FileText },
    { href: "/documenten", label: "PDF's", icon: Shield },
    { href: "/sponsors", label: "Sponsoren", icon: Handshake },
    { href: "/contact", label: "Contact", icon: Mail },
];

export default function AdminShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[240px_1fr]">
            <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between px-5 py-5 lg:block">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">KVW HeKoS</p>
                        <h1 className="mt-1 text-lg font-semibold">Beheer</h1>
                    </div>
                    <Button
                        variant="outline"
                        className="lg:mt-6"
                        onClick={async () => {
                            await api("/auth/logout", { method: "POST" });
                            window.location.href = "/login";
                        }}
                    >
                        <LogOut className="size-4" /> Uitloggen
                    </Button>
                </div>
                <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:px-3">
                    {links.map((link) => {
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
                    })}
                </nav>
            </aside>
            <main className="px-4 py-6 sm:px-8">{children}</main>
        </div>
    );
}
