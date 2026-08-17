"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

type Document = {
    id: string;
    kind: string;
    title: string;
    description: string;
    fileUrl: string;
    opensInNewTab: boolean;
    isActive: boolean;
};

export default function DocumentenPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        api<Document[]>("/admin/documents").then(setDocuments);
    }, []);

    const save = async (document: Document) => {
        const next = await api<Document>(`/admin/documents/${document.id}`, {
            method: "PATCH",
            body: JSON.stringify(document),
        });
        setDocuments((current) => current.map((item) => (item.id === next.id ? next : item)));
        setMessage("Document opgeslagen. Een klik op de website opent de PDF in een nieuw tabblad.");
    };

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Programma en groepsindeling</h1>
                    <p className="mt-1 text-muted-foreground">Beheer de PDF-bestanden die bezoekers in een nieuw tabblad openen.</p>
                </div>
                {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
                {documents.map((document) => (
                    <Card key={document.id}>
                        <CardHeader>
                            <CardTitle>{document.title}</CardTitle>
                            <CardDescription>{document.kind === "program" ? "Programma" : "Groepsindeling"}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <div className="grid gap-2">
                                <Label>Titel</Label>
                                <Input value={document.title} onChange={(event) => setDocuments((current) => current.map((item) => (item.id === document.id ? { ...item, title: event.target.value } : item)))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Beschrijving</Label>
                                <Input value={document.description} onChange={(event) => setDocuments((current) => current.map((item) => (item.id === document.id ? { ...item, description: event.target.value } : item)))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Bestandslink</Label>
                                <Input value={document.fileUrl} onChange={(event) => setDocuments((current) => current.map((item) => (item.id === document.id ? { ...item, fileUrl: event.target.value } : item)))} />
                            </div>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={document.isActive} onChange={(event) => setDocuments((current) => current.map((item) => (item.id === document.id ? { ...item, isActive: event.target.checked } : item)))} />
                                Zichtbaar op de website
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={document.opensInNewTab} onChange={(event) => setDocuments((current) => current.map((item) => (item.id === document.id ? { ...item, opensInNewTab: event.target.checked } : item)))} />
                                Openen in nieuw tabblad
                            </label>
                            <Button className="w-fit bg-orange-500" onClick={() => void save(document)}>Opslaan</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
