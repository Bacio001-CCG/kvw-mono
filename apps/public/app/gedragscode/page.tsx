import { AlertTriangle, CheckCircle2, HeartHandshake, MessageSquareWarning, ShieldCheck, Users } from "lucide-react";

import PageHero from "@/components/site/page-hero";
import UnpublishedNotice from "@/components/site/unpublished-notice";
import { cmsPage, fetchPublicCmsSafe, paragraphs } from "@/lib/cms";

const kernprincipes = [
    {
        title: "Veiligheid staat voorop",
        description:
            "We zorgen samen voor een omgeving waarin kinderen zich fysiek en sociaal veilig voelen, met duidelijke grenzen en actieve begeleiding.",
    },
    {
        title: "Respect in gedrag en taal",
        description:
            "Iedereen gaat op een respectvolle manier met elkaar om. We spreken elkaar normaal aan en luisteren naar elkaar, ook als we het oneens zijn.",
    },
    {
        title: "Samen verantwoordelijk",
        description:
            "Vrijwilligers, ouders en deelnemers dragen samen bij aan een fijne sfeer. We grijpen in wanneer dat nodig is en laten elkaar niet zwemmen.",
    },
];

const ongewenstGedrag = [
    "Pesten, uitsluiten of intimideren in welke vorm dan ook.",
    "Discriminatie op basis van afkomst, geloof, gender, geaardheid of beperking.",
    "Fysiek of verbaal grensoverschrijdend gedrag.",
    "Bewust negeren van veiligheidsinstructies of afspraken.",
    "Delen van beeldmateriaal zonder toestemming van ouder of verzorger.",
];

const meldproces = [
    {
        title: "Signaal opvangen",
        description: "Zie of hoor je iets dat niet klopt? Meld het direct bij een hoofdleider of vertrouwenspersoon.",
    },
    {
        title: "Rustig bespreken",
        description: "We luisteren zonder oordeel, brengen de situatie in kaart en bepalen samen de juiste vervolgstap.",
    },
    {
        title: "Passend handelen",
        description: "We nemen maatregelen die passen bij de situatie en koppelen terug aan betrokkenen waar dat kan.",
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GedragscodePage() {
    const cms = await fetchPublicCmsSafe();
    const page = cmsPage(cms, "gedragscode");
    if (!page) return <UnpublishedNotice />;
    const bodyParagraphs = paragraphs(page.body || "");

    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Gedragscode"
                title={page.title}
                description={page.summary || ""}
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
                                We verwachten van iedereen een positieve houding. Dat betekent: elkaar helpen, grenzen respecteren
                                en direct aan de bel trekken als iets onveilig voelt.
                            </p>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <div className="space-y-10">
                    {bodyParagraphs.length ? (
                        <article className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">Gedragscode</p>
                            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                                {bodyParagraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </article>
                    ) : null}
                    <article className="rounded-3xl  bg-white p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">Kernprincipes</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dit is hoe we met elkaar omgaan</h2>
                        <div className="mt-6 grid gap-4 lg:grid-cols-3">
                            {kernprincipes.map((principe) => (
                                <article key={principe.title} className="rounded-2xl  bg-background p-5">
                                    <CheckCircle2 className="size-5 text-emerald-600" />
                                    <h3 className="mt-3 text-lg font-semibold text-foreground">{principe.title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{principe.description}</p>
                                </article>
                            ))}
                        </div>
                    </article>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <article className="rounded-3xl  bg-white p-6 sm:p-8">
                            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <AlertTriangle className="size-5" />
                            </div>
                            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Gedrag dat niet past bij HeKoS</h2>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                                {ongewenstGedrag.map((regel) => (
                                    <li key={regel} className="flex items-start gap-3">
                                        <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-red-500" />
                                        <span>{regel}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="rounded-3xl  bg-white p-6 sm:p-8">
                            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                                <MessageSquareWarning className="size-5" />
                            </div>
                            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Wat doen we als er iets gebeurt?</h2>
                            <div className="mt-5 space-y-5">
                                {meldproces.map((stap, index) => (
                                    <div key={stap.title} className="relative pl-8">
                                        <span className="absolute left-0 top-1 inline-flex size-5 items-center justify-center rounded-full  text-xs font-semibold text-foreground">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-base font-semibold text-foreground">{stap.title}</h3>
                                        <p className="mt-1 text-sm leading-7 text-muted-foreground">{stap.description}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
