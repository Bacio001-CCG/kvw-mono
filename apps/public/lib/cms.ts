import { DEFAULT_CONTENT, donationToAmount, type SiteContent } from "@/lib/site-defaults";

function getBackendUrl() {
    return (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");
}

export type CmsPage = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    body: string;
};

export type CmsBlock = {
    pageSlug: string;
    blockKey: string;
    title: string;
    body: string;
};

export type CmsDocument = {
    kind: "program" | "group_assignment" | "other";
    title: string;
    description: string;
    fileUrl: string;
    opensInNewTab: boolean;
};

export type CmsSponsor = {
    name: string;
    websiteUrl: string;
    logoUrl: string;
    placement: "top" | "bottom" | "both";
};

export type PublicCms = {
    year: number;
    label: string;
    status: string;
    isTestMode: boolean;
    childOpen: boolean;
    volunteerOpen: boolean;
    childOpenAt: string;
    childCloseAt: string;
    volunteerOpenAt: string;
    volunteerCloseAt: string;
    pricePerChild: string;
    content: SiteContent;
    pages: CmsPage[];
    documents: CmsDocument[];
    sponsors: CmsSponsor[];
};

type BackendStatus = {
    cycle?: {
        year: number;
        label: string;
        status: string;
        isTestMode: boolean;
        childRegistrationsOpen: boolean;
        volunteerRegistrationsOpen: boolean;
        childRegistrationsOpenAt: string;
        childRegistrationsCloseAt: string;
        volunteerRegistrationsOpenAt: string;
        volunteerRegistrationsCloseAt: string;
        pricePerChild: string;
    };
    pages?: CmsPage[];
    blocks?: CmsBlock[];
    documents?: CmsDocument[];
    sponsors?: CmsSponsor[];
};

function blockValue(blocks: CmsBlock[], key: string) {
    return blocks.find((block) => block.blockKey === key)?.body?.trim() ?? "";
}

function pageBySlug(pages: CmsPage[], slug: string) {
    return pages.find((page) => page.slug === slug);
}

export function mapBackendStatus(data: BackendStatus): PublicCms {
    const cycle = data.cycle;
    const pages = data.pages ?? [];
    const blocks = data.blocks ?? [];
    const home = pageBySlug(pages, "home");
    const confirmChild = pageBySlug(pages, "bevestiging-kind");
    const confirmVolunteer = pageBySlug(pages, "bevestiging-vrijwilliger");

    return {
        year: cycle?.year ?? 2026,
        label: cycle?.label ?? "KVW 2026",
        status: cycle?.status ?? "draft",
        isTestMode: Boolean(cycle?.isTestMode),
        childOpen: Boolean(cycle?.childRegistrationsOpen),
        volunteerOpen: Boolean(cycle?.volunteerRegistrationsOpen),
        childOpenAt: cycle?.childRegistrationsOpenAt ?? "",
        childCloseAt: cycle?.childRegistrationsCloseAt ?? "",
        volunteerOpenAt: cycle?.volunteerRegistrationsOpenAt ?? "",
        volunteerCloseAt: cycle?.volunteerRegistrationsCloseAt ?? "",
        pricePerChild: cycle?.pricePerChild ?? "0",
        content: {
            homepageEyebrow: blockValue(blocks, "hero.eyebrow") || home?.title || "",
            homepageTitle: blockValue(blocks, "hero.title") || home?.title || "",
            homepageIntro: blockValue(blocks, "hero.intro") || home?.body || "",
            programmaUpdatedAt: blockValue(blocks, "programma.updatedAt"),
            groepenUpdatedAt: blockValue(blocks, "groepen.updatedAt"),
            confirmationChild: confirmChild?.body || "",
            confirmationVolunteer: confirmVolunteer?.body || "",
        },
        pages,
        documents: data.documents ?? [],
        sponsors: data.sponsors ?? [],
    };
}

export const EMPTY_CMS: PublicCms = {
    year: 2026,
    label: "KVW",
    status: "draft",
    isTestMode: false,
    childOpen: false,
    volunteerOpen: false,
    childOpenAt: "",
    childCloseAt: "",
    volunteerOpenAt: "",
    volunteerCloseAt: "",
    pricePerChild: "0",
    content: {
        homepageEyebrow: "",
        homepageTitle: "",
        homepageIntro: "",
        programmaUpdatedAt: "",
        groepenUpdatedAt: "",
        confirmationChild: "",
        confirmationVolunteer: "",
    },
    pages: [],
    documents: [],
    sponsors: [],
};

