import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";

import { PermissionGuard } from "./auth/permission.guard";
import { RequirePermission } from "./auth/require-permission.decorator";
import { toCsv } from "./csv";
import { SiteService } from "./site/site.service";
import type { ContentBlock, ContentPage, RegistrationCycle, SiteDocument, Sponsor } from "./site/site.types";

@Controller("admin")
@UseGuards(PermissionGuard)
export class AdminController {
    constructor(private readonly site: SiteService) {}

    @Get("overview")
    @RequirePermission("overview")
    async overview() {
        const cycle = await this.site.publicCycle();
        const [cycles, children, volunteers, contacts] = await Promise.all([
            this.site.listCycles(),
            this.site.listChildren(cycle?.id),
            this.site.listVolunteers(cycle?.id),
            this.site.listContacts(),
        ]);

        return {
            cycle,
            cycles,
            counts: {
                children: children.length,
                volunteers: volunteers.length,
                contactsUnread: contacts.filter((item) => !item.isRead).length,
                contacts: contacts.length,
            },
        };
    }

    @Get("cycles")
    @RequirePermission("registrations")
    cycles() {
        return this.site.listCycles();
    }

    @Post("cycles")
    @RequirePermission("registrations")
    async createCycle(@Body() body: { year?: number; label?: string }) {
        const year = Number(body.year);
        if (!year || year < 2020) {
            throw new BadRequestException("Vul een geldig jaar in.");
        }
        try {
            return await this.site.createCycle(year, body.label);
        } catch (error) {
            throw new BadRequestException(error instanceof Error ? error.message : "Kon geen nieuw jaar maken.");
        }
    }

    @Patch("cycles/:id")
    @RequirePermission("registrations")
    async updateCycle(@Param("id") id: string, @Body() body: Partial<RegistrationCycle>) {
        const cycle = await this.site.updateCycle(id, body);
        if (!cycle) return { message: "Jaar niet gevonden." };
        return cycle;
    }

    @Get("children")
    @RequirePermission("children")
    children(@Query("cycleId") cycleId?: string) {
        return this.site.listChildren(cycleId);
    }

    @Get("volunteers")
    @RequirePermission("volunteers")
    volunteers(@Query("cycleId") cycleId?: string) {
        return this.site.listVolunteers(cycleId);
    }

    @Get("children/export")
    @RequirePermission("children")
    async exportChildren(@Query("cycleId") cycleId: string | undefined, @Res() response: Response) {
        const rows = (await this.site.listChildren(cycleId)).map((item) => ({
            voornaam: item.childFirstName,
            achternaam: item.childLastName,
            geboortedatum: item.birthDate,
            school: item.schoolType,
            school_anders: item.schoolOtherName,
            groep: item.gradeLevel,
            groepsmaatje: item.friendRequest,
            zwemdiplomas: item.swimCertificates,
            wa_verzekerd: item.hasLiabilityInsurance ? "ja" : "nee",
            naar_huis: item.pickupPermission,
            email: item.guardianEmail,
            telefoon_1: item.guardianPhonePrimary,
            telefoon_2: item.guardianPhoneSecondary,
            adres: item.streetAddress,
            postcode: item.postalCode,
            stad: item.city,
            extra_donatie: item.extraDonationAmount,
            bijzonderheden: item.notes,
            status: item.status,
            test: item.isTest ? "ja" : "nee",
            ingeschreven_op: item.submittedAt,
        }));
        const csv = toCsv(rows);
        response.setHeader("Content-Type", "text/csv; charset=utf-8");
        response.setHeader("Content-Disposition", 'attachment; filename="kvw-kinderen.csv"');
        response.send(csv);
    }

    @Get("volunteers/export")
    @RequirePermission("volunteers")
    async exportVolunteers(@Query("cycleId") cycleId: string | undefined, @Res() response: Response) {
        const rows = (await this.site.listVolunteers(cycleId)).map((item) => ({
            voornaam: item.firstName,
            achternaam: item.lastName,
            email: item.email,
            telefoon: item.phoneNumber,
            adres: item.streetAddress,
            postcode: item.postalCode,
            stad: item.city,
            nood_telefoon: item.emergencyContactPhone,
            nood_relatie: item.emergencyContactRelation,
            geboortedatum: item.birthDate,
            bhv: item.hasBhvCertificate ? "ja" : "nee",
            beschikbaarheid: item.availability,
            beschikbaarheid_anders: item.availabilityOther,
            voorkeur: item.ageGroupPreference,
            bijzonderheden: item.notes,
            status: item.status,
            test: item.isTest ? "ja" : "nee",
            ingeschreven_op: item.submittedAt,
        }));
        const csv = toCsv(rows);
        response.setHeader("Content-Type", "text/csv; charset=utf-8");
        response.setHeader("Content-Disposition", 'attachment; filename="kvw-vrijwilligers.csv"');
        response.send(csv);
    }

    @Patch("children/:id/payment")
    @RequirePermission("children")
    async simulatePayment(@Param("id") id: string) {
        const result = await this.site.confirmChildPayment(id);
        if ("error" in result && result.error) return { message: result.error };
        return result.registration;
    }

    @Get("pages")
    @RequirePermission("content")
    pages() {
        return this.site.listPages();
    }

    @Patch("pages/:id")
    @RequirePermission("content")
    async updatePage(@Param("id") id: string, @Body() body: Partial<ContentPage>) {
        const page = await this.site.updatePage(id, body);
        if (!page) return { message: "Pagina niet gevonden." };
        return page;
    }

    @Get("blocks")
    @RequirePermission("content")
    blocks() {
        return this.site.listBlocks();
    }

    @Patch("blocks/:id")
    @RequirePermission("content")
    async updateBlock(@Param("id") id: string, @Body() body: Partial<ContentBlock>) {
        const block = await this.site.updateBlock(id, body);
        if (!block) return { message: "Tekstblok niet gevonden." };
        return block;
    }

    @Get("documents")
    @RequirePermission("documents")
    documents() {
        return this.site.listDocuments();
    }

    @Patch("documents/:id")
    @RequirePermission("documents")
    async updateDocument(@Param("id") id: string, @Body() body: Partial<SiteDocument>) {
        const document = await this.site.updateDocument(id, body);
        if (!document) return { message: "Document niet gevonden." };
        return document;
    }

    @Get("sponsors")
    @RequirePermission("sponsors")
    sponsors() {
        return this.site.listSponsors();
    }

    @Post("sponsors")
    @RequirePermission("sponsors")
    createSponsor(@Body() body: Partial<Sponsor>) {
        return this.site.createSponsor(body);
    }

    @Patch("sponsors/:id")
    @RequirePermission("sponsors")
    async updateSponsor(@Param("id") id: string, @Body() body: Partial<Sponsor>) {
        const sponsor = await this.site.updateSponsor(id, body);
        if (!sponsor) return { message: "Sponsor niet gevonden." };
        return sponsor;
    }

    @Get("contacts")
    @RequirePermission("contact")
    contacts() {
        return this.site.listContacts();
    }

    @Patch("contacts/:id")
    @RequirePermission("contact")
    async updateContact(@Param("id") id: string, @Body() body: { isRead?: boolean }) {
        const contact = await this.site.updateContact(id, body);
        if (!contact) return { message: "Bericht niet gevonden." };
        return contact;
    }
}
