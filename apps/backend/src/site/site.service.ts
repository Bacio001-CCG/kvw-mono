import { Injectable, OnModuleInit } from "@nestjs/common";
import {
    childRegistrationChildren,
    childRegistrations,
    contactMessages,
    contentBlocks,
    contentPages,
    registrationCycles,
    siteDocuments,
    sponsors,
    volunteerRegistrations,
} from "@repo/database";
import { and, count, desc, eq } from "drizzle-orm";

import { DrizzleService } from "../database/drizzle.service";
import {
    mapAvailability,
    mapEmergencyRelation,
    mapGradeLevel,
    mapPickupPermission,
    mapPreference,
    mapSchoolType,
    mapSwim,
    parseTimestamp,
    toDateInput,
    toIso,
} from "./mappers";
import { DEFAULT_BLOCKS, DEFAULT_PAGES, DEFAULT_SPONSORS } from "./site.seed";
import type {
    ChildRegistration,
    ContactMessage,
    ContentBlock,
    ContentPage,
    RegistrationCycle,
    SiteDocument,
    Sponsor,
    VolunteerRegistration,
} from "./site.types";

@Injectable()
export class SiteService implements OnModuleInit {
    constructor(private readonly drizzle: DrizzleService) {}

    private get db() {
        return this.drizzle.db;
    }

    async onModuleInit() {
        await this.seed();
    }

    private mapCycle(row: typeof registrationCycles.$inferSelect): RegistrationCycle {
        return {
            id: row.id,
            year: row.year,
            label: row.label,
            status: row.status,
            isTestMode: row.isTestMode,
            childRegistrationsOpen: row.childRegistrationsOpen,
            volunteerRegistrationsOpen: row.volunteerRegistrationsOpen,
            childRegistrationsOpenAt: toDateInput(row.childRegistrationsOpenAt),
            childRegistrationsCloseAt: toDateInput(row.childRegistrationsCloseAt),
            volunteerRegistrationsOpenAt: toDateInput(row.volunteerRegistrationsOpenAt),
            volunteerRegistrationsCloseAt: toDateInput(row.volunteerRegistrationsCloseAt),
            pricePerChild: String(row.pricePerChild ?? "0"),
            createdAt: toIso(row.createdAt),
            updatedAt: toIso(row.updatedAt),
        };
    }

    private mapPage(row: typeof contentPages.$inferSelect): ContentPage {
        return {
            id: row.id,
            slug: row.slug,
            title: row.title,
            summary: row.summary ?? "",
            body: row.body,
            isPublished: row.isPublished,
            updatedAt: toIso(row.updatedAt),
        };
    }

    private mapBlock(row: typeof contentBlocks.$inferSelect): ContentBlock {
        return {
            id: row.id,
            pageSlug: row.pageSlug,
            blockKey: row.blockKey,
            title: row.title ?? "",
            body: row.body ?? "",
            sortOrder: row.sortOrder,
            isActive: row.isActive,
            updatedAt: toIso(row.updatedAt),
        };
    }

    private mapDocument(row: typeof siteDocuments.$inferSelect): SiteDocument {
        return {
            id: row.id,
            cycleId: row.cycleId,
            kind: row.kind,
            title: row.title,
            description: row.description ?? "",
            fileUrl: row.fileUrl,
            opensInNewTab: row.opensInNewTab,
            isActive: row.isActive,
            updatedAt: toIso(row.updatedAt),
        };
    }

    private mapSponsor(row: typeof sponsors.$inferSelect): Sponsor {
        return {
            id: row.id,
            name: row.name,
            websiteUrl: row.websiteUrl ?? "",
            logoUrl: row.logoUrl,
            placement: row.placement,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
        };
    }

    async currentCycle() {
        const cycles = await this.listCycles();
        return cycles[0] ?? null;
    }

