import { NextResponse } from "next/server";

import { fetchPublicCmsSafe } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const cms = await fetchPublicCmsSafe();
    return NextResponse.json(cms, {
        headers: {
            "Cache-Control": "no-store, max-age=0",
        },
    });
}
