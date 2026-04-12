import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

import PageHero from "@/components/site/page-hero";

export default function GedragscodePage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Gedragscode"
                title="Samen zorgen we voor een veilige week"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                visual={(
                    <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-orange-500 p-4 text-white shadow-none">
                                <ShieldCheck className="size-7" />
                                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Veilig</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <Users className="size-7 text-sky-500" />
                                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Respect</p>
                            </div>
                            <div className="rounded-2xl bg-sky-500 p-4 text-white shadow-none">
                                <HeartHandshake className="size-7" />
                                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Samen</p>
                            </div>
                        </div>
                        <div className="rounded-[1.5rem] bg-white/70 backdrop-blur-sm p-5 shadow-none">
                            <p className="text-sm leading-7 text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
                        "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in.",
                        "Aenean lacinia bibendum nulla sed consectetur.",
                        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
                        "Maecenas faucibus mollis interdum et posuere consectetur est at lobortis.",
                    ].map((regel, index) => (
                        <article key={regel} className="group rounded-[1.5rem] bg-white/70 backdrop-blur-sm p-5 shadow-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-none">
                            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-sky-500 text-sm font-bold text-white">
                                {index + 1}
                            </div>
                            <p className="text-sm leading-7 text-foreground">{regel}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
