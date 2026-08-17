export const DEFAULT_PAGES = [
    {
        slug: "home",
        title: "Homepagina",
        summary: "Welkomsttekst en basisinformatie",
        body: "Al ruim 55 jaar organiseert HeKoS Kindervakantiewerk elk jaar een leuke week vol activiteiten voor kinderen van de basisschool.",
        isPublished: true,
    },
    {
        slug: "over-ons",
        title: "Over ons",
        summary: "Korte uitleg over KVW HeKoS",
        body: "KVW HeKoS organiseert al ruim 55 jaar een gezellige en actieve vakantieweek voor kinderen in Tilburg. Ons doel is simpel: kinderen een veilige, betaalbare en onvergetelijke week bezorgen.",
        isPublished: true,
    },
    {
        slug: "gedragscode",
        title: "Gedragscode",
        summary: "Afspraken voor een veilige week",
        body: "We behandelen kinderen, ouders, vrijwilligers en elkaar met respect. We zorgen voor een veilige, inclusieve en positieve sfeer tijdens alle activiteiten.",
        isPublished: true,
    },
    {
        slug: "sponsorpakketten",
        title: "Sponsorpakketten",
        summary: "Ook sponsor worden?",
        body: "Met jouw bijdrage houden we KVW HeKoS betaalbaar en toegankelijk voor alle kinderen. Neem contact op voor de mogelijkheden.",
        isPublished: true,
    },
    {
        slug: "bevestiging-kind",
        title: "Bevestiging kind",
        summary: "Tekst na kindinschrijving",
        body: "Bedankt voor de inschrijving(en) van uw kind(eren). Op naar weer een prachtige editie van KVW! Binnenkort ontvangt u meer informatie van ons over KVW zoals het programma. We nemen hierover contact met u op per mail. Heeft u voor nu dringende vragen, neem dan contact met ons op via info@kvwhekos.nl.",
        isPublished: true,
    },
    {
        slug: "bevestiging-vrijwilliger",
        title: "Bevestiging vrijwilliger",
        summary: "Tekst na vrijwilligersaanmelding",
        body: "Bedankt voor je aanmelding als vrijwilliger. We nemen zo snel mogelijk contact met je op per mail. Voor dringende vragen kun je terecht via info@kvwhekos.nl.",
        isPublished: true,
    },
];

export const DEFAULT_BLOCKS = [
    {
        pageSlug: "home",
        blockKey: "hero.eyebrow",
        title: "Homepagina eyebrow",
        body: "welkom bij HeKoS Kindervakantiewerk",
        sortOrder: 1,
        isActive: true,
    },
    {
        pageSlug: "home",
        blockKey: "hero.title",
        title: "Homepagina titel",
        body: "De leukste vakantie activiteit voor kinderen!",
        sortOrder: 2,
        isActive: true,
    },
    {
        pageSlug: "home",
        blockKey: "hero.intro",
        title: "Homepagina intro",
        body: "Al ruim 55 jaar organiseert HeKoS Kindervakantiewerk elk jaar een leuke week vol activiteiten voor kinderen van de basisschool! Jaarlijks 5 dagen vol plezier in de laatste week van de zomervakantie.",
        sortOrder: 3,
        isActive: true,
    },
    {
        pageSlug: "home",
        blockKey: "programma.updatedAt",
        title: "Programma laatst bijgewerkt",
        body: "1 juni 2026",
        sortOrder: 4,
        isActive: true,
    },
    {
        pageSlug: "home",
        blockKey: "groepen.updatedAt",
        title: "Groepenlijst laatst bijgewerkt",
        body: "1 juni 2026",
        sortOrder: 5,
        isActive: true,
    },
];

export const DEFAULT_SPONSORS = [
    {
        name: "CBWD",
        websiteUrl: "https://cbwd.dev",
        logoUrl: "/cbwd.webp",
        placement: "both" as const,
        sortOrder: 1,
        isActive: true,
    },
    {
        name: "ServerPunt",
        websiteUrl: "https://serverpunt.com",
        logoUrl: "/serverpunt.webp",
        placement: "both" as const,
        sortOrder: 2,
        isActive: true,
    },
];