    async publicCycle() {
        const cycles = await this.listCycles();
        return (
            cycles.find((cycle) => cycle.status === "open") ||
            cycles.find((cycle) => cycle.childRegistrationsOpen || cycle.volunteerRegistrationsOpen) ||
            cycles[0] ||
            null
        );
    }

    async cycleById(id: string) {
        const [row] = await this.db.select().from(registrationCycles).where(eq(registrationCycles.id, id)).limit(1);
        return row ? this.mapCycle(row) : null;
    }

    async listCycles() {
        const rows = await this.db.select().from(registrationCycles).orderBy(desc(registrationCycles.year));
        return rows.map((row) => this.mapCycle(row));
    }

    async createCycle(year: number, label?: string) {
        const existing = await this.db.select({ id: registrationCycles.id }).from(registrationCycles).where(eq(registrationCycles.year, year)).limit(1);
        if (existing.length) {
            throw new Error(`Er bestaat al een formulier voor ${year}.`);
        }

        const [row] = await this.db
            .insert(registrationCycles)
            .values({
                year,
                label: label?.trim() || `KVW ${year}`,
                status: "draft",
                isTestMode: true,
                childRegistrationsOpen: false,
                volunteerRegistrationsOpen: false,
                childRegistrationsOpenAt: new Date(`${year}-05-15T12:00:00.000Z`),
                childRegistrationsCloseAt: new Date(`${year}-06-15T12:00:00.000Z`),
                volunteerRegistrationsOpenAt: new Date(`${year}-05-15T12:00:00.000Z`),
                volunteerRegistrationsCloseAt: new Date(`${year}-06-15T12:00:00.000Z`),
                pricePerChild: "38.00",
            })
            .returning();

        if (!row) {
            throw new Error("Kon geen nieuw jaar maken.");
        }

        return this.mapCycle(row);
    }

    async updateCycle(id: string, body: Partial<RegistrationCycle>) {
        const current = await this.cycleById(id);
        if (!current) return null;

        const childOpen = body.childRegistrationsOpen ?? current.childRegistrationsOpen;
        const volunteerOpen = body.volunteerRegistrationsOpen ?? current.volunteerRegistrationsOpen;
        let status = body.status ?? current.status;
        if (childOpen || volunteerOpen) {
            status = "open";
        } else if (status === "open") {
            status = "closed";
        }

        const [row] = await this.db
            .update(registrationCycles)
            .set({
                label: body.label ?? current.label,
                status,
                isTestMode: body.isTestMode ?? current.isTestMode,
                childRegistrationsOpen: childOpen,
                volunteerRegistrationsOpen: volunteerOpen,
                childRegistrationsOpenAt: parseTimestamp(body.childRegistrationsOpenAt ?? current.childRegistrationsOpenAt),
                childRegistrationsCloseAt: parseTimestamp(body.childRegistrationsCloseAt ?? current.childRegistrationsCloseAt),
                volunteerRegistrationsOpenAt: parseTimestamp(body.volunteerRegistrationsOpenAt ?? current.volunteerRegistrationsOpenAt),
                volunteerRegistrationsCloseAt: parseTimestamp(body.volunteerRegistrationsCloseAt ?? current.volunteerRegistrationsCloseAt),
                pricePerChild: body.pricePerChild ?? current.pricePerChild,
                updatedAt: new Date(),
            })
            .where(eq(registrationCycles.id, id))
            .returning();

        return row ? this.mapCycle(row) : null;
    }

    async publishedPages() {
        const rows = await this.db.select().from(contentPages).where(eq(contentPages.isPublished, true));
        return rows.map((row) => this.mapPage(row));
    }

    async listPages() {
        const rows = await this.db.select().from(contentPages);
        return rows.map((row) => this.mapPage(row));
    }

