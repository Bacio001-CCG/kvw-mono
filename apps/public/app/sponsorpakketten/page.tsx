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
        perks: ["Lorem ipsum dolor", "Sit amet consectetur"],
    },
    {
        name: "Groei",
        amount: "EUR 500",
        perks: ["Lorem ipsum dolor", "Sit amet consectetur", "Adipiscing elit"],
    },
    {
        name: "Hoofdsponsor",
        amount: "EUR 1000+",
        perks: ["Lorem ipsum dolor", "Sit amet consectetur", "Aenean eu leo"],
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
                                "overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-none transition-transform duration-300 hover:-translate-y-1",
                                index === 1 ? "ring-2 ring-orange-500/20" : "",
                            )}
                        >
                            <div className={cn("h-2", index === 0 ? "bg-orange-500" : index === 1 ? "bg-linear-to-r from-orange-500 to-sky-500" : "bg-sky-500")} />
                            <CardHeader>
                                <CardTitle>{pkg.name}</CardTitle>
                                <CardDescription>{pkg.amount}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {pkg.perks.map((perk) => (
                                        <li key={perk} className="flex items-start gap-2">
                                            <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-foreground">✓</span>
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>
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
