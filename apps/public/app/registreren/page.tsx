import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { ArrowRight, Users, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHero from "@/components/site/page-hero";

export default function RegistrerenPage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Registreren"
                title="Kies het juiste inschrijfformulier"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                visual={(
                    <div className="grid gap-3">
                        <div className="rounded-[1.5rem] bg-orange-500 p-5 text-white shadow-none">
                            <Users className="size-7" />
                            <p className="mt-3 text-lg font-semibold">Voor kinderen en vrijwilligers</p>
                            <p className="mt-2 text-sm text-white/85">Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <Sparkles className="size-6 text-sky-500" />
                                <p className="mt-2 text-sm font-medium">Rustige formulieren</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <ArrowRight className="size-6 text-orange-500" />
                                <p className="mt-2 text-sm font-medium">Snel verder</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-none transition-transform duration-300 hover:-translate-y-1">
                        <div className="h-2 bg-linear-to-r from-orange-500 to-orange-300" />
                        <CardHeader>
                            <CardTitle>Kind inschrijven</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm leading-7 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <Button asChild className="bg-orange-500">
                                <Link href="/inschrijven/kind">Naar kindformulier</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-none transition-transform duration-300 hover:-translate-y-1">
                        <div className="h-2 bg-linear-to-r from-sky-500 to-sky-300" />
                        <CardHeader>
                            <CardTitle>Vrijwilliger worden</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm leading-7 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <Button asChild variant="outline">
                                <Link href="/inschrijven/vrijwilliger">Naar vrijwilligerformulier</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}
