import Link from "next/link";

export default function UnpublishedNotice() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
            <h1 className="text-3xl font-semibold">Deze pagina is nu niet zichtbaar</h1>
            <p className="mt-3 text-muted-foreground">
                De organisatie heeft deze pagina uitgezet in het beheer. Kijk later nog eens, of stuur een mail naar info@kvwhekos.nl.
            </p>
            <Link href="/" className="mt-6 inline-block text-orange-600 underline">
                Terug naar home
            </Link>
        </main>
    );
}
