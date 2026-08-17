"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

type Overview = {
    cycle: {
        id: string;
        year: number;
        label: string;
        status: string;
        isTestMode: boolean;
        childRegistrationsOpen: boolean;
        volunteerRegistrationsOpen: boolean;
        childRegistrationsOpenAt: string;
        childRegistrationsCloseAt: string;
        pricePerChild: string;
    } | null;
    counts: { children: number; volunteers: number; contactsUnread: number; contacts: number };
};

export default function DashboardPage() {
    const [data, setData] = useState<Overview | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api<Overview>("/admin/overview")
            .then(setData)
            .catch((item) => setError(item instanceof Error ? item.message : "Laden mislukt."));
    }, []);

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Overzicht</h1>
                    <p className="mt-1 text-muted-foreground">Beheer inschrijvingen, teksten en exports zonder een ontwikkelaar.</p>
                </div>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                {data?.cycle?.isTestMode ? (
                    <div className="rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-950">
                        Testomgeving staat aan. Controleer formulieren en betaling eerst hier, daarna kun je live zetten.
                    </div>
                ) : null}
                <section className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>{data?.counts.children ?? "-"}</CardTitle>
                            <CardDescription>Kindinschrijvingen</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{data?.counts.volunteers ?? "-"}</CardTitle>
                            <CardDescription>Vrijwilligers</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{data?.counts.contactsUnread ?? "-"}</CardTitle>
                            <CardDescription>Ongelezen contactberichten</CardDescription>
                        </CardHeader>
                    </Card>
                </section>
                <Card>
                    <CardHeader>
                        <CardTitle>{data?.cycle?.label || "Geen jaar geopend"}</CardTitle>
                        <CardDescription>
                            Kindinschrijvingen {data?.cycle?.childRegistrationsOpen ? "open" : "dicht"} ·
                            vrijwilligers {data?.cycle?.volunteerRegistrationsOpen ? "open" : "dicht"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        <Button asChild className="bg-orange-500">
                            <Link href="/inschrijvingen">Inschrijvingen beheren</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/kinderen">Export kinderen</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/teksten">Teksten aanpassen</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Beveiliging</CardTitle>
                        <CardDescription>
                            Deze omgeving is alleen voor de organisatie. Zet de website live altijd via HTTPS, zodat bezoekers geen melding krijgen van een onveilige site. Kindgegevens blijven achter login.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AdminShell>
    );
}
