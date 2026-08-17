"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

type Sponsor = {
    id: string;
    name: string;
    websiteUrl: string;
    logoUrl: string;
    placement: "top" | "bottom" | "both";
    isActive: boolean;
};

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [name, setName] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [message, setMessage] = useState("");

    const load = () => api<Sponsor[]>("/admin/sponsors").then(setSponsors);

    useEffect(() => {
        load().catch(() => undefined);
    }, []);

    const save = async (sponsor: Sponsor) => {
        const next = await api<Sponsor>(`/admin/sponsors/${sponsor.id}`, {
            method: "PATCH",
            body: JSON.stringify(sponsor),
        });
        setSponsors((current) => current.map((item) => (item.id === next.id ? next : item)));
        setMessage("Sponsor opgeslagen.");
    };

    return (
        <AdminShell>
            <div className="mx-auto grid max-w-5xl gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Sponsoren</h1>
                    <p className="mt-1 text-muted-foreground">Beheer logo&apos;s die boven- en onderaan de website kunnen staan.</p>
                </div>
                {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
                <Card>
                    <CardHeader>
                        <CardTitle>Nieuwe sponsor</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-3">
                        <Input placeholder="Naam" value={name} onChange={(event) => setName(event.target.value)} />
                        <Input placeholder="Website" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} />
                        <Input placeholder="Logo-url" value={logoUrl} onChange={(event) => setLogoUrl(event.target.value)} />
                        <Button
                            className="bg-orange-500 md:col-span-3 w-fit"
                            onClick={async () => {
                                await api("/admin/sponsors", { method: "POST", body: JSON.stringify({ name, websiteUrl, logoUrl }) });
                                setName("");
                                setWebsiteUrl("");
                                setLogoUrl("");
                                await load();
                            }}
                        >
                            Toevoegen
                        </Button>
                    </CardContent>
                </Card>
                {sponsors.map((sponsor) => (
                    <Card key={sponsor.id}>
                        <CardHeader>
                            <CardTitle>{sponsor.name}</CardTitle>
                            <CardDescription>{sponsor.isActive ? "Zichtbaar" : "Verborgen"}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <div className="grid gap-2">
                                <Label>Naam</Label>
                                <Input value={sponsor.name} onChange={(event) => setSponsors((current) => current.map((item) => (item.id === sponsor.id ? { ...item, name: event.target.value } : item)))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Website</Label>
                                <Input value={sponsor.websiteUrl} onChange={(event) => setSponsors((current) => current.map((item) => (item.id === sponsor.id ? { ...item, websiteUrl: event.target.value } : item)))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Logo-url</Label>
                                <Input value={sponsor.logoUrl} onChange={(event) => setSponsors((current) => current.map((item) => (item.id === sponsor.id ? { ...item, logoUrl: event.target.value } : item)))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Plaatsing</Label>
                                <select
                                    className="border-input h-9 rounded-md border bg-transparent px-3 text-sm"
                                    value={sponsor.placement}
                                    onChange={(event) => setSponsors((current) => current.map((item) => (item.id === sponsor.id ? { ...item, placement: event.target.value as Sponsor["placement"] } : item)))}
                                >
                                    <option value="both">Boven en onder</option>
                                    <option value="top">Alleen boven</option>
                                    <option value="bottom">Alleen onder</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={sponsor.isActive}
                                    onChange={(event) => setSponsors((current) => current.map((item) => (item.id === sponsor.id ? { ...item, isActive: event.target.checked } : item)))}
                                />
                                Zichtbaar op de website
                            </label>
                            <Button className="w-fit bg-orange-500" onClick={() => void save(sponsor)}>Opslaan</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
