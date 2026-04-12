"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type VolunteerValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAndNumber: string;
    postalCode: string;
    city: string;
    emergencyPhone: string;
    emergencyRelation: string;
    birthDate: string;
    hasBhv: "ja" | "nee";
    availability: "alles" | "week" | "anders";
    availabilityOther: string;
    groupPreference: "onderbouw" | "middenbouw" | "bovenbouw" | "geen-voorkeur";
    notes: string;
};

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const defaults: VolunteerValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAndNumber: "",
    postalCode: "",
    city: "",
    emergencyPhone: "",
    emergencyRelation: "",
    birthDate: "",
    hasBhv: "nee",
    availability: "week",
    availabilityOther: "",
    groupPreference: "geen-voorkeur",
    notes: "",
};

function ErrorText({ text }: { text?: string }) {
    if (!text) return null;
    return <p className="text-sm text-red-600">{text}</p>;
}

export default function VolunteerRegistrationForm() {
    const router = useRouter();
    const [values, setValues] = useState<VolunteerValues>(defaults);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const nextErrors: Record<string, string> = {};

        if (values.firstName.trim().length < 2) nextErrors.firstName = "Voornaam is verplicht.";
        if (values.lastName.trim().length < 2) nextErrors.lastName = "Achternaam is verplicht.";
        if (!values.email.includes("@")) nextErrors.email = "Geldig e-mailadres is verplicht.";
        if (values.phone.trim().length < 10) nextErrors.phone = "06-nummer is verplicht.";
        if (values.streetAndNumber.trim().length < 4) nextErrors.streetAndNumber = "Straat + huisnummer is verplicht.";
        if (values.postalCode.trim().length < 4) nextErrors.postalCode = "Postcode is verplicht.";
        if (values.city.trim().length < 2) nextErrors.city = "Stad is verplicht.";
        if (values.emergencyPhone.trim().length < 10) nextErrors.emergencyPhone = "Noodcontact telefoonnummer is verplicht.";
        if (values.emergencyRelation.trim().length < 2) nextErrors.emergencyRelation = "Relatie is verplicht.";
        if (!dateRegex.test(values.birthDate.trim())) nextErrors.birthDate = "Gebruik formaat dd/mm/jjjj.";
        if (values.availability === "anders" && values.availabilityOther.trim().length < 2) {
            nextErrors.availabilityOther = "Vul in welke dagen je beschikbaar bent.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        router.push("/inschrijven/bevestiging?type=vrijwilliger");
    };

    return (
        <Card className="mx-auto w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Inschrijven vrijwilliger</CardTitle>
                <CardDescription>Fijn dat je wilt helpen. Laat hieronder je gegevens en beschikbaarheid achter.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-6" onSubmit={onSubmit}>
                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">Voornaam</Label>
                            <Input id="firstName" value={values.firstName} onChange={(e) => setValues({ ...values, firstName: e.target.value })} />
                            <ErrorText text={errors.firstName} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Achternaam</Label>
                            <Input id="lastName" value={values.lastName} onChange={(e) => setValues({ ...values, lastName: e.target.value })} />
                            <ErrorText text={errors.lastName} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mailadres</Label>
                            <Input id="email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                            <ErrorText text={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">06-nummer</Label>
                            <Input id="phone" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
                            <ErrorText text={errors.phone} />
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="streetAndNumber">Straatnaam + huisnummer</Label>
                            <Input id="streetAndNumber" value={values.streetAndNumber} onChange={(e) => setValues({ ...values, streetAndNumber: e.target.value })} />
                            <ErrorText text={errors.streetAndNumber} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="postalCode">Postcode</Label>
                            <Input id="postalCode" value={values.postalCode} onChange={(e) => setValues({ ...values, postalCode: e.target.value })} />
                            <ErrorText text={errors.postalCode} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">Stad</Label>
                            <Input id="city" value={values.city} onChange={(e) => setValues({ ...values, city: e.target.value })} />
                            <ErrorText text={errors.city} />
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="emergencyPhone">Noodcontact telefoonnummer</Label>
                            <Input id="emergencyPhone" value={values.emergencyPhone} onChange={(e) => setValues({ ...values, emergencyPhone: e.target.value })} />
                            <ErrorText text={errors.emergencyPhone} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="emergencyRelation">Relatie (vader/moeder/vriend(in))</Label>
                            <Input id="emergencyRelation" value={values.emergencyRelation} onChange={(e) => setValues({ ...values, emergencyRelation: e.target.value })} />
                            <ErrorText text={errors.emergencyRelation} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="birthDate">Geboortedatum (dd/mm/jjjj)</Label>
                            <Input id="birthDate" placeholder="dd/mm/jjjj" value={values.birthDate} onChange={(e) => setValues({ ...values, birthDate: e.target.value })} />
                            <ErrorText text={errors.birthDate} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hasBhv">Heb je een BHV-diploma?</Label>
                            <select id="hasBhv" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.hasBhv} onChange={(e) => setValues({ ...values, hasBhv: e.target.value as VolunteerValues["hasBhv"] })}>
                                <option value="ja">Ja</option>
                                <option value="nee">Nee</option>
                            </select>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="availability">Welke dagen ben je erbij?</Label>
                            <select id="availability" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.availability} onChange={(e) => setValues({ ...values, availability: e.target.value as VolunteerValues["availability"] })}>
                                <option value="alles">Alle dagen (vergaderen t/m afbouwen)</option>
                                <option value="week">Alleen tijdens de week zelf: maandag t/m vrijdag</option>
                                <option value="anders">Anders, namelijk...</option>
                            </select>
                        </div>
                        {values.availability === "anders" && (
                            <div className="grid gap-2">
                                <Label htmlFor="availabilityOther">Anders, namelijk...</Label>
                                <Input id="availabilityOther" value={values.availabilityOther} onChange={(e) => setValues({ ...values, availabilityOther: e.target.value })} />
                                <ErrorText text={errors.availabilityOther} />
                            </div>
                        )}
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="groupPreference">Voorkeur voor onder-, midden- of bovenbouw</Label>
                            <select id="groupPreference" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm md:w-90" value={values.groupPreference} onChange={(e) => setValues({ ...values, groupPreference: e.target.value as VolunteerValues["groupPreference"] })}>
                                <option value="onderbouw">Onderbouw</option>
                                <option value="middenbouw">Middenbouw</option>
                                <option value="bovenbouw">Bovenbouw</option>
                                <option value="geen-voorkeur">Geen voorkeur</option>
                            </select>
                            <p className="text-sm text-muted-foreground">Dit is een voorkeur. We kunnen hier niet gegarandeerd rekening mee houden.</p>
                        </div>
                    </section>

                    <section className="grid gap-2">
                        <Label htmlFor="notes">Wil je nog iets kwijt? Bijzonderheden/allergieën?</Label>
                        <Textarea id="notes" rows={5} value={values.notes} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
                    </section>

                    <Button type="submit" className="w-full bg-sky-500 md:w-fit">
                        Inschrijving verzenden
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
