function escapeCsv(value: unknown) {
    const text = value == null ? "" : String(value);
    if (/[",\n;]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
    return text;
}

export function toCsv(rows: Array<Record<string, unknown>>) {
    const first = rows[0];
    if (!first) return "geen_gegevens\n";
    const headers = Object.keys(first);
    return `\uFEFF${[headers.join(";"), ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(";"))].join("\n")}`;
}
