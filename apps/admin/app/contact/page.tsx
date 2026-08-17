"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

type Contact = {
    id: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export default function ContactPage() {
    const [rows, setRows] = useState<Contact[]>([]);

    const load = () => api<Contact[]>("/admin/contacts").then(setRows);

    useEffect(() => {
        load().catch(() => undefined);
    }, []);

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Contactberichten</h1>
                    <p className="mt-1 text-muted-foreground">Berichten uit het contactformulier op de website.</p>
                </div>
                {rows.length === 0 ? <p className="text-muted-foreground">Nog geen berichten.</p> : null}
                {rows.map((row) => (
                    <Card key={row.id} className={row.isRead ? "opacity-80" : ""}>
                        <CardHeader>
                            <CardTitle>{row.subject}</CardTitle>
                            <CardDescription>
                                {row.fullName} · {row.email} · {new Date(row.createdAt).toLocaleString("nl-NL")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <p className="text-sm leading-6">{row.message}</p>
                            {!row.isRead ? (
                                <Button
                                    variant="outline"
                                    className="w-fit"
                                    onClick={async () => {
                                        await api(`/admin/contacts/${row.id}`, { method: "PATCH", body: JSON.stringify({ isRead: true }) });
                                        await load();
                                    }}
                                >
                                    Markeer als gelezen
                                </Button>
                            ) : null}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
