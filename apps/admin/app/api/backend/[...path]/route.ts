import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getBackendUrl() {
    const fromEnv = process.env["BACKEND_URL"];
    if (fromEnv) return fromEnv.replace(/\/$/, "");
    return process.env.NODE_ENV === "production" ? "http://backend:4000" : "http://localhost:4000";
}

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    const target = `${getBackendUrl()}/${path.join("/")}${request.nextUrl.search}`;

    // Forward headers we explicitly need. In particular, cookie forwarding can be finicky across runtimes,
    // so we set `Cookie` (capital C) explicitly.
    const headers = new Headers();
    const cookie = request.headers.get("cookie");
    if (cookie) headers.set("Cookie", cookie);
    const requestContentType = request.headers.get("content-type");
    if (requestContentType) headers.set("content-type", requestContentType);
    const accept = request.headers.get("accept");
    if (accept) headers.set("accept", accept);

    const init: RequestInit = { method: request.method, headers };
    if (request.method !== "GET" && request.method !== "HEAD") {
        init.body = await request.arrayBuffer();
        Object.assign(init, { duplex: "half" });
    }

    let response: Response;
    try {
        response = await fetch(target, init);
    } catch {
        return NextResponse.json({ message: "De server is even niet bereikbaar." }, { status: 503 });
    }

    const out = new NextResponse(response.body, { status: response.status });
    const contentType = response.headers.get("content-type");
    if (contentType) out.headers.set("content-type", contentType);
    const disposition = response.headers.get("content-disposition");
    if (disposition) out.headers.set("content-disposition", disposition);

    const setCookies = response.headers.getSetCookie();
    for (const cookie of setCookies) {
        out.headers.append("set-cookie", cookie);
    }

    if (setCookies.length > 0) {
        // Avoid logging cookie contents (may include session tokens).
        console.log("[proxy] forwarded set-cookie count:", setCookies.length);
    }

    return out;
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
