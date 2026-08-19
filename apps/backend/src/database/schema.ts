import { sql } from "drizzle-orm";
import {
    boolean,
    date,
    index,
    integer,
    jsonb,
    numeric,
    pgEnum,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import {
    DOCUMENT_KIND_VALUES,
    EMERGENCY_CONTACT_RELATION_VALUES,
    GRADE_LEVEL_VALUES,
    PICKUP_PERMISSION_VALUES,
    REGISTRATION_CYCLE_STATUS_VALUES,
    REGISTRATION_SUBMISSION_STATUS_VALUES,
    SCHOOL_TYPE_VALUES,
    SPONSOR_PLACEMENT_VALUES,
    SWIM_CERTIFICATE_LEVEL_VALUES,
    VOLUNTEER_AVAILABILITY_VALUES,
    VOLUNTEER_PREFERENCE_VALUES,
} from "@repo/types";

const timestamps = () => ({
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const registrationCycleStatusEnum = pgEnum(
    "registration_cycle_status",
    REGISTRATION_CYCLE_STATUS_VALUES
);

export const registrationSubmissionStatusEnum = pgEnum(
    "registration_submission_status",
    REGISTRATION_SUBMISSION_STATUS_VALUES
);

export const sponsorPlacementEnum = pgEnum(
    "sponsor_placement",
    SPONSOR_PLACEMENT_VALUES
);

export const documentKindEnum = pgEnum("document_kind", DOCUMENT_KIND_VALUES);

export const schoolTypeEnum = pgEnum("school_type", SCHOOL_TYPE_VALUES);

export const gradeLevelEnum = pgEnum("grade_level", GRADE_LEVEL_VALUES);

export const swimCertificateLevelEnum = pgEnum(
    "swim_certificate_level",
    SWIM_CERTIFICATE_LEVEL_VALUES
);

export const pickupPermissionEnum = pgEnum(
    "pickup_permission",
    PICKUP_PERMISSION_VALUES
);

export const volunteerAvailabilityEnum = pgEnum(
    "volunteer_availability",
    VOLUNTEER_AVAILABILITY_VALUES
);

export const volunteerPreferenceEnum = pgEnum(
    "volunteer_preference",
    VOLUNTEER_PREFERENCE_VALUES
);

export const emergencyContactRelationEnum = pgEnum(
    "emergency_contact_relation",
    EMERGENCY_CONTACT_RELATION_VALUES
);

export const contentPages = pgTable(
    "content_pages",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        slug: text("slug").notNull(),
        title: text("title").notNull(),
        summary: text("summary"),
        body: text("body").notNull(),
        isPublished: boolean("is_published").notNull().default(false),
        ...timestamps(),
    },
    (table) => ({
        slugUnique: unique("content_pages_slug_unique").on(table.slug),
    })
);

export const contentBlocks = pgTable(
    "content_blocks",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        pageSlug: text("page_slug").notNull(),
        blockKey: text("block_key").notNull(),
        title: text("title"),
        body: text("body"),
        data: jsonb("data").$type<Record<string, unknown> | null>(),
        sortOrder: integer("sort_order").notNull().default(0),
        isActive: boolean("is_active").notNull().default(true),
        ...timestamps(),
    },
    (table) => ({
        pageKeyUnique: unique("content_blocks_page_slug_block_key_unique").on(
            table.pageSlug,
            table.blockKey
        ),
        pageSortIndex: index("content_blocks_page_slug_sort_order_idx").on(
            table.pageSlug,
            table.sortOrder
        ),
    })
);

export const registrationCycles = pgTable(
    "registration_cycles",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        year: integer("year").notNull(),
        label: text("label").notNull(),
        status: registrationCycleStatusEnum("status").notNull().default("draft"),
        isTestMode: boolean("is_test_mode").notNull().default(false),
        childRegistrationsOpen: boolean("child_registrations_open").notNull().default(false),
        volunteerRegistrationsOpen: boolean("volunteer_registrations_open")
            .notNull()
            .default(false),
        childRegistrationsOpenAt: timestamp("child_registrations_open_at"),
        childRegistrationsCloseAt: timestamp("child_registrations_close_at"),
        volunteerRegistrationsOpenAt: timestamp("volunteer_registrations_open_at"),
        volunteerRegistrationsCloseAt: timestamp("volunteer_registrations_close_at"),
        pricePerChild: numeric("price_per_child", {
            precision: 10,
            scale: 2,
        })
            .notNull()
            .default("0"),
        maxChildrenPerRegistration: integer("max_children_per_registration")
            .notNull()
            .default(1),
        maxGuardiansPerRegistration: integer("max_guardians_per_registration")
            .notNull()
            .default(1),
        ...timestamps(),
    },
    (table) => ({
        yearUnique: unique("registration_cycles_year_unique").on(table.year),
    })
);

export const sponsors = pgTable(
    "sponsors",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        websiteUrl: text("website_url"),
        logoUrl: text("logo_url").notNull(),
        placement: sponsorPlacementEnum("placement").notNull().default("both"),
        sortOrder: integer("sort_order").notNull().default(0),
        isActive: boolean("is_active").notNull().default(true),
        ...timestamps(),
    },
    (table) => ({
        placementSortIndex: index("sponsors_placement_sort_order_idx").on(
            table.placement,
            table.sortOrder
        ),
    })
);

export const siteDocuments = pgTable(
    "site_documents",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        cycleId: uuid("cycle_id").references(() => registrationCycles.id, {
            onDelete: "set null",
        }),
        kind: documentKindEnum("kind").notNull(),
        title: text("title").notNull(),
        description: text("description"),
        fileUrl: text("file_url").notNull(),
        opensInNewTab: boolean("opens_in_new_tab").notNull().default(true),
        isActive: boolean("is_active").notNull().default(true),
        ...timestamps(),
    },
    (table) => ({
        cycleKindIndex: index("site_documents_cycle_id_kind_idx").on(
            table.cycleId,
            table.kind
        ),
    })
);

