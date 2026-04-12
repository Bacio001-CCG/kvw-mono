"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
    childFirstName: string;
    childLastName: string;
    streetAndNumber: string;
    postalCode: string;
    city: string;
    parentEmail: string;
    confirmParentEmail: string;
    phone1: string;
    phone2: string;
    school: "armhoefse-akker" | "panta-rhei" | "pendula" | "anders";
    schoolOther: string;
    birthDate: string;
    groupAfterSummer: string;
    buddyRequest: string;
    swimDiplomas: string[];
    waInsured: "ja" | "nee";
    goingHome: "zelfstandig" | "ophalen";
    donation: "none" | "5" | "10" | "25" | "anders";
    donationOtherAmount: string;
    notes: string;
    termsAccepted: boolean;
    photoConsent: boolean;
};

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const defaultValues: FormValues = {
    childFirstName: "",
    childLastName: "",
    streetAndNumber: "",
    postalCode: "",
    city: "",
    parentEmail: "",
    confirmParentEmail: "",
    phone1: "",
    phone2: "",
    school: "armhoefse-akker",
    schoolOther: "",
    birthDate: "",
    groupAfterSummer: "groep-1",
    buddyRequest: "",
    swimDiplomas: [],
    waInsured: "ja",
    goingHome: "ophalen",
    donation: "none",
    donationOtherAmount: "",
    notes: "",
    termsAccepted: false,
    photoConsent: false,
};

function ErrorText({ text }: { text?: string }) {
    if (!text) return null;
    return <p className="text-sm text-red-600">{text}</p>;
}

