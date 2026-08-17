"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@workspace/ui/components/button";
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react";

import PageHero from "@/components/site/page-hero";
import { useSiteStatus } from "@/components/site/site-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const isVolunteer = type === "vrijwilliger";
    const status = useSiteStatus();
    const content = status?.content;
    const message = isVolunteer
        ? content?.confirmationVolunteer || "Bedankt voor je aanmelding als vrijwilliger. We nemen zo snel mogelijk contact met je op."
        : content?.confirmationChild || "Bedankt voor de inschrijving. We nemen contact met je op per mail.";

    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Bevestiging"
                title={isVolunteer ? "Bedankt voor je aanmelding" : "Bedankt voor de inschrijving"}
                description={message}
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-500 to-sky-500 p-6 text-white shadow-none">
                            <CheckCircle2 className="size-10" />
                            <p className="mt-4 text-2xl font-semibold">Inschrijving ontvangen</p>
                            <p className="mt-2 text-sm text-white/85">We nemen contact op via de mail.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <Mail className="size-6 text-orange-500" />
                                <p className="mt-2 text-sm font-medium">Bevestiging per mail</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <ArrowLeft className="size-6 text-sky-500" />
                                <p className="mt-2 text-sm font-medium">Terug naar home</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <Card className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-none">
                    <div className="h-2 bg-linear-to-r from-orange-500 to-sky-500" />
                    <CardHeader>
                        <CardTitle>Wat gebeurt er nu?</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div className="space-y-4 text-base leading-7 text-muted-foreground">
                            <p>{message}</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-50 to-sky-50 p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">Volgende stap</p>
                            <p className="mt-3 text-lg font-semibold">Je ontvangt een bericht per mail</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">Voor dringende vragen: info@kvwhekos.nl</p>
                            <Button asChild className="mt-5 bg-orange-500">
                                <Link href="/">Terug naar homepagina</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}

export default function InschrijvingBevestigingPage() {
    return (
        <Suspense fallback={<p className="px-4 py-16 text-center text-muted-foreground">Bevestiging laden...</p>}>
            <ConfirmationContent />
        </Suspense>
    );
}
