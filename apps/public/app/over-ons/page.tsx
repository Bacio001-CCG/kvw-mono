import Image from "next/image";

import PageHero from "@/components/site/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverOnsPage() {
    return (
        <main className="flex flex-col gap-16 pb-20 pt-6 sm:gap-20 sm:pt-10">
            <PageHero
                eyebrow="Over ons"
                title="KVW HeKoS in een notendop"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
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
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-none">
                        <CardHeader>
                            <CardTitle>Onze geschiedenis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-base leading-7 text-muted-foreground">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
                                Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                            </p>
                            <p>
                                Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum et posuere consectetur est at lobortis.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-linear-to-br from-orange-50 to-sky-50 shadow-none">
                        <CardHeader>
                            <CardTitle>Onze missie</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-base leading-7 text-muted-foreground">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                            </p>
                            <p>
                                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}