    async updatePage(id: string, body: Partial<ContentPage>) {
        const [row] = await this.db
            .update(contentPages)
            .set({
                ...(typeof body.title === "string" ? { title: body.title } : {}),
                ...(typeof body.summary === "string" ? { summary: body.summary } : {}),
                ...(typeof body.body === "string" ? { body: body.body } : {}),
                ...(typeof body.isPublished === "boolean" ? { isPublished: body.isPublished } : {}),
                updatedAt: new Date(),
            })
            .where(eq(contentPages.id, id))
            .returning();
        return row ? this.mapPage(row) : null;
    }

    async activeBlocks() {
        const rows = await this.db.select().from(contentBlocks).where(eq(contentBlocks.isActive, true));
        return rows.map((row) => this.mapBlock(row));
    }

    async listBlocks() {
        const rows = await this.db.select().from(contentBlocks);
        return rows.map((row) => this.mapBlock(row));
    }

    async updateBlock(id: string, body: Partial<ContentBlock>) {
        const [row] = await this.db
            .update(contentBlocks)
            .set({
                ...(typeof body.title === "string" ? { title: body.title } : {}),
                ...(typeof body.body === "string" ? { body: body.body } : {}),
                ...(typeof body.isActive === "boolean" ? { isActive: body.isActive } : {}),
                updatedAt: new Date(),
            })
            .where(eq(contentBlocks.id, id))
            .returning();
        return row ? this.mapBlock(row) : null;
    }

    async activeDocuments() {
        const rows = await this.db.select().from(siteDocuments).where(eq(siteDocuments.isActive, true));
        return rows.map((row) => this.mapDocument(row));
    }

    async listDocuments() {
        const rows = await this.db.select().from(siteDocuments);
        return rows.map((row) => this.mapDocument(row));
    }

    async updateDocument(id: string, body: Partial<SiteDocument>) {
        const [row] = await this.db
            .update(siteDocuments)
            .set({
                ...(typeof body.title === "string" ? { title: body.title } : {}),
                ...(typeof body.description === "string" ? { description: body.description } : {}),
                ...(typeof body.fileUrl === "string" ? { fileUrl: body.fileUrl } : {}),
                ...(typeof body.isActive === "boolean" ? { isActive: body.isActive } : {}),
                ...(typeof body.opensInNewTab === "boolean" ? { opensInNewTab: body.opensInNewTab } : {}),
                updatedAt: new Date(),
            })
            .where(eq(siteDocuments.id, id))
            .returning();
        return row ? this.mapDocument(row) : null;
    }

    async activeSponsors() {
        const rows = await this.db.select().from(sponsors).where(eq(sponsors.isActive, true));
        return rows.map((row) => this.mapSponsor(row));
    }

    async listSponsors() {
        const rows = await this.db.select().from(sponsors);
        return rows.map((row) => this.mapSponsor(row));
    }

    async createSponsor(body: Partial<Sponsor>) {
        const [{ value: total }] = await this.db.select({ value: count() }).from(sponsors);
        const [row] = await this.db
            .insert(sponsors)
            .values({
                name: body.name?.trim() || "Nieuwe sponsor",
                websiteUrl: body.websiteUrl?.trim() || "",
                logoUrl: body.logoUrl?.trim() || "/cbwd.webp",
                placement: body.placement || "both",
                sortOrder: Number(total) + 1,
                isActive: true,
            })
            .returning();
        if (!row) {
            throw new Error("Kon geen sponsor opslaan.");
        }
        return this.mapSponsor(row);
    }

    async updateSponsor(id: string, body: Partial<Sponsor>) {
        const [row] = await this.db
            .update(sponsors)
            .set({
                ...(typeof body.name === "string" ? { name: body.name } : {}),
                ...(typeof body.websiteUrl === "string" ? { websiteUrl: body.websiteUrl } : {}),
                ...(typeof body.logoUrl === "string" ? { logoUrl: body.logoUrl } : {}),
                ...(body.placement ? { placement: body.placement } : {}),
                ...(typeof body.isActive === "boolean" ? { isActive: body.isActive } : {}),
                updatedAt: new Date(),
            })
            .where(eq(sponsors.id, id))
            .returning();
        return row ? this.mapSponsor(row) : null;
    }

