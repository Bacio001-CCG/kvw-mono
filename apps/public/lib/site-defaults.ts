export type CycleStatus = "draft" | "open" | "closed" | "archived";

export type SiteContent = {
    homepageEyebrow: string;
    homepageTitle: string;
    homepageIntro: string;
    programmaUpdatedAt: string;
    groepenUpdatedAt: string;
    confirmationChild: string;
    confirmationVolunteer: string;
};

export type RegistrationCycle = {
    year: number;
    label: string;
    status: CycleStatus;
    isTestMode: boolean;
    childRegistrationsOpen: boolean;
    volunteerRegistrationsOpen: boolean;
    childRegistrationsOpenAt: string;
    childRegistrationsCloseAt: string;
};

export type ChildRegistrationRecord = {
    id: string;
    createdAt: string;
    year: number;
    isTest: boolean;
    childFirstName: string;
    childLastName: string;
    streetAndNumber: string;
    postalCode: string;
    city: string;
    parentEmail: string;
    phone1: string;
    phone2: string;
    school: string;
    schoolOther: string;
    birthDate: string;
    groupAfterSummer: string;
    buddyRequest: string;
    swimDiplomas: string[];
    waInsured: string;
    goingHome: string;
    donation: string;
    donationOtherAmount: string;
    extraDonationAmount: string;
    notes: string;
    termsAccepted: boolean;
    photoConsent: boolean;
};

export type VolunteerRegistrationRecord = {
    id: string;
    createdAt: string;
    year: number;
    isTest: boolean;
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
    hasBhv: string;
    availability: string;
    availabilityOther: string;
    groupPreference: string;
    notes: string;
};

export type ContactMessageRecord = {
    id: string;
    createdAt: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
};

export type SiteStore = {
    cycle: RegistrationCycle;
    content: SiteContent;
    children: ChildRegistrationRecord[];
    volunteers: VolunteerRegistrationRecord[];
    contacts: ContactMessageRecord[];
    archives: Array<{
        year: number;
        archivedAt: string;
        children: ChildRegistrationRecord[];
        volunteers: VolunteerRegistrationRecord[];
    }>;
};

export const DEFAULT_CONTENT: SiteContent = {
    homepageEyebrow: "welkom bij HeKoS Kindervakantiewerk",
    homepageTitle: "De leukste vakantie activiteit voor kinderen!",
    homepageIntro:
        "Al ruim 55 jaar organiseert HeKoS Kindervakantiewerk elk jaar een leuke week vol activiteiten voor kinderen van de basisschool! Jaarlijks 5 dagen vol plezier in de laatste week van de zomervakantie.",
    programmaUpdatedAt: "1 juni 2026",
    groepenUpdatedAt: "1 juni 2026",
    confirmationChild:
        "Bedankt voor de inschrijving(en) van uw kind(eren). Op naar weer een prachtige editie van KVW! Binnenkort ontvangt u meer informatie van ons over KVW zoals het programma. We nemen hierover contact met u op per mail. Heeft u voor nu dringende vragen, neem dan contact met ons op via info@kvwhekos.nl.",
    confirmationVolunteer:
        "Bedankt voor je aanmelding als vrijwilliger. We nemen zo snel mogelijk contact met je op per mail. Voor dringende vragen kun je terecht via info@kvwhekos.nl.",
};

export const DEFAULT_CYCLE: RegistrationCycle = {
    year: 2026,
    label: "KVW 2026",
    status: "open",
    isTestMode: true,
    childRegistrationsOpen: true,
    volunteerRegistrationsOpen: true,
    childRegistrationsOpenAt: "2026-05-15",
    childRegistrationsCloseAt: "2026-06-15",
};

export function createDefaultStore(): SiteStore {
    return {
        cycle: { ...DEFAULT_CYCLE },
        content: { ...DEFAULT_CONTENT },
        children: [],
        volunteers: [],
        contacts: [],
        archives: [],
    };
}

export function donationToAmount(donation: string, otherAmount: string) {
    if (donation === "none") return "0";
    if (donation === "anders") {
        const cleaned = otherAmount.replace(",", ".").replace(/[^\d.]/g, "");
        return cleaned || "0";
    }
    return donation;
}
