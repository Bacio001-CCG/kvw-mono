import { Body, Controller, ForbiddenException, Get, Post } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

import { SiteService } from "./site/site.service";
import type { ChildRegistration, ContactMessage, VolunteerRegistration } from "./site/site.types";

@Controller("public")
@AllowAnonymous()
export class PublicController {
    constructor(private readonly site: SiteService) {}

    @Get("status")
    async status() {
        const [cycle, pages, blocks, documents, sponsors] = await Promise.all([
            this.site.publicCycle(),
            this.site.publishedPages(),
            this.site.activeBlocks(),
            this.site.activeDocuments(),
            this.site.activeSponsors(),
        ]);

        return { cycle, pages, blocks, documents, sponsors };
    }

    @Post("registrations/child")
    async child(@Body() body: Partial<ChildRegistration>) {
        const result = await this.site.createChildRegistration(body);
        if ("error" in result && result.error === "closed") {
            throw new ForbiddenException("De kindinschrijvingen zijn momenteel gesloten.");
        }
        return { ok: true, id: result.id, testMode: result.testMode };
    }

    @Post("registrations/volunteer")
    async volunteer(@Body() body: Partial<VolunteerRegistration>) {
        const result = await this.site.createVolunteerRegistration(body);
        if ("error" in result && result.error === "closed") {
            throw new ForbiddenException("De vrijwilligersinschrijvingen zijn momenteel gesloten.");
        }
        return { ok: true, id: result.id };
    }

    @Post("contact")
    async contact(@Body() body: Partial<ContactMessage>) {
        await this.site.createContact(body);
        return { ok: true };
    }
}
