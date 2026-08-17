export type CycleStatus = "draft" | "open" | "closed" | "archived";
export type SubmissionStatus = "draft" | "submitted" | "payment_pending" | "confirmed" | "cancelled";

export type RegistrationCycle = {
    id: string;
    year: number;
    label: string;
    status: CycleStatus;
    isTestMode: boolean;
    childRegistrationsOpen: boolean;
    volunteerRegistrationsOpen: boolean;
    childRegistrationsOpenAt: string;
    childRegistrationsCloseAt: string;
    volunteerRegistrationsOpenAt: string;
    volunteerRegistrationsCloseAt: string;
    pricePerChild: string;
    createdAt: string;
    updatedAt: string;
};

export type ContentPage = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    body: string;
    isPublished: boolean;
    updatedAt: string;
};

export type ContentBlock = {
    id: string;
    pageSlug: string;
    blockKey: string;
    title: string;
    body: string;
    sortOrder: number;
    isActive: boolean;
    updatedAt: string;
};

export type SiteDocument = {
    id: string;
    cycleId: string | null;
    kind: "program" | "group_assignment" | "other";
    title: string;
    description: string;
    fileUrl: string;
    opensInNewTab: boolean;
    isActive: boolean;
    updatedAt: string;
};

export type Sponsor = {
    id: string;
    name: string;
    websiteUrl: string;
    logoUrl: string;
    placement: "top" | "bottom" | "both";
    sortOrder: number;
    isActive: boolean;
};

export type ChildRegistration = {
    id: string;
    cycleId: string;
    status: SubmissionStatus;
    guardianEmail: string;
    guardianPhonePrimary: string;
    guardianPhoneSecondary: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    extraDonationAmount: string;
    termsAccepted: boolean;
    photoConsentAccepted: boolean;
    submittedAt: string;
    childFirstName: string;
    childLastName: string;
    birthDate: string;
    schoolType: string;
    schoolOtherName: string;
    gradeLevel: string;
    friendRequest: string;
    swimCertificates: string;
    hasLiabilityInsurance: boolean;
    pickupPermission: string;
    notes: string;
    isTest: boolean;
};

export type VolunteerRegistration = {
    id: string;
    cycleId: string;
    status: SubmissionStatus;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    birthDate: string;
    hasBhvCertificate: boolean;
    availability: string;
    availabilityOther: string;
    ageGroupPreference: string;
    notes: string;
    isTest: boolean;
    submittedAt: string;
};

export type ContactMessage = {
    id: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};
