import { NextResponse } from "next/server";

import { mapVolunteerRegistration, postToBackend } from "@/lib/cms";

export async function POST(request: Request) {
    const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!payload) {
        return NextResponse.json({ message: "Ongeldige gegevens." }, { status: 400 });
    }

    const { status, data } = await postToBackend("/public/registrations/volunteer", mapVolunteerRegistration(payload));
    if (data.message && status >= 400) {
        return NextResponse.json({ message: data.message }, { status });
    }
    if (!data.ok) {
        return NextResponse.json({ message: data.message || "Inschrijving mislukt." }, { status: status >= 400 ? status : 502 });
    }
    return NextResponse.json(data);
}
