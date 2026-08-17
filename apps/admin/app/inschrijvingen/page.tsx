"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

type Cycle = {
    id: string;
    year: number;
    label: string;
    status: string;
    isTestMode: boolean;
    childRegistrationsOpen: boolean;
    volunteerRegistrationsOpen: boolean;
    childRegistrationsOpenAt: string;
    childRegistrationsCloseAt: string;
    volunteerRegistrationsOpenAt: string;
    volunteerRegistrationsCloseAt: string;
    pricePerChild: string;
};

export default function InschrijvingenPage() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [cycle, setCycle] = useState<Cycle | null>(null);
    const [newYear, setNewYear] = useState(String(new Date().getFullYear() + 1));
    const [message, setMessage] = useState("");

    const load = async (preferredId?: string) => {
        const overview = await api<{ cycle: Cycle; cycles: Cycle[] }>("/admin/overview");
        setCycles(overview.cycles);
        setCycle(overview.cycles.find((item) => item.id === preferredId) || overview.cycle);
    };

    useEffect(() => {
        load().catch((error) => setMessage(error instanceof Error ? error.message : "Laden mislukt."));
    }, []);

    const patch = async (update: Partial<Cycle>) => {
        if (!cycle) return;
        const next = await api<Cycle>(`/admin/cycles/${cycle.id}`, {
            method: "PATCH",
            body: JSON.stringify(update),
        });
        setCycle(next);
        await load(next.id);
        setMessage("Opgeslagen.");
    };

    const createYear = async () => {
        await api("/admin/cycles", { method: "POST", body: JSON.stringify({ year: Number(newYear) }) });
        await load();
        setMessage(`Formulierjaar ${newYear} aangemaakt als concept in testmodus.`);
    };

    if (!cycle) {
        return (
            <AdminShell>
                <p className="text-muted-foreground">Inschrijvingen laden...</p>
            </AdminShell>
        );
    }

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Inschrijvingen {cycle.year}</h1>
                    <p className="mt-1 text-muted-foreground">
                        Open of sluit formulieren, test eerst in een testomgeving en start ieder jaar een nieuw formulier.
                    </p>
                </div>
                {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

                {cycles.length > 1 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Jaar beheren</CardTitle>
                            <CardDescription>Kies welk formulierjaar je nu wilt openen, sluiten of testen.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <select
                                className="border-input h-9 rounded-md border bg-transparent px-3 text-sm"
                                value={cycle.id}
                                onChange={(event) => {
                                    const next = cycles.find((item) => item.id === event.target.value);
                                    if (next) setCycle(next);
                                }}
                            >
                                {cycles.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.label} · {item.status}
                                    </option>
                                ))}
                            </select>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Open en dicht zetten</CardTitle>
                        <CardDescription>
                            Planning 2026: half mei open, half juni dicht. Je kunt dit zelf aanpassen.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <label className="flex items-center justify-between gap-3 text-sm">
                            Kindinschrijvingen open
                            <input type="checkbox" checked={cycle.childRegistrationsOpen} onChange={(event) => void patch({ childRegistrationsOpen: event.target.checked })} />
                        </label>
                        <label className="flex items-center justify-between gap-3 text-sm">
                            Vrijwilligersinschrijvingen open
                            <input type="checkbox" checked={cycle.volunteerRegistrationsOpen} onChange={(event) => void patch({ volunteerRegistrationsOpen: event.target.checked })} />
                        </label>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>Kinderen open vanaf</Label>
                                <Input type="date" value={cycle.childRegistrationsOpenAt} onChange={(event) => void patch({ childRegistrationsOpenAt: event.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Kinderen dicht vanaf</Label>
                                <Input type="date" value={cycle.childRegistrationsCloseAt} onChange={(event) => void patch({ childRegistrationsCloseAt: event.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Vrijwilligers open vanaf</Label>
                                <Input type="date" value={cycle.volunteerRegistrationsOpenAt} onChange={(event) => void patch({ volunteerRegistrationsOpenAt: event.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Vrijwilligers dicht vanaf</Label>
                                <Input type="date" value={cycle.volunteerRegistrationsCloseAt} onChange={(event) => void patch({ volunteerRegistrationsCloseAt: event.target.value })} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Testomgeving</CardTitle>
                        <CardDescription>
                            Zet testmodus aan om inschrijvingen en betaling te controleren voordat het formulier live gaat.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <label className="flex items-center justify-between gap-3 text-sm">
                            Testmodus aan
                            <input type="checkbox" checked={cycle.isTestMode} onChange={(event) => void patch({ isTestMode: event.target.checked })} />
                        </label>
                        <div className="grid gap-2">
                            <Label>Inschrijfgeld per kind</Label>
                            <Input value={cycle.pricePerChild} onChange={(event) => setCycle({ ...cycle, pricePerChild: event.target.value })} />
                            <Button className="w-fit bg-orange-500" onClick={() => void patch({ pricePerChild: cycle.pricePerChild })}>
                                Bedrag opslaan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Nieuw jaar</CardTitle>
                        <CardDescription>
                            Maak een nieuw inschrijfformulier voor het volgende jaar. Het huidige jaar blijft bewaard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-end gap-3">
                        <div className="grid gap-2">
                            <Label>Jaar</Label>
                            <Input className="w-32" value={newYear} onChange={(event) => setNewYear(event.target.value)} />
                        </div>
                        <Button variant="outline" onClick={() => void createYear()}>
                            Nieuw formulierjaar starten
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Eerdere jaren</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        {cycles.map((item) => (
                            <p key={item.id}>
                                {item.label} · {item.status} · {item.isTestMode ? "test" : "live"}
                            </p>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}
