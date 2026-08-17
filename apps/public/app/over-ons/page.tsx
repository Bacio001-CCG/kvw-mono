import Image from "next/image";

import PageHero from "@/components/site/page-hero";
import UnpublishedNotice from "@/components/site/unpublished-notice";
import { cmsPage, fetchPublicCmsSafe, paragraphs } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OverOnsPage() {
    const cms = await fetchPublicCmsSafe();
    const page = cmsPage(cms, "over-ons");
    if (!page) return <UnpublishedNotice />;
    const bodyParagraphs = paragraphs(page.body || page.summary || "");

    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Over ons"
                title={page.title}
                description={page.summary || ""}
                visual={(
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-[1.5rem] bg-white/70 backdrop-blur-sm shadow-none">
                            <Image src="/crayons-1445053_1920.jpg" alt="HeKoS activiteiten" width={900} height={700} className="h-56 w-full object-cover" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-orange-500 p-4 text-white shadow-none">
                                <p className="text-2xl font-bold">55+</p>
                                <p className="text-sm text-white/80">jaar traditie</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <p className="text-2xl font-bold text-foreground">100%</p>
                                <p className="text-sm text-muted-foreground">vrijwilligerswerk</p>
                            </div>
                            <div className="rounded-2xl bg-sky-500 p-4 text-white shadow-none">
                                <p className="text-2xl font-bold">1 week</p>
                                <p className="text-sm text-white/80">vol plezier</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <section className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-10">
                <div className="space-y-12 lg:space-y-16">
                    <article className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Onze geschiedenis</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Van buurtinitiatief naar jaarlijkse traditie</h2>
                        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                            <div className="space-y-4 text-base leading-8 text-muted-foreground">
                                {bodyParagraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src="/hands.jpg"
                                    alt="Vrijwilligers en kinderen tijdens een activiteit"
                                    width={900}
                                    height={700}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-3xl  bg-white p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">Onze missie</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Een veilige en vrolijke week voor ieder kind</h2>
                        <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                            <p>
                                Onze missie is om een plek te bieden waar kinderen zichzelf kunnen zijn, nieuwe vrienden maken en met plezier
                                terugdenken aan hun zomervakantie. We geloven dat laagdrempelige activiteiten een groot verschil kunnen maken.
                            </p>
                            <p>
                                Daarom letten we niet alleen op leuke programma-onderdelen, maar ook op sfeer, veiligheid en persoonlijke aandacht.
                                Iedere groep krijgt begeleiding van enthousiaste vrijwilligers die oog hebben voor wat kinderen nodig hebben.
                            </p>
                            <p>
                                Samen met ouders, sponsoren en vrijwilligers zorgen we voor een week die voelt als een feestje,
                                en tegelijk bijdraagt aan zelfvertrouwen, samenwerking en plezier.
                            </p>
                        </div>
                    </article>

                    <article className="rounded-3xl  bg-linear-to-r from-orange-50/70 via-white to-sky-50/70 p-6 sm:p-8 lg:p-10">
                        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Waar we elke editie op sturen</h2>
                        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">Plezier eerst</p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">Activiteiten die passen bij leeftijd, energie en beleving van kinderen.</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">Veilig & vertrouwd</p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">Duidelijke afspraken, vaste begeleiding en aandacht voor elk kind.</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">Samen doen</p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">Vrijwilligers, ouders en sponsoren maken de week samen mogelijk.</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
