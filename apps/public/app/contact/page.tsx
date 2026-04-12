import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

import ContactForm from "@/components/site/contact-form";
import PageHero from "@/components/site/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Contact"
                title="Neem contact op met HeKoS"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-500 to-orange-400 p-5 text-white shadow-none">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Snel contact</p>
                            <p className="mt-3 text-2xl font-semibold leading-tight">info@kvwhekos.nl</p>
                            <p className="mt-2 text-sm text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4">
                                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Facebook</p>
                                <p className="mt-1 text-sm font-medium">@kvwhekos</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4">
                                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Instagram</p>
                                <p className="mt-1 text-sm font-medium">@kvw_hekos</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <ContactForm />

                    <div className="space-y-6">
                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-none">
                            <CardHeader>
                                <CardTitle>Direct contact</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm leading-6 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <div className="space-y-3 text-sm">
                                    <Link href="mailto:info@kvwhekos.nl" className="flex items-center gap-2 transition-colors hover:text-orange-600">
                                        <Mail className="size-4" /> info@kvwhekos.nl
                                    </Link>
                                    <Link href="https://www.facebook.com/kvwhekos" target="_blank" className="flex items-center gap-2 transition-colors hover:text-orange-600">
                                        <Facebook className="size-4" /> Facebook
                                    </Link>
                                    <Link href="https://www.instagram.com/kvw_hekos/" target="_blank" className="flex items-center gap-2 transition-colors hover:text-orange-600">
                                        <Instagram className="size-4" /> Instagram
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-linear-to-br from-orange-50 to-white p-5 shadow-none">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">Reactietijd</p>
                                <p className="mt-3 text-lg font-semibold">Meestal binnen 2 werkdagen</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="rounded-[1.5rem] bg-linear-to-br from-sky-50 to-white p-5 shadow-none">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Tip</p>
                                <p className="mt-3 text-lg font-semibold">Vermeld je vraag duidelijk</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
