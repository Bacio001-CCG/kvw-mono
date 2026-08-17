"use client";

import Section from "@/components/section";
import { Button } from "@workspace/ui/components/button";
import { Download } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSiteStatus } from "@/components/site/site-status";
import { cmsDocument, cmsPage, cmsSponsors } from "@/lib/cms";
import { DEFAULT_CONTENT } from "@/lib/site-defaults";

export default function Page() {
  const status = useSiteStatus();
  const program = status ? cmsDocument(status, "program") : undefined;
  const groups = status ? cmsDocument(status, "group_assignment") : undefined;
  const bottomSponsors = status ? cmsSponsors(status, "bottom") : [];
  const mission = status ? cmsPage(status, "over-ons") || cmsPage(status, "home") : undefined;

  return (
    <div className="flex flex-col gap-24 scroll-smooth">
      <Header />
      <div className=" flex flex-col gap-32 mb-32 mx-auto">
        {program || groups ? (
        <Section title="Programma & Groepenlijst" orientation="left" children={
          <>
            {program ? <Programma /> : null}
            {groups ? <Groepen /> : null}
          </>
        } />
        ) : null}
        {bottomSponsors.length ? (
        <Section title="Onze Sponsoren" orientation="center" children={
          <>
            <Sponsor placement="bottom" transition={false} />
          </>
        } />
        ) : null}
        {mission ? (
        <Section title="Onze Missie" id="missie" orientation="right" children={
          <>
            <OnzeMissie />
          </>
        } />
        ) : null}
      </div>
    </div>
  );
}

export function OnzeMissie() {
  const status = useSiteStatus();
  const page = status ? cmsPage(status, "over-ons") || cmsPage(status, "home") : undefined;
  if (!page) return null;

  return <>
    <h2 className="text-2xl font-semibold tracking-widest relative w-fit flex flex-col gap-2 text-center mx-auto">
      {page.title}
      <hr className="border border-border w-3/4 rounded-full mx-auto" />
    </h2>
    <p className="text-center whitespace-pre-line">{page.body}</p>
  </>
}