    async listChildren(cycleId?: string) {
        const cycle = cycleId ? await this.cycleById(cycleId) : await this.currentCycle();
        if (!cycle) return [];

        const rows = await this.db
            .select()
            .from(childRegistrations)
            .leftJoin(childRegistrationChildren, eq(childRegistrationChildren.registrationId, childRegistrations.id))
            .where(eq(childRegistrations.cycleId, cycle.id));

        return rows.map((row) => this.mapChild(row.child_registrations, row.child_registration_children, cycle.isTestMode));
    }

    async listVolunteers(cycleId?: string) {
        const cycle = cycleId ? await this.cycleById(cycleId) : await this.currentCycle();
        if (!cycle) return [];

        const rows = await this.db.select().from(volunteerRegistrations).where(eq(volunteerRegistrations.cycleId, cycle.id));
        return rows.map((row) => this.mapVolunteer(row, cycle.isTestMode));
    }

    async confirmChildPayment(id: string) {
        const cycle = await this.currentCycle();
        if (!cycle?.isTestMode) {
            return { error: "Simulatie mag alleen in de testomgeving." as const };
        }

        const [row] = await this.db
            .update(childRegistrations)
            .set({ status: "confirmed", updatedAt: new Date() })
            .where(and(eq(childRegistrations.id, id), eq(childRegistrations.cycleId, cycle.id)))
            .returning();

        if (!row) return { error: "Inschrijving niet gevonden." as const };
        const [child] = await this.listChildren(cycle.id).then((items) => items.filter((item) => item.id === id));
        return { registration: child };
    }

    async createChildRegistration(body: Partial<ChildRegistration>) {
        const cycle = await this.publicCycle();
        if (!cycle?.childRegistrationsOpen) {
            return { error: "closed" as const };
        }

        const swim = mapSwim(body.swimCertificates);
        const birthDate = toDateInput(body.birthDate) || toDateInput(new Date());

        const record = await this.db.transaction(async (tx) => {
            const [registration] = await tx
                .insert(childRegistrations)
                .values({
                    cycleId: cycle.id,
                    status: cycle.isTestMode ? "payment_pending" : "submitted",
                    guardianEmail: (body.guardianEmail || "").trim(),
                    guardianPhonePrimary: (body.guardianPhonePrimary || "").trim(),
                    guardianPhoneSecondary: (body.guardianPhoneSecondary || "").trim() || null,
                    streetAddress: (body.streetAddress || "").trim(),
                    postalCode: (body.postalCode || "").trim(),
                    city: (body.city || "").trim(),
                    extraDonationAmount: body.extraDonationAmount || "0",
                    termsAccepted: Boolean(body.termsAccepted),
                    photoConsentAccepted: Boolean(body.photoConsentAccepted),
                    submittedAt: new Date(),
                })
                .returning();

            if (!registration) {
                throw new Error("Kon kindinschrijving niet opslaan.");
            }

            await tx.insert(childRegistrationChildren).values({
                registrationId: registration.id,
                firstName: (body.childFirstName || "").trim(),
                lastName: (body.childLastName || "").trim(),
                birthDate,
                schoolType: mapSchoolType(body.schoolType),
                schoolOtherName: body.schoolOtherName || null,
                gradeLevel: mapGradeLevel(body.gradeLevel),
                friendRequest: body.friendRequest || null,
                swimCertificateLevel: swim.level,
                swimCertificates: swim.raw || null,
                hasLiabilityInsurance: Boolean(body.hasLiabilityInsurance),
                pickupPermission: mapPickupPermission(body.pickupPermission),
                notes: body.notes || null,
            });

            return registration;
        });

        return { id: record.id, testMode: cycle.isTestMode };
    }

