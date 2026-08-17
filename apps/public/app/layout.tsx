import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/footer";
import { SiteStatusProvider, TestModeBanner } from "@/components/site/site-status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KVW HeKoS",
  description: "Kindervakantiewerk HeKoS in Tilburg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteStatusProvider>
        <Navbar />
        <TestModeBanner />
        {children}
        <ToastContainer />
        <Footer />
        </SiteStatusProvider>
      </body>
    </html>
  );
}
