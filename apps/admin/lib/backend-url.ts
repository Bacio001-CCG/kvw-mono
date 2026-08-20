/**
 * Browser → host-published backend port (Docker: BACKEND_HOST_PORT).
 * Containers talk to each other via BACKEND_URL=http://backend:4000 (server-side only).
 */
export function getBackendUrl() {
    if (typeof window !== "undefined") {
        const explicit = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
        if (explicit) return explicit.replace(/\/+$/, "");

        const port = process.env.NEXT_PUBLIC_BACKEND_HOST_PORT?.trim() || "7400";
        return `${window.location.protocol}//${window.location.hostname}:${port}`;
    }

    return (
        process.env.BACKEND_URL ??
        process.env.NEXT_PUBLIC_BACKEND_URL ??
        "http://localhost:4000"
    ).replace(/\/+$/, "");
}
