import ChildRegistrationForm from "@/components/site/child-registration-form";
import PageHero from "@/components/site/page-hero";
import { RegistrationGate } from "@/components/site/site-status";

export default function InschrijvenKindPage() {
    return (
        <main className="flex flex-col gap-10 pb-20 pt-6 sm:pt-10">
            <PageHero
                eyebrow="Inschrijven kind"
                title="Meld je kind aan voor KVW HeKoS"
                description="Vul de gegevens van je kind in. We gebruiken ze voor een veilige week en een passende groepsindeling."
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-orange-500 to-orange-400 p-5 text-white shadow-none">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Voor ouders</p>
                            <p className="mt-3 text-xl font-semibold">Snel en overzichtelijk inschrijven</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <p className="text-sm font-medium">Gegevens kind</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <p className="text-sm font-medium">Praktische info</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                <RegistrationGate type="child">
                    <ChildRegistrationForm />
                </RegistrationGate>
            </div>
        </main>
    );
}
