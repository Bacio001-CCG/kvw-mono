import { getBackendUrl } from "./backend-url";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${getBackendUrl()}${path}`, {
        ...init,
        credentials: "include",
        headers: {
            ...(init?.body ? { "Content-Type": "application/json" } : {}),
            ...(init?.headers || {}),
        },
    });

    if (response.status === 401) {
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
        }
        throw new Error("Niet ingelogd.");
    }

    if (response.status === 403) {
        const data = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Geen toegang.");
    }

    if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Er ging iets mis.");
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/csv")) {
        return response as unknown as T;
    }

    return response.json() as Promise<T>;
}

export async function downloadCsv(path: string, filename: string) {
    const response = await fetch(`${getBackendUrl()}${path}`, { credentials: "include" });
    if (!response.ok) throw new Error("Export mislukt.");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
