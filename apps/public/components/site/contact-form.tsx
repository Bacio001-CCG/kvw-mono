"use client";

import { FormEvent, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitJson } from "@/lib/submit-json";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await submitJson("/api/contact", { fullName, email, subject, message });
            setSubmitted(true);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Versturen mislukt.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-sm shadow-none">
            <CardHeader className="pb-3">
                <CardTitle>Contactformulier</CardTitle>
                <CardDescription>Stuur ons je vraag en we reageren zo snel mogelijk per e-mail.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Naam</Label>
                        <Input id="name" required className="h-11" value={fullName} onChange={(event) => setFullName(event.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mailadres</Label>
                        <Input id="email" type="email" required className="h-11" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Onderwerp</Label>
                        <Input id="subject" className="h-11" value={subject} onChange={(event) => setSubject(event.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Bericht</Label>
                        <Textarea id="message" rows={7} required className="min-h-34" value={message} onChange={(event) => setMessage(event.target.value)} />
                    </div>
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 md:w-fit" disabled={submitting}>
                        {submitting ? "Versturen..." : "Versturen"}
                    </Button>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    {submitted && (
                        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                            Bedankt! Je bericht is ontvangen. We nemen snel contact op.
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
