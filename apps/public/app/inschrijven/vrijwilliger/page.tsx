import VolunteerRegistrationForm from "@/components/site/volunteer-registration-form";
import PageHero from "@/components/site/page-hero";

export default function InschrijvenVrijwilligerPage() {
    return (
        <main className="flex flex-col gap-10 pb-20 pt-6 sm:pt-10">
            <PageHero
                eyebrow="Vrijwilliger"
                title="Help mee tijdens KVW HeKoS"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
                visual={(
                    <div className="space-y-4">
                        <div className="rounded-[1.5rem] bg-linear-to-br from-sky-500 to-orange-500 p-5 text-white shadow-none">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Voor helpers</p>
                            <p className="mt-3 text-xl font-semibold">Samen maken we de week mogelijk</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <p className="text-sm font-medium">Beschikbaarheid</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-none">
                                <p className="text-sm font-medium">Voorkeuren</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                <VolunteerRegistrationForm />
            </div>
        </main>
    );
}
