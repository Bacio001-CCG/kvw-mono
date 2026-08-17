"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

type Page = { id: string; slug: string; title: string; summary: string; body: string; isPublished: boolean };
type Block = { id: string; pageSlug: string; blockKey: string; title: string; body: string; isActive: boolean };

export default function TekstenPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        api<Page[]>("/admin/pages").then(setPages);
        api<Block[]>("/admin/blocks").then(setBlocks);
    }, []);

    const savePage = async (page: Page) => {
        const next = await api<Page>(`/admin/pages/${page.id}`, { method: "PATCH", body: JSON.stringify(page) });
        setPages((current) => current.map((item) => (item.id === next.id ? next : item)));
        setMessage("Tekst opgeslagen.");
    };

    const saveBlock = async (block: Block) => {
        const next = await api<Block>(`/admin/blocks/${block.id}`, { method: "PATCH", body: JSON.stringify(block) });
        setBlocks((current) => current.map((item) => (item.id === next.id ? next : item)));
        setMessage("Tekst opgeslagen.");
    };

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Teksten</h1>
                    <p className="mt-1 text-muted-foreground">
                        Pas zelf jaartallen, homepage-teksten, over ons, gedragscode en bevestigingen aan.
                    </p>
                </div>
                {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Korte websiteblokken</CardTitle>
                        <CardDescription>Handig voor titels en datums op de homepage.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-5">
                        {blocks.map((block) => (
                            <div key={block.id} className="grid gap-2">
                                <Label>{block.title}</Label>
                                <Input value={block.body} onChange={(event) => setBlocks((current) => current.map((item) => (item.id === block.id ? { ...item, body: event.target.value } : item)))} />
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={block.isActive} onChange={(event) => setBlocks((current) => current.map((item) => (item.id === block.id ? { ...item, isActive: event.target.checked } : item)))} />
                                    Zichtbaar op de website
                                </label>
                                <Button className="w-fit bg-orange-500" onClick={() => void saveBlock(block)}>Opslaan</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {pages.map((page) => (
                    <Card key={page.id}>
                        <CardHeader>
                            <CardTitle>{page.title}</CardTitle>
                            <CardDescription>/{page.slug}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Input value={page.title} onChange={(event) => setPages((current) => current.map((item) => (item.id === page.id ? { ...item, title: event.target.value } : item)))} />
                            <Input value={page.summary} onChange={(event) => setPages((current) => current.map((item) => (item.id === page.id ? { ...item, summary: event.target.value } : item)))} />
                            <Textarea rows={6} value={page.body} onChange={(event) => setPages((current) => current.map((item) => (item.id === page.id ? { ...item, body: event.target.value } : item)))} />
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={page.isPublished} onChange={(event) => setPages((current) => current.map((item) => (item.id === page.id ? { ...item, isPublished: event.target.checked } : item)))} />
                                Pagina zichtbaar op de website
                            </label>
                            <Button className="w-fit bg-orange-500" onClick={() => void savePage(page)}>Tekst opslaan</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
