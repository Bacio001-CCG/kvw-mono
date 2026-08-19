import { count, desc } from "drizzle-orm";

import type { Database } from "@repo/database";
import { contentBlocks, contentPages, registrationCycles, siteDocuments, sponsors } from "../schema";
import { DEFAULT_BLOCKS, DEFAULT_CYCLE, DEFAULT_DOCUMENTS, DEFAULT_PAGES, DEFAULT_SPONSORS } from "./data";

export async function seedDatabase(db: Database) {
    const [cycleCount] = await db.select({ value: count() }).from(registrationCycles);
    if (Number(cycleCount.value) === 0) {
        await db.insert(registrationCycles).values(DEFAULT_CYCLE);
    }

    const existingPages = await db.select({ slug: contentPages.slug }).from(contentPages);
    const pageSlugs = new Set(existingPages.map((page) => page.slug));
    const missingPages = DEFAULT_PAGES.filter((page) => !pageSlugs.has(page.slug));
    if (missingPages.length) {
        await db.insert(contentPages).values(missingPages);
    }

    const existingBlocks = await db
        .select({ pageSlug: contentBlocks.pageSlug, blockKey: contentBlocks.blockKey })
        .from(contentBlocks);
    const blockKeys = new Set(existingBlocks.map((block) => `${block.pageSlug}:${block.blockKey}`));
    const missingBlocks = DEFAULT_BLOCKS.filter((block) => !blockKeys.has(`${block.pageSlug}:${block.blockKey}`));
    if (missingBlocks.length) {
        await db.insert(contentBlocks).values(missingBlocks);
    }

    const [documentCount] = await db.select({ value: count() }).from(siteDocuments);
    if (Number(documentCount.value) === 0) {
        const [cycle] = await db
            .select({ id: registrationCycles.id })
            .from(registrationCycles)
            .orderBy(desc(registrationCycles.year))
            .limit(1);
        await db.insert(siteDocuments).values(
            DEFAULT_DOCUMENTS.map((document) => ({
                ...document,
                cycleId: cycle?.id ?? null,
            }))
        );
    }

    const existingSponsors = await db.select({ name: sponsors.name }).from(sponsors);
    const sponsorNames = new Set(existingSponsors.map((sponsor) => sponsor.name));
    const missingSponsors = DEFAULT_SPONSORS.filter((sponsor) => !sponsorNames.has(sponsor.name));
    if (missingSponsors.length) {
        await db.insert(sponsors).values(missingSponsors);
    }

    return {
        pages: missingPages.length,
        blocks: missingBlocks.length,
        sponsors: missingSponsors.length,
        documents: Number(documentCount.value) === 0 ? DEFAULT_DOCUMENTS.length : 0,
        cycle: Number(cycleCount.value) === 0 ? 1 : 0,
    };
}