    async createVolunteerRegistration(body: Partial<VolunteerRegistration>) {
        const cycle = await this.publicCycle();
        if (!cycle?.volunteerRegistrationsOpen) {
            return { error: "closed" as const };
        }

        const relation = mapEmergencyRelation(body.emergencyContactRelation);
        const [row] = await this.db
            .insert(volunteerRegistrations)
            .values({
                cycleId: cycle.id,
                status: "submitted",
                firstName: (body.firstName || "").trim(),
                lastName: (body.lastName || "").trim(),
                email: (body.email || "").trim(),
                phoneNumber: (body.phoneNumber || "").trim(),
                streetAddress: (body.streetAddress || "").trim(),
                postalCode: (body.postalCode || "").trim(),
                city: (body.city || "").trim(),
                emergencyContactName: (body.emergencyContactName || body.emergencyContactRelation || "Noodcontact").trim(),
                emergencyContactPhone: (body.emergencyContactPhone || "").trim(),
                emergencyContactRelation: relation,
                birthDate: toDateInput(body.birthDate) || toDateInput(new Date()),
                hasBhvCertificate: Boolean(body.hasBhvCertificate),
                availability: mapAvailability(body.availability, body.availabilityOther),
                availabilityOther: body.availabilityOther || null,
                ageGroupPreference: mapPreference(body.ageGroupPreference),
                notes: body.notes || null,
            })
            .returning();

        if (!row) {
            throw new Error("Kon vrijwilligersinschrijving niet opslaan.");
        }

        return { id: row.id };
    }

    async listContacts() {
        const rows = await this.db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
        return rows.map((row) => this.mapContact(row));
    }

    async createContact(body: Partial<ContactMessage>) {
        const [row] = await this.db
            .insert(contactMessages)
            .values({
                fullName: (body.fullName || "").trim(),
                email: (body.email || "").trim(),
                subject: (body.subject || "Contactformulier").trim(),
                message: (body.message || "").trim(),
            })
            .returning();
        if (!row) {
            throw new Error("Kon bericht niet opslaan.");
        }
        return this.mapContact(row);
    }

    async updateContact(id: string, body: { isRead?: boolean }) {
        const [row] = await this.db
            .update(contactMessages)
            .set({
                ...(typeof body.isRead === "boolean" ? { isRead: body.isRead } : {}),
                updatedAt: new Date(),
            })
            .where(eq(contactMessages.id, id))
            .returning();
        return row ? this.mapContact(row) : null;
    }

    private mapChild(
        registration: typeof childRegistrations.$inferSelect,
        child: typeof childRegistrationChildren.$inferSelect | null,
        isTest: boolean,
    ): ChildRegistration {
        return {
            id: registration.id,
            cycleId: registration.cycleId,
            status: registration.status,
            guardianEmail: registration.guardianEmail,
            guardianPhonePrimary: registration.guardianPhonePrimary,
            guardianPhoneSecondary: registration.guardianPhoneSecondary ?? "",
            streetAddress: registration.streetAddress,
            postalCode: registration.postalCode,
            city: registration.city,
            extraDonationAmount: String(registration.extraDonationAmount ?? "0"),
            termsAccepted: registration.termsAccepted,
            photoConsentAccepted: registration.photoConsentAccepted,
            submittedAt: toIso(registration.submittedAt),
            childFirstName: child?.firstName ?? "",
            childLastName: child?.lastName ?? "",
            birthDate: child?.birthDate ?? "",
            schoolType: child?.schoolType ?? "",
            schoolOtherName: child?.schoolOtherName ?? "",
            gradeLevel: child?.gradeLevel ?? "",
            friendRequest: child?.friendRequest ?? "",
            swimCertificates: child?.swimCertificates || child?.swimCertificateLevel || "",
            hasLiabilityInsurance: child?.hasLiabilityInsurance ?? false,
            pickupPermission: child?.pickupPermission ?? "picked_up",
            notes: child?.notes ?? "",
            isTest,
        };
    }

