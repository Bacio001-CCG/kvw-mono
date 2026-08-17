function escapeCsv(value: unknown) {
    const text = value == null ? "" : String(value);
    if (/[",\n;]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
}

export function toCsv(rows: Array<Record<string, unknown>>) {
    const firstRow = rows[0];
    if (!firstRow) {
        return "geen_gegevens\n";
    }

    const headers = Object.keys(firstRow);
    const lines = [
        headers.join(";"),
        ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(";")),
    ];
    return `\uFEFF${lines.join("\n")}`;
}
