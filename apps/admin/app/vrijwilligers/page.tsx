"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api, downloadCsv } from "@/lib/api";

type Volunteer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    availability: string;
    ageGroupPreference: string;
    hasBhvCertificate: boolean;
    submittedAt: string;
};

export default function VrijwilligersPage() {
    const [rows, setRows] = useState<Volunteer[]>([]);
    const [label, setLabel] = useState("KVW");

    useEffect(() => {
        api<{ cycle?: { label: string } }>("/admin/overview").then((overview) => {
            if (overview.cycle?.label) setLabel(overview.cycle.label);
        });
        api<Volunteer[]>("/admin/volunteers").then(setRows).catch(() => undefined);
    }, []);

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-6xl gap-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold">Vrijwilligers</h1>
                        <p className="mt-1 text-muted-foreground">Overzicht van aanmeldingen, inclusief export naar Excel.</p>
                    </div>
                    <Button className="bg-sky-500" onClick={() => void downloadCsv("/admin/volunteers/export", `kvw-vrijwilligers-${label}.csv`)}>
                        Export CSV / Excel
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{label}</CardTitle>
                        <CardDescription>{rows.length} vrijwilligers</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="py-2 pr-3">Naam</th>
                                    <th className="py-2 pr-3">E-mail</th>
                                    <th className="py-2 pr-3">Telefoon</th>
                                    <th className="py-2 pr-3">Beschikbaarheid</th>
                                    <th className="py-2">Voorkeur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length === 0 ? (
                                    <tr>
                                        <td className="py-4 text-muted-foreground" colSpan={5}>Nog geen aanmeldingen.</td>
                                    </tr>
                                ) : null}
                                {rows.map((row) => (
                                    <tr key={row.id} className="border-b border-slate-100">
                                        <td className="py-3 pr-3 font-medium">{row.firstName} {row.lastName}</td>
                                        <td className="py-3 pr-3">{row.email}</td>
                                        <td className="py-3 pr-3">{row.phoneNumber}</td>
                                        <td className="py-3 pr-3">{row.availability}</td>
                                        <td className="py-3">{row.ageGroupPreference}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}