export const childRegistrations = pgTable(
    "child_registrations",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        cycleId: uuid("cycle_id")
            .notNull()
            .references(() => registrationCycles.id, { onDelete: "cascade" }),
        status: registrationSubmissionStatusEnum("status")
            .notNull()
            .default("draft"),
        guardianEmail: text("guardian_email").notNull(),
        guardianPhonePrimary: text("guardian_phone_primary").notNull(),
        guardianPhoneSecondary: text("guardian_phone_secondary"),
        streetAddress: text("street_address").notNull(),
        postalCode: text("postal_code").notNull(),
        city: text("city").notNull(),
        extraDonationAmount: numeric("extra_donation_amount", {
            precision: 10,
            scale: 2,
        })
            .notNull()
            .default("0"),
        termsAccepted: boolean("terms_accepted").notNull().default(false),
        photoConsentAccepted: boolean("photo_consent_accepted")
            .notNull()
            .default(false),
        submittedAt: timestamp("submitted_at"),
        ...timestamps(),
    },
    (table) => ({
        cycleIndex: index("child_registrations_cycle_id_idx").on(table.cycleId),
        statusIndex: index("child_registrations_status_idx").on(table.status),
    })
);

export const childRegistrationChildren = pgTable(
    "child_registration_children",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        registrationId: uuid("registration_id")
            .notNull()
            .references(() => childRegistrations.id, { onDelete: "cascade" }),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        birthDate: date("birth_date").notNull(),
        schoolType: schoolTypeEnum("school_type").notNull(),
        schoolOtherName: text("school_other_name"),
        gradeLevel: gradeLevelEnum("grade_level").notNull(),
        friendRequest: text("friend_request"),
        swimCertificateLevel: swimCertificateLevelEnum("swim_certificate_level")
            .notNull()
            .default("none"),
        swimCertificates: text("swim_certificates"),
        hasLiabilityInsurance: boolean("has_liability_insurance")
            .notNull()
            .default(false),
        pickupPermission: pickupPermissionEnum("pickup_permission")
            .notNull()
            .default("picked_up"),
        notes: text("notes"),
        ...timestamps(),
    },
    (table) => ({
        registrationIndex: index("child_registration_children_registration_id_idx").on(
            table.registrationId
        ),
    })
);

export const volunteerRegistrations = pgTable(
    "volunteer_registrations",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        cycleId: uuid("cycle_id")
            .notNull()
            .references(() => registrationCycles.id, { onDelete: "cascade" }),
        status: registrationSubmissionStatusEnum("status")
            .notNull()
            .default("draft"),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        email: text("email").notNull(),
        phoneNumber: text("phone_number").notNull(),
        streetAddress: text("street_address").notNull(),
        postalCode: text("postal_code").notNull(),
        city: text("city").notNull(),
        emergencyContactName: text("emergency_contact_name").notNull(),
        emergencyContactPhone: text("emergency_contact_phone").notNull(),
        emergencyContactRelation: emergencyContactRelationEnum(
            "emergency_contact_relation"
        ).notNull(),
        birthDate: date("birth_date").notNull(),
        hasBhvCertificate: boolean("has_bhv_certificate")
            .notNull()
            .default(false),
        availability: volunteerAvailabilityEnum("availability")
            .notNull()
            .default("event_week_only"),
        availabilityOther: text("availability_other"),
        ageGroupPreference: volunteerPreferenceEnum("age_group_preference")
            .notNull()
            .default("no_preference"),
        notes: text("notes"),
        ...timestamps(),
    },
    (table) => ({
        cycleIndex: index("volunteer_registrations_cycle_id_idx").on(table.cycleId),
        statusIndex: index("volunteer_registrations_status_idx").on(table.status),
    })
);

export const contactMessages = pgTable(
    "contact_messages",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        fullName: text("full_name").notNull(),
        email: text("email").notNull(),
        subject: text("subject").notNull(),
        message: text("message").notNull(),
        sourcePage: text("source_page"),
        isRead: boolean("is_read").notNull().default(false),
        ...timestamps(),
    },
    (table) => ({
        emailIndex: index("contact_messages_email_idx").on(table.email),
    })
);

export const user = pgTable(
    "user",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        emailVerified: boolean("email_verified").default(false).notNull(),
        image: text("image"),
        isOwner: boolean("is_owner").default(false).notNull(),
        isActive: boolean("is_active").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => ({
        emailUnique: unique("user_email_unique").on(table.email),
        emailIndex: index("user_email_idx").on(table.email),
    })
);

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => ({
        tokenUnique: unique("session_token_unique").on(table.token),
        userIndex: index("session_user_id_idx").on(table.userId),
        expiresAtIndex: index("session_expires_at_idx").on(table.expiresAt),
        tokenIndex: index("session_token_idx").on(table.token),
    })
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => ({
        userIndex: index("account_user_id_idx").on(table.userId),
        providerIndex: index("account_provider_id_idx").on(table.providerId),
    })
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => ({
        identifierIndex: index("verification_identifier_idx").on(table.identifier),
        expiresAtIndex: index("verification_expires_at_idx").on(table.expiresAt),
    })
);

export const userPermissions = pgTable("user_permissions", {
    userId: text("user_id")
        .primaryKey()
        .references(() => user.id, { onDelete: "cascade" }),
    permissions: text("permissions").notNull().default("[]"),
    ...timestamps(),
});

export type SelectSettings = typeof registrationCycles.$inferSelect;