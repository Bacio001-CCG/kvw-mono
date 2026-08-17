import {
    EMERGENCY_CONTACT_RELATION_VALUES,
    GRADE_LEVEL_VALUES,
    PICKUP_PERMISSION_VALUES,
    SCHOOL_TYPE_VALUES,
    SWIM_CERTIFICATE_LEVEL_VALUES,
    VOLUNTEER_AVAILABILITY_VALUES,
    VOLUNTEER_PREFERENCE_VALUES,
} from "@repo/types";

function asEnum<T extends readonly string[]>(values: T, value: string | undefined, fallback: T[number]): T[number] {
    return value && values.includes(value) ? (value as T[number]) : fallback;
}

export function toDateInput(value: Date | string | null | undefined) {
    if (!value) return "";
    if (typeof value === "string") return value.slice(0, 10);
    return value.toISOString().slice(0, 10);
}

export function toIso(value: Date | string | null | undefined) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.toISOString();
}

export function parseTimestamp(value: unknown) {
    if (value == null || value === "") return null;
    if (value instanceof Date) return value;
    const text = String(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        return new Date(`${text}T12:00:00.000Z`);
    }
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function mapSchoolType(value: string | undefined) {
    return asEnum(SCHOOL_TYPE_VALUES, value, "other");
}

export function mapGradeLevel(value: string | undefined) {
    return asEnum(GRADE_LEVEL_VALUES, value, "group_1");
}

export function mapPickupPermission(value: string | undefined) {
    return asEnum(PICKUP_PERMISSION_VALUES, value, "picked_up");
}

export function mapSwim(value: string | undefined) {
    const raw = (value || "").trim();
    const lower = raw.toLowerCase();
    let level: (typeof SWIM_CERTIFICATE_LEVEL_VALUES)[number] = "none";
    if (/\bc\b/.test(lower) || lower.includes("diploma c")) level = "c";
    else if (/\bb\b/.test(lower) || lower.includes("diploma b")) level = "b";
    else if (/\ba\b/.test(lower) || lower.includes("diploma a")) level = "a";
    else if (SWIM_CERTIFICATE_LEVEL_VALUES.includes(lower as (typeof SWIM_CERTIFICATE_LEVEL_VALUES)[number])) {
        level = lower as (typeof SWIM_CERTIFICATE_LEVEL_VALUES)[number];
    }
    return { level, raw };
}

export function mapAvailability(value: string | undefined, other?: string) {
    if ((other || "").trim()) return "other" as const;
    return asEnum(VOLUNTEER_AVAILABILITY_VALUES, value, "event_week_only");
}

export function mapPreference(value: string | undefined) {
    return asEnum(VOLUNTEER_PREFERENCE_VALUES, value, "no_preference");
}

export function mapEmergencyRelation(value: string | undefined) {
    const text = (value || "").trim().toLowerCase();
    if (!text) return "other" as const;
    if (EMERGENCY_CONTACT_RELATION_VALUES.includes(text as (typeof EMERGENCY_CONTACT_RELATION_VALUES)[number])) {
        return text as (typeof EMERGENCY_CONTACT_RELATION_VALUES)[number];
    }
    if (/(moeder|mama|mother)/.test(text)) return "mother" as const;
    if (/(vader|papa|father)/.test(text)) return "father" as const;
    if (/(ouder|parent)/.test(text)) return "parent" as const;
    if (/partner/.test(text)) return "partner" as const;
    if (/(oma|opa|groot|grand)/.test(text)) return "grandparent" as const;
    if (/(vriend|friend)/.test(text)) return "friend" as const;
    return "other" as const;
}
