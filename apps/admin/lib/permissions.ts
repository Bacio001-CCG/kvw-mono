export const ADMIN_PERMISSIONS = [
    "overview",
    "registrations",
    "children",
    "volunteers",
    "content",
    "documents",
    "sponsors",
    "contact",
    "team",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

export const ADMIN_PERMISSION_LABELS: Record<AdminPermission, string> = {
    overview: "Overzicht",
    registrations: "Inschrijvingen",
    children: "Kinderen",
    volunteers: "Vrijwilligers",
    content: "Teksten",
    documents: "PDF's",
    sponsors: "Sponsoren",
    contact: "Contact",
    team: "Gebruikers & rechten",
};

export type AuthUser = {
    id: string;
    email: string;
    name: string;
    isOwner: boolean;
};

export type AuthMe = {
    user: AuthUser;
    permissions: AdminPermission[];
};

export type AdminUserRow = AuthUser & {
    isActive: boolean;
    permissions: AdminPermission[];
};

export function hasPermission(
    permissions: AdminPermission[] | undefined,
    permission: AdminPermission
) {
    return Boolean(permissions?.includes(permission));
}

export function permissionForPath(pathname: string): AdminPermission | null {
    if (pathname === "/" || pathname === "") return "overview";
    if (pathname.startsWith("/inschrijvingen")) return "registrations";
    if (pathname.startsWith("/kinderen")) return "children";
    if (pathname.startsWith("/vrijwilligers")) return "volunteers";
    if (pathname.startsWith("/teksten")) return "content";
    if (pathname.startsWith("/documenten")) return "documents";
    if (pathname.startsWith("/sponsors")) return "sponsors";
    if (pathname.startsWith("/contact")) return "contact";
    if (pathname.startsWith("/gebruikers")) return "team";
    return null;
}
