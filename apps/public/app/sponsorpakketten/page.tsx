import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { Check, Star } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHero from "@/components/site/page-hero";

const packages = [
    {
        name: "Basis",
        amount: "EUR 250",
        audience: "Voor lokale ondernemers",
        perks: [
            "Logo op de website",
            "Vermelding op sponsorbord",
            "Bedankje op social media",
        ],
        accent: "from-orange-500/90 to-amber-400/90",
    },
    {
        name: "Groei",
        amount: "EUR 500",
        audience: "Meest gekozen pakket",
        perks: [
            "Alles uit Basis",
            "Extra zichtbaarheid tijdens de week",
            "Vermelding in programmaboekje",
        ],
        accent: "from-orange-500 to-sky-500",
        featured: true,
    },
    {
        name: "Hoofdsponsor",
        amount: "EUR 1000+",
        audience: "Maximale impact en maatwerk",
        perks: [
            "Alles uit Groei",
            "Hoofdsponsor-vermelding op alle uitingen",
            "Maatwerkactivatie in overleg",
        ],
        accent: "from-sky-500/90 to-cyan-400/90",
    },
];

export default function SponsorPakkettenPage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Sponsoren"
                title="Sponsorpakketten die passen bij jouw organisatie"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                actions={(
                    <Button asChild className="bg-orange-500">
                        <Link href="/contact">Neem contact op</Link>
                    </Button>
                )}
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-500 to-sky-500 p-5 text-white shadow-none">
                            <Star className="size-7" />
                            <p className="mt-3 text-lg font-semibold">Samen investeren in plezier</p>
                            <p className="mt-2 text-sm text-white/85">Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <Check className="size-6 text-orange-500" />
                                <p className="mt-2 text-sm font-medium">Zichtbaarheid</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <Check className="size-6 text-sky-500" />
                                <p className="mt-2 text-sm font-medium">Maatwerk mogelijk</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full px-4 sm:px-6 lg:px-10" style={{ maxWidth: 1200 }}>
                <div className="grid gap-6 md:grid-cols-3">
                    {packages.map((pkg, index) => (
                        <Card
                            key={pkg.name}
                            className={cn(
                                "group relative flex h-full flex-col overflow-hidden border-0 bg-white/95 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_-24px_rgba(15,23,42,0.45)]",
                                pkg.featured ? "ring-2 ring-orange-500/30" : "",
                            )}
                        >
                            <div className={cn("h-1.5 bg-linear-to-r", pkg.accent)} />
                            <CardHeader className="space-y-4 pb-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-2xl tracking-tight">{pkg.name}</CardTitle>
                                        <CardDescription className="mt-1 text-sm">{pkg.audience}</CardDescription>
                                    </div>
                                    {pkg.featured ? (
                                        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                            Populair
                                        </span>
                                    ) : null}
                                </div>
                                <p className="text-3xl font-semibold leading-none text-foreground">{pkg.amount}</p>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col gap-6">
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {pkg.perks.map((perk) => (
                                        <li key={perk} className="flex items-start gap-2">
                                            <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">✓</span>
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className={cn("mt-auto w-full", pkg.featured ? "bg-orange-500 hover:bg-orange-600" : "bg-slate-900 hover:bg-slate-800")}>
                                    <Link href="/contact">Kies dit pakket</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] bg-linear-to-r from-orange-50 via-white to-sky-50 p-6 shadow-none sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">Ook sponsor worden?</h2>
                            <p className="mt-2 max-w-2xl text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <Button asChild className="bg-orange-500">
                            <Link href="/contact">Neem contact op</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