export default function ChildRegistrationForm() {
    const router = useRouter();
    const [values, setValues] = useState<FormValues>(defaultValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const diplomaSet = useMemo(() => new Set(values.swimDiplomas), [values.swimDiplomas]);

    const validate = () => {
        const nextErrors: Record<string, string> = {};

        if (values.childFirstName.trim().length < 2) nextErrors.childFirstName = "Voornaam kind is verplicht.";
        if (values.childLastName.trim().length < 2) nextErrors.childLastName = "Achternaam kind is verplicht.";
        if (values.streetAndNumber.trim().length < 4) nextErrors.streetAndNumber = "Straat + huisnummer is verplicht.";
        if (values.postalCode.trim().length < 4) nextErrors.postalCode = "Postcode is verplicht.";
        if (values.city.trim().length < 2) nextErrors.city = "Stad is verplicht.";
        if (!values.parentEmail.includes("@")) nextErrors.parentEmail = "Geldig e-mailadres is verplicht.";
        if (values.confirmParentEmail !== values.parentEmail) nextErrors.confirmParentEmail = "E-mailadressen komen niet overeen.";
        if (values.phone1.trim().length < 10) nextErrors.phone1 = "Telefoonnummer 1 is verplicht.";
        if (values.phone2.trim().length < 10) nextErrors.phone2 = "Telefoonnummer 2 is verplicht.";
        if (values.school === "anders" && values.schoolOther.trim().length < 2) nextErrors.schoolOther = "Vul de schoolnaam in.";
        if (!dateRegex.test(values.birthDate.trim())) nextErrors.birthDate = "Gebruik formaat dd/mm/jjjj.";
        if (values.swimDiplomas.length === 0) nextErrors.swimDiplomas = "Kies minimaal een zwemdiploma-optie.";
        if (values.swimDiplomas.includes("Geen") && values.swimDiplomas.length > 1) {
            nextErrors.swimDiplomas = "Kies alleen 'Geen' of A/B/C.";
        }
        if (values.donation === "anders" && values.donationOtherAmount.trim().length === 0) {
            nextErrors.donationOtherAmount = "Vul een bedrag in bij Anders.";
        }
        if (values.notes.trim().length < 10) nextErrors.notes = "Vul bijzonderheden in (minimaal 10 tekens).";
        if (!values.termsAccepted) nextErrors.termsAccepted = "Akkoord met voorwaarden is verplicht.";
        if (!values.photoConsent) nextErrors.photoConsent = "Akkoord met foto-toestemming is verplicht.";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        router.push("/inschrijven/bevestiging?type=kind");
    };

    const toggleDiploma = (value: "A" | "B" | "C" | "Geen") => {
        const current = values.swimDiplomas;
        if (current.includes(value)) {
            setValues({ ...values, swimDiplomas: current.filter((item) => item !== value) });
            return;
        }

        if (value === "Geen") {
            setValues({ ...values, swimDiplomas: ["Geen"] });
            return;
        }

        setValues({
            ...values,
            swimDiplomas: [...current.filter((item) => item !== "Geen"), value],
        });
    };

    return (
        <Card className="mx-auto w-full max-w-5xl">
            <CardHeader>
                <CardTitle>Inschrijven kind</CardTitle>
                <CardDescription>Vul alle gegevens in voor de kindinschrijving.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-6" onSubmit={onSubmit}>
                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="childFirstName">Voornaam kind</Label>
                            <Input id="childFirstName" value={values.childFirstName} onChange={(e) => setValues({ ...values, childFirstName: e.target.value })} />
                            <ErrorText text={errors.childFirstName} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="childLastName">Achternaam kind</Label>
                            <Input id="childLastName" value={values.childLastName} onChange={(e) => setValues({ ...values, childLastName: e.target.value })} />
                            <ErrorText text={errors.childLastName} />
                        </div>
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
                            <Label htmlFor="parentEmail">Mailadres 1 (ouder/verzorger)</Label>
                            <Input id="parentEmail" type="email" value={values.parentEmail} onChange={(e) => setValues({ ...values, parentEmail: e.target.value })} />
                            <ErrorText text={errors.parentEmail} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmParentEmail">Bevestig mailadres</Label>
                            <Input id="confirmParentEmail" type="email" value={values.confirmParentEmail} onChange={(e) => setValues({ ...values, confirmParentEmail: e.target.value })} />
                            <ErrorText text={errors.confirmParentEmail} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone1">Telefoonnummer 1</Label>
                            <Input id="phone1" value={values.phone1} onChange={(e) => setValues({ ...values, phone1: e.target.value })} />
                            <ErrorText text={errors.phone1} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone2">Telefoonnummer 2</Label>
                            <Input id="phone2" value={values.phone2} onChange={(e) => setValues({ ...values, phone2: e.target.value })} />
                            <ErrorText text={errors.phone2} />
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="school">Basisschool</Label>
                            <select id="school" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.school} onChange={(e) => setValues({ ...values, school: e.target.value as FormValues["school"] })}>
                                <option value="armhoefse-akker">Armhoefse Akker</option>
                                <option value="panta-rhei">Panta Rhei</option>
                                <option value="pendula">Pendula</option>
                                <option value="anders">Anders, namelijk...</option>
                            </select>
                        </div>
                        {values.school === "anders" && (
                            <div className="grid gap-2">
                                <Label htmlFor="schoolOther">Anders, namelijk...</Label>
                                <Input id="schoolOther" value={values.schoolOther} onChange={(e) => setValues({ ...values, schoolOther: e.target.value })} />
                                <ErrorText text={errors.schoolOther} />
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="birthDate">Geboortedatum kind (dd/mm/jjjj)</Label>
                            <Input id="birthDate" placeholder="dd/mm/jjjj" value={values.birthDate} onChange={(e) => setValues({ ...values, birthDate: e.target.value })} />
                            <ErrorText text={errors.birthDate} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="groupAfterSummer">Na de zomervakantie ga ik naar groep</Label>
                            <select id="groupAfterSummer" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.groupAfterSummer} onChange={(e) => setValues({ ...values, groupAfterSummer: e.target.value })}>
                                <option value="groep-1">Groep 1</option>
                                <option value="groep-2">Groep 2</option>
                                <option value="groep-3">Groep 3</option>
                                <option value="groep-4">Groep 4</option>
                                <option value="groep-5">Groep 5</option>
                                <option value="groep-6">Groep 6</option>
                                <option value="groep-7">Groep 7</option>
                                <option value="groep-8">Groep 8</option>
                                <option value="middelbare-1">Eerste klas middelbare school</option>
                            </select>
                        </div>
                    </section>

                    <section className="grid gap-2">
                        <Label htmlFor="buddyRequest">Ik wil graag in het groepje bij</Label>
                        <Input id="buddyRequest" placeholder="Voor- en achternaam" value={values.buddyRequest} onChange={(e) => setValues({ ...values, buddyRequest: e.target.value })} />
                        <p className="text-sm text-muted-foreground">
                            Let op: vul de voor- en achternaam van het kind in. "Kinderen uit groep 1A" helpt ons niet bij de indeling.
                        </p>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Welke zwemdiploma&apos;s heeft uw kind?</Label>
                            {(["A", "B", "C", "Geen"] as const).map((item) => (
                                <label key={item} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={diplomaSet.has(item)} onChange={() => toggleDiploma(item)} />
                                    {item}
                                </label>
                            ))}
                            <ErrorText text={errors.swimDiplomas} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="waInsured">Is uw kind WA-verzekerd?</Label>
                            <select id="waInsured" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.waInsured} onChange={(e) => setValues({ ...values, waInsured: e.target.value as FormValues["waInsured"] })}>
                                <option value="ja">Ja</option>
                                <option value="nee">Nee</option>
                            </select>
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="goingHome">Einde KVW-dag: zelfstandig naar huis of ophalen?</Label>
                            <select id="goingHome" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm" value={values.goingHome} onChange={(e) => setValues({ ...values, goingHome: e.target.value as FormValues["goingHome"] })}>
                                <option value="zelfstandig">Mijn kind mag zelfstandig naar huis toe.</option>
                                <option value="ophalen">Ik haal mijn kind op.</option>
                            </select>
                        </div>
                    </section>

                    <section className="grid gap-2">
                        <Label htmlFor="donation">Extra donatie</Label>
                        <p className="text-sm text-muted-foreground">
                            We proberen het inschrijfgeld laag te houden. Extra bijdrages helpen ons KVW toegankelijk te houden.
                        </p>
                        <select id="donation" className="border-input h-9 rounded-md border bg-transparent px-3 text-sm md:w-80" value={values.donation} onChange={(e) => setValues({ ...values, donation: e.target.value as FormValues["donation"] })}>
                            <option value="none">Geen extra donatie</option>
                            <option value="5">€5</option>
                            <option value="10">€10</option>
                            <option value="25">€25</option>
                            <option value="anders">Anders, namelijk...</option>
                        </select>
                        {values.donation === "anders" && (
                            <div className="grid gap-2 md:w-80">
                                <Label htmlFor="donationOtherAmount">Vrij in te vullen bedrag</Label>
                                <Input id="donationOtherAmount" value={values.donationOtherAmount} onChange={(e) => setValues({ ...values, donationOtherAmount: e.target.value })} />
                                <ErrorText text={errors.donationOtherAmount} />
                            </div>
                        )}
                    </section>

                    <section className="grid gap-2">
                        <Label htmlFor="notes">Bijzonderheden</Label>
                        <Textarea id="notes" rows={5} placeholder="Allergieën, dieetwensen, gedrag of tips/tricks." value={values.notes} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
                        <ErrorText text={errors.notes} />
                    </section>

                    <section className="grid gap-3 rounded-lg border border-border/60 bg-muted/30 p-4">
                        <label className="flex items-start gap-2 text-sm">
                            <input type="checkbox" checked={values.termsAccepted} onChange={(e) => setValues({ ...values, termsAccepted: e.target.checked })} />
                            Ik ga akkoord met de algemene voorwaarden van KVW HeKoS die van toepassing zijn op de inschrijving van mijn kind.
                        </label>
                        <ErrorText text={errors.termsAccepted} />
                        <label className="flex items-start gap-2 text-sm">
                            <input type="checkbox" checked={values.photoConsent} onChange={(e) => setValues({ ...values, photoConsent: e.target.checked })} />
                            Ik ga ermee akkoord dat mijn kind kan worden gefotografeerd tijdens KVW en dat die foto&apos;s voor promotionele doeleinden kunnen worden ingezet.
                        </label>
                        <ErrorText text={errors.photoConsent} />
                    </section>

                    <Button type="submit" className="w-full bg-orange-500 md:w-fit">
                        Inschrijving verzenden
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