export function Programma() {
  const status = useSiteStatus();
  const document = status ? cmsDocument(status, "program") : undefined;
  if (!document) return null;
  return (
    <div className="w-full flex items-center justify-center  p-5 rounded-2xl relative bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-10 relative">
        <div className="relative">
          <div className="w-full max-w-[350px] aspect-square relative overflow-hidden rounded-2xl z-20 mx-auto lg:mx-0">
            <Image src="/crayons-1445053_1920.jpg" alt="Logo" width={350} height={350} className={`object-cover w-full h-full`} />
            <div aria-hidden className="absolute inset-0 pointer-events-none z-30 bg-orange-500/30" />
          </div>
          <div aria-hidden className="absolute -inset-6 rounded-2xl bg-gradient-to-r from-orange-400/60 via-orange-300/40 to-transparent blur-3xl opacity-80 z-10 pointer-events-none" />
        </div>
        <div className="flex-1 flex flex-col gap-5 py-5">
          <h2 className="text-2xl font-semibold tracking-widest relative w-fit flex flex-col gap-2">
            {document.title}
            <hr className="border border-border w-3/4 rounded-full" />
          </h2>
          {document.description ? <p className="tracking-wide opacity-70">{document.description}</p> : null}

          <Button asChild variant="default" className="bg-orange-500 self-start">
            <a href={document.fileUrl} target={document.opensInNewTab ? "_blank" : undefined} rel="noreferrer">
              <Download /> Download het programma
            </a>
          </Button>
          {status?.content.programmaUpdatedAt ? (
          <span className="opacity-50 border border-border rounded-full w-fit p-2 text-xs bg-muted bottom-0 md:absolute right-0">
            Laatst bijgewerkt: {status.content.programmaUpdatedAt}
          </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Groepen() {
  const status = useSiteStatus();
  const document = status ? cmsDocument(status, "group_assignment") : undefined;
  if (!document) return null;
  return (
    <div className="w-full flex items-center justify-center  p-5 rounded-2xl relative bg-gray-50">
      <div className="flex flex-col lg:flex-row-reverse gap-10 relative">
        <div className="relative">
          <div className="w-full max-w-[350px] aspect-square relative overflow-hidden rounded-2xl z-20 mx-auto lg:mx-0">
            <Image src="/8880012caringforkids1200x1200_b817baf3-cbb0-4aca-95f2-8245e6a6189c.webp" alt="Logo" width={350} height={350} className="object-cover w-full h-full" />
            <div aria-hidden className="absolute inset-0 pointer-events-none z-30 bg-sky-500/30" />
          </div>
          <div aria-hidden className="absolute -inset-6 rounded-2xl bg-gradient-to-l from-sky-400/60 via-sky-300/40 to-transparent blur-3xl opacity-80 z-10 pointer-events-none" />
        </div>
        <div className="flex-1 flex flex-col gap-5 py-5">
          <h2 className="text-2xl font-semibold tracking-widest relative w-fit flex flex-col gap-2">
            {document.title}
            <hr className="border border-border w-3/4 rounded-full ml-auto" />
          </h2>
          {document.description ? <p className="tracking-wide opacity-70">{document.description}</p> : null}

          <Button asChild variant="default" className="bg-sky-500 self-start">
            <a href={document.fileUrl} target={document.opensInNewTab ? "_blank" : undefined} rel="noreferrer">
              <Download /> Download de groepenlijst
            </a>
          </Button>
          {status?.content.groepenUpdatedAt ? (
          <span className="opacity-50 border border-border rounded-full w-fit p-2 text-xs bg-muted bottom-0 md:absolute left-0">
            Laatst bijgewerkt: {status.content.groepenUpdatedAt}
          </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [faded, setFaded] = useState(false);
  const status = useSiteStatus();
  const content = status?.content ?? DEFAULT_CONTENT;

  useEffect(() => {
    const t = setTimeout(() => setFaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      <section className="relative h-screen w-full">
        <Image src="/hands.jpg" alt="Banner image" fill className="object-cover" priority />
        <div
          aria-hidden
          className={`absolute inset-0 bg-white transition-opacity duration-1000 motion-reduce:transition-none ${faded ? 'opacity-80' : 'opacity-0'}`}
        />
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-30 bg-gradient-to-b from-transparent to-white" />
        <div aria-hidden className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-30 bg-gradient-to-t from-transparent to-white" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative inset-0 flex items-center justify-center">
            <div className="text-center text-black px-4 z-20 max-w-[700px] -my-18 flex flex-col gap-5">
              <h2 className={`text-orange-500 uppercase font-bold tracking-widest text-xl transform transition-all duration-700 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{content.homepageEyebrow}</h2>
              <h1 className={`text-5xl font-bold tracking-wider transform transition-all duration-800 delay-100 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>{content.homepageTitle}</h1>
              <p className={`text-lg font-semibold line-clamp-6 transform transition-all duration-800 delay-200 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>{content.homepageIntro}</p>
              <div className="flex flex-wrap gap-5 mx-auto justify-center">
                {status?.childOpen !== false ? (
                <Button asChild variant="default" size="lg" className={`transform transition-all duration-800 delay-300 bg-orange-500 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <Link href="/inschrijven/kind">Schrijf uw kind in</Link>
                </Button>
                ) : null}
                {status?.volunteerOpen !== false ? (
                <Button asChild variant="outline" size="lg" className={`transform transition-all duration-800 delay-400 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <Link href="/inschrijven/vrijwilliger">Word vrijwilliger</Link>
                </Button>
                ) : null}
              </div>
            </div>
            <Image src="/hands_no_background.png" alt="Logo" width={250} height={250} className={`transform transition-all duration-800 delay-300 absolute -right-40 -top-48 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} />
          </div>

        </div>
        {status && cmsSponsors(status, "top").length ? (
        <Section className="z-50 absolute bottom-26 left-1/2 -translate-x-1/2 bg-white/50 p-3 rounded-lg " title="" orientation="left" children={
          <>
            <Sponsor placement="top" transition={true} />
          </>
        } />
        ) : null}
      </section>
    </main>
  );
}

export function Sponsor({
  transition = true,
  placement = "both",
}: {
  transition: boolean;
  placement?: "top" | "bottom" | "both";
}) {
  const status = useSiteStatus();
  const source = !status
    ? []
    : placement === "both"
      ? status.sponsors
      : cmsSponsors(status, placement);
  const sponsors = source.map((sponsor) => ({
        src: sponsor.logoUrl,
        href: sponsor.websiteUrl || undefined,
        alt: sponsor.name,
      }));
  if (!sponsors.length) return null;

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 items-center justify-items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: transition ? 0.2 : 0,
          },
        },
      }}
    >
      {sponsors.map((sponsor) => {
        const remote = sponsor.src.startsWith("http");
        const logo = remote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.src} alt={sponsor.alt || "Logo"} className="max-w-full h-20 object-contain" />
        ) : (
          <Image
            src={sponsor.src}
            alt={sponsor.alt || "Logo"}
            width={200}
            height={200}
            className="max-w-full h-20 object-contain"
          />
        );

        return (
          <motion.div
            key={sponsor.src + (sponsor.alt || "")}
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, ease: "easeOut" },
              },
            }}
          >
            {sponsor.href ? (
              <Link href={sponsor.href} target="_blank">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </motion.div>
        );
      })}
    </motion.div>
  )
}