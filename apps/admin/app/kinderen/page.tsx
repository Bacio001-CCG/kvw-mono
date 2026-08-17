"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api, downloadCsv } from "@/lib/api";

type Child = {
    id: string;
    childFirstName: string;
    childLastName: string;
    guardianEmail: string;
    birthDate: string;
    gradeLevel: string;
    schoolType: string;
    status: string;
    isTest: boolean;
    submittedAt: string;
};

type Cycle = {
    id: string;
    label: string;
    childRegistrationsOpen: boolean;
    isTestMode: boolean;
};

export default function KinderenPage() {
    const [rows, setRows] = useState<Child[]>([]);
    const [cycle, setCycle] = useState<Cycle | null>(null);
    const [message, setMessage] = useState("");

    const load = async () => {
        const overview = await api<{ cycle: Cycle }>("/admin/overview");
        setCycle(overview.cycle);
        setRows(await api<Child[]>("/admin/children"));
    };

    useEffect(() => {
        load().catch((error) => setMessage(error instanceof Error ? error.message : "Laden mislukt."));
    }, []);

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-6xl gap-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold">Kindinschrijvingen</h1>
                        <p className="mt-1 text-muted-foreground">
                            Als de inschrijvingen dicht zijn, exporteer je de lijst naar Excel voor de groepsindeling.
                        </p>
                    </div>
                    <Button
                        className="bg-orange-500"
                        onClick={() => void downloadCsv("/admin/children/export", `kvw-kinderen-${cycle?.label || "export"}.csv`)}
                    >
                        Export CSV / Excel
                    </Button>
                </div>
                {cycle && !cycle.childRegistrationsOpen ? (
                    <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm">Inschrijvingen zijn dicht. Je kunt nu exporteren naar Excel.</p>
                ) : null}
                {message ? <p className="text-sm text-red-600">{message}</p> : null}
                <Card>
                    <CardHeader>
                        <CardTitle>{cycle?.label}</CardTitle>
                        <CardDescription>{rows.length} inschrijvingen</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="py-2 pr-3">Kind</th>
                                    <th className="py-2 pr-3">Geboortedatum</th>
                                    <th className="py-2 pr-3">Groep</th>
                                    <th className="py-2 pr-3">E-mail</th>
                                    <th className="py-2 pr-3">Status</th>
                                    <th className="py-2">Actie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length === 0 ? (
                                    <tr>
                                        <td className="py-4 text-muted-foreground" colSpan={6}>Nog geen inschrijvingen.</td>
                                    </tr>
                                ) : null}
                                {rows.map((row) => (
                                    <tr key={row.id} className="border-b border-slate-100">
                                        <td className="py-3 pr-3 font-medium">{row.childFirstName} {row.childLastName}</td>
                                        <td className="py-3 pr-3">{row.birthDate}</td>
                                        <td className="py-3 pr-3">{row.gradeLevel}</td>
                                        <td className="py-3 pr-3">{row.guardianEmail}</td>
                                        <td className="py-3 pr-3">{row.status}{row.isTest ? " · test" : ""}</td>
                                        <td className="py-3">
                                            {cycle?.isTestMode ? (
                                                <Button
                                                    variant="outline"
                                                    onClick={async () => {
                                                        await api(`/admin/children/${row.id}/payment`, { method: "PATCH" });
                                                        await load();
                                                    }}
                                                >
                                                    Test betaling
                                                </Button>
                                            ) : null}
                                        </td>
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