    private mapVolunteer(row: typeof volunteerRegistrations.$inferSelect, isTest: boolean): VolunteerRegistration {
        return {
            id: row.id,
            cycleId: row.cycleId,
            status: row.status,
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            phoneNumber: row.phoneNumber,
            streetAddress: row.streetAddress,
            postalCode: row.postalCode,
            city: row.city,
            emergencyContactName: row.emergencyContactName,
            emergencyContactPhone: row.emergencyContactPhone,
            emergencyContactRelation: row.emergencyContactRelation,
            birthDate: row.birthDate,
            hasBhvCertificate: row.hasBhvCertificate,
            availability: row.availability,
            availabilityOther: row.availabilityOther ?? "",
            ageGroupPreference: row.ageGroupPreference,
            notes: row.notes ?? "",
            isTest,
            submittedAt: toIso(row.createdAt),
        };
    }

    private mapContact(row: typeof contactMessages.$inferSelect): ContactMessage {
        return {
            id: row.id,
            fullName: row.fullName,
            email: row.email,
            subject: row.subject,
            message: row.message,
            isRead: row.isRead,
            createdAt: toIso(row.createdAt),
        };
    }

    private async seed() {
        const [cycleCount] = await this.db.select({ value: count() }).from(registrationCycles);
        if (Number(cycleCount.value) === 0) {
            await this.db.insert(registrationCycles).values({
                year: 2026,
                label: "KVW 2026",
                status: "open",
                isTestMode: true,
                childRegistrationsOpen: true,
                volunteerRegistrationsOpen: true,
                childRegistrationsOpenAt: new Date("2026-05-15T12:00:00.000Z"),
                childRegistrationsCloseAt: new Date("2026-06-15T12:00:00.000Z"),
                volunteerRegistrationsOpenAt: new Date("2026-05-15T12:00:00.000Z"),
                volunteerRegistrationsCloseAt: new Date("2026-06-15T12:00:00.000Z"),
                pricePerChild: "38.00",
            });
        }

        const existingPages = await this.db.select({ slug: contentPages.slug }).from(contentPages);
        const pageSlugs = new Set(existingPages.map((page) => page.slug));
        const missingPages = DEFAULT_PAGES.filter((page) => !pageSlugs.has(page.slug));
        if (missingPages.length) {
            await this.db.insert(contentPages).values(missingPages);
        }

        const existingBlocks = await this.db.select({ pageSlug: contentBlocks.pageSlug, blockKey: contentBlocks.blockKey }).from(contentBlocks);
        const blockKeys = new Set(existingBlocks.map((block) => `${block.pageSlug}:${block.blockKey}`));
        const missingBlocks = DEFAULT_BLOCKS.filter((block) => !blockKeys.has(`${block.pageSlug}:${block.blockKey}`));
        if (missingBlocks.length) {
            await this.db.insert(contentBlocks).values(missingBlocks);
        }

        const [documentCount] = await this.db.select({ value: count() }).from(siteDocuments);
        if (Number(documentCount.value) === 0) {
            const cycle = await this.currentCycle();
            await this.db.insert(siteDocuments).values([
                {
                    cycleId: cycle?.id ?? null,
                    kind: "program",
                    title: "Programma",
                    description: "Het KVW-programma van dit jaar",
                    fileUrl: "/programma.pdf",
                    opensInNewTab: true,
                    isActive: true,
                },
                {
                    cycleId: cycle?.id ?? null,
                    kind: "group_assignment",
                    title: "Groepsindeling",
                    description: "De groepenlijst van dit jaar",
                    fileUrl: "/groepen.pdf",
                    opensInNewTab: true,
                    isActive: true,
                },
            ]);
        }

        const [sponsorCount] = await this.db.select({ value: count() }).from(sponsors);
        if (Number(sponsorCount.value) === 0) {
            await this.db.insert(sponsors).values(DEFAULT_SPONSORS);
        }
    }
}
