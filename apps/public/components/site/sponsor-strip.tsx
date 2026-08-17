import Image from "next/image";
import Link from "next/link";

const sponsors = [
    { src: "/cbwd.webp", alt: "CBWD", href: "https://cbwd.dev" },
    { src: "/serverpunt.webp", alt: "ServerPunt", href: "https://serverpunt.com" },
    { src: "/blossem.png", alt: "Blossem" },
    { src: "/ghevents.png", alt: "GH Events" },
    { src: "/GianottenMutsaers.jpg", alt: "Gianotten Mutsaers" },
    { src: "/logokavavlam.png", alt: "KAV A Vlam" },
    { src: "/zomerlust.png", alt: "Zomerlust" },
];

export default function SponsorStrip({ title = "Onze sponsoren" }: { title?: string }) {
    return (
        <section className="w-full rounded-2xl border border-border/60 bg-white/80 px-4 py-6 shadow-sm">
        {title ? <h2 className="mb-4 text-center text-xl font-semibold tracking-wide">{title}</h2> : null}
            <div className="grid grid-cols-2 items-center justify-items-center gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {sponsors.map((sponsor) => {
                    const logo = (
                        <Image
                            src={sponsor.src}
                            alt={sponsor.alt}
                            width={170}
                            height={80}
                            className="h-16 w-full object-contain"
                        />
                    );

                    if (!sponsor.href) {
                        return <div key={sponsor.src}>{logo}</div>;
                    }

                    return (
                        <Link key={sponsor.src} href={sponsor.href} target="_blank" rel="noreferrer">
                            {logo}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
