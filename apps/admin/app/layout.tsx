import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@workspace/ui/globals.css";

import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "KVW HeKoS beheer",
    description: "Beheeromgeving voor inschrijvingen, teksten en export",
    robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="nl">
            <body className={`${geistSans.variable} antialiased`}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
