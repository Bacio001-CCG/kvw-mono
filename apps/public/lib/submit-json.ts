export async function submitJson<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = (await response.json().catch(() => ({}))) as { message?: string } & T;
    if (!response.ok) {
        throw new Error(data.message || "Er ging iets mis. Probeer het later opnieuw.");
    }

    return data;
}
