import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react";

import PageHero from "@/components/site/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InschrijvingBevestigingPage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Bevestiging"
                title="Bedankt voor de inschrijving"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-500 to-sky-500 p-6 text-white shadow-none">
                            <CheckCircle2 className="size-10" />
                            <p className="mt-4 text-2xl font-semibold">Inschrijving ontvangen</p>
                            <p className="mt-2 text-sm text-white/85">Lorem ipsum dolor sit amet.</p>
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
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur,
                                id elit non mi porta gravida at eget metus.
                            </p>
                        </div>
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-50 to-sky-50 p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">Volgende stap</p>
                            <p className="mt-3 text-lg font-semibold">Je ontvangt een bevestiging per mail</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