export const FALLBACK_CMS: PublicCms = {
    ...EMPTY_CMS,
    isTestMode: true,
    childOpen: true,
    volunteerOpen: true,
    content: DEFAULT_CONTENT,
};

export async function fetchPublicCms(): Promise<PublicCms> {
    const response = await fetch(`${getBackendUrl()}/public/status`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-store" },
    });
    if (!response.ok) {
        throw new Error(`CMS status ${response.status}`);
    }
    return mapBackendStatus((await response.json()) as BackendStatus);
}

export async function fetchPublicCmsSafe(): Promise<PublicCms> {
    try {
        return await fetchPublicCms();
    } catch {
        return EMPTY_CMS;
    }
}

export function cmsPage(cms: PublicCms, slug: string) {
    return cms.pages.find((page) => page.slug === slug);
}

export function cmsDocument(cms: PublicCms, kind: CmsDocument["kind"]) {
    return cms.documents.find((document) => document.kind === kind);
}

export function cmsSponsors(cms: PublicCms, placement: "top" | "bottom") {
    return cms.sponsors.filter((sponsor) => sponsor.placement === placement || sponsor.placement === "both");
}

export function paragraphs(text: string) {
    return text.split(/\n+/).map((item) => item.trim()).filter(Boolean);
}

export async function postToBackend(path: string, body: unknown) {
    try {
        const response = await fetch(`${getBackendUrl()}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = (await response.json().catch(() => ({}))) as { message?: string; ok?: boolean };
        return { status: response.status, data };
    } catch {
        return { status: 503, data: { message: "De server is even niet bereikbaar. Start de backend en probeer opnieuw." } };
    }
}

const schoolMap: Record<string, string> = {
    "armhoefse-akker": "armhoefse_akker",
    "panta-rhei": "panta_rhei",
    pendula: "pendula",
    anders: "other",
};

const gradeMap: Record<string, string> = {
    "groep-1": "group_1",
    "groep-2": "group_2",
    "groep-3": "group_3",
    "groep-4": "group_4",
    "groep-5": "group_5",
    "groep-6": "group_6",
    "groep-7": "group_7",
    "groep-8": "group_8",
    "middelbare-1": "first_year_secondary_school",
};

const availabilityMap: Record<string, string> = {
    alles: "all_days",
    week: "event_week_only",
    anders: "other",
};

const preferenceMap: Record<string, string> = {
    onderbouw: "lower",
    middenbouw: "middle",
    bovenbouw: "upper",
    "geen-voorkeur": "no_preference",
};

export function mapChildRegistration(payload: Record<string, unknown>) {
    return {
        childFirstName: payload.childFirstName,
        childLastName: payload.childLastName,
        streetAddress: payload.streetAndNumber,
        postalCode: payload.postalCode,
        city: payload.city,
        guardianEmail: payload.parentEmail,
        guardianPhonePrimary: payload.phone1,
        guardianPhoneSecondary: payload.phone2,
        schoolType: schoolMap[String(payload.school || "")] || payload.school,
        schoolOtherName: payload.schoolOther,
        birthDate: payload.birthDate,
        gradeLevel: gradeMap[String(payload.groupAfterSummer || "")] || payload.groupAfterSummer,
        friendRequest: payload.buddyRequest,
        swimCertificates: Array.isArray(payload.swimDiplomas) ? payload.swimDiplomas.join(", ") : "",
        hasLiabilityInsurance: payload.waInsured === "ja",
        pickupPermission: payload.goingHome === "zelfstandig" ? "may_leave_alone" : "picked_up",
        extraDonationAmount: donationToAmount(String(payload.donation || "none"), String(payload.donationOtherAmount || "")),
        notes: payload.notes,
        termsAccepted: Boolean(payload.termsAccepted),
        photoConsentAccepted: Boolean(payload.photoConsent),
    };
}

export function mapVolunteerRegistration(payload: Record<string, unknown>) {
    return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phone,
        streetAddress: payload.streetAndNumber,
        postalCode: payload.postalCode,
        city: payload.city,
        emergencyContactPhone: payload.emergencyPhone,
        emergencyContactRelation: payload.emergencyRelation,
        birthDate: payload.birthDate,
        hasBhvCertificate: payload.hasBhv === "ja",
        availability: availabilityMap[String(payload.availability || "")] || payload.availability,
        availabilityOther: payload.availabilityOther,
        ageGroupPreference: preferenceMap[String(payload.groupPreference || "")] || payload.groupPreference,
        notes: payload.notes,
    };
}
