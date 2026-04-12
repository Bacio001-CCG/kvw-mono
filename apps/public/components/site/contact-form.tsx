"use client";

import { FormEvent, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contactformulier</CardTitle>
                <CardDescription>Stuur ons je vraag en we reageren zo snel mogelijk per e-mail.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Naam</Label>
                        <Input id="name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mailadres</Label>
                        <Input id="email" type="email" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Bericht</Label>
                        <Textarea id="message" rows={6} required />
                    </div>
                    <Button type="submit" className="w-full md:w-fit">
                        Versturen
                    </Button>
                    {submitted && (
                        <p className="text-sm text-green-700">Bedankt! Je bericht is ontvangen. We nemen snel contact op.</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
