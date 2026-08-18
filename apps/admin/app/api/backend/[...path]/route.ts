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

    const headers = new Headers();
    for (const key of ["cookie", "content-type", "accept"]) {
        const value = request.headers.get(key);
        if (value) headers.set(key, value);
    }

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

    for (const cookie of response.headers.getSetCookie()) {
        out.headers.append("set-cookie", cookie);
    }

    return out;
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
