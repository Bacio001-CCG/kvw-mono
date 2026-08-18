"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

import { EMPTY_CMS, type PublicCms } from "@/lib/cms";

export type SiteStatus = PublicCms;

const SiteStatusContext = createContext<PublicCms | null>(null);

export function SiteStatusProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<PublicCms | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const proxy = await fetch("/api/site/status", { cache: "no-store" });
                if (!proxy.ok) {
                    setStatus(EMPTY_CMS);
                    return;
                }
                setStatus((await proxy.json()) as PublicCms);
            } catch {
                setStatus(EMPTY_CMS);
            }
        };

        void load();
    }, []);

    return <SiteStatusContext.Provider value={status}>{children}</SiteStatusContext.Provider>;
}

export function useSiteStatus() {
    return useContext(SiteStatusContext);
}

export function TestModeBanner() {
    const status = useSiteStatus();
    if (!status?.isTestMode) return null;

    return (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">
            Testomgeving {status.label}: inschrijvingen en betalingen zijn nog niet live.
        </div>
    );
}

export function RegistrationGate({
    type,
    children,
}: {
    type: "child" | "volunteer";
    children: ReactNode;
}) {
    const status = useSiteStatus();

    if (!status) {
        return <p className="px-4 py-12 text-center text-muted-foreground">Formulier laden...</p>;
    }

    const open = type === "child" ? status.childOpen : status.volunteerOpen;
    if (open) return children;

    const openAt = type === "child" ? status.childOpenAt : status.volunteerOpenAt;
    const closeAt = type === "child" ? status.childCloseAt : status.volunteerCloseAt;

    return (
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold">Inschrijvingen zijn gesloten</h2>
            <p className="mt-3 text-muted-foreground">
                {type === "child"
                    ? "De kindinschrijvingen voor deze editie zijn nu dicht. Heb je een dringende vraag? Mail ons via info@kvwhekos.nl."
                    : "De vrijwilligersinschrijvingen voor deze editie zijn nu dicht. Mail ons via info@kvwhekos.nl als je toch wilt helpen."}
            </p>
            {openAt || closeAt ? (
                <p className="mt-2 text-sm text-muted-foreground">
                    Geplande periode: {openAt || "n.n.b."} tot {closeAt || "n.n.b."}
                </p>
            ) : null}
            <Link href="/contact" className="mt-6 inline-block text-orange-600 underline">
                Naar contact
            </Link>
        </div>
    );
}
