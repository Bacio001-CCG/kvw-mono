export const REGISTRATION_CYCLE_STATUS_VALUES = [
    "draft",
    "open",
    "closed",
    "archived",
] as const;

export const REGISTRATION_SUBMISSION_STATUS_VALUES = [
    "draft",
    "submitted",
    "payment_pending",
    "confirmed",
    "cancelled",
] as const;

export const SPONSOR_PLACEMENT_VALUES = ["top", "bottom", "both"] as const;

export const DOCUMENT_KIND_VALUES = ["program", "group_assignment", "other"] as const;

export const SCHOOL_TYPE_VALUES = [
    "armhoefse_akker",
    "panta_rhei",
    "pendula",
    "other",
] as const;

export const GRADE_LEVEL_VALUES = [
    "group_1",
    "group_2",
    "group_3",
    "group_4",
    "group_5",
    "group_6",
    "group_7",
    "group_8",
    "first_year_secondary_school",
] as const;

export const SWIM_CERTIFICATE_LEVEL_VALUES = ["a", "b", "c", "none"] as const;

export const PICKUP_PERMISSION_VALUES = ["may_leave_alone", "picked_up"] as const;

export const VOLUNTEER_AVAILABILITY_VALUES = [
    "all_days",
    "event_week_only",
    "other",
] as const;

export const VOLUNTEER_PREFERENCE_VALUES = [
    "lower",
    "middle",
    "upper",
    "no_preference",
] as const;

export const EMERGENCY_CONTACT_RELATION_VALUES = [
    "mother",
    "father",
    "parent",
    "partner",
    "grandparent",
    "friend",
    "other",
] as const;