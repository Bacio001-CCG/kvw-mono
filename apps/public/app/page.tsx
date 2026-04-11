"use client";

import Section from "@/components/section";
import { Button } from "@workspace/ui/components/button";
import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-24 scroll-smooth">
      <Header />
      <div className=" flex flex-col gap-32 mb-32 mx-auto">
        <Section title="Programma & Groepenlijst" orientation="left" children={
          <>
            <Programma />
            <Groepen />
          </>
        } />
        <Section title="Sponsors" orientation="center" children={
          <>
            <Sponsor />
          </>
        } />
        <Section title="Onze Missie" id="missie" orientation="right" children={
          <>
            <OnzeMissie />
          </>
        } />
      </div>
    </div>
  );
}

export function OnzeMissie() {
  return <>
    <h2 className="text-2xl font-semibold tracking-widest relative w-fit flex flex-col gap-2 text-center mx-auto">
      Hekos heeft één missie!
      <hr className="border border-border w-3/4 rounded-full mx-auto" />
    </h2>
    <p className="text-center">

      KVW HeKoS is opgericht vanuit de parochie binnen de wijk de ‘Armhoefse Akkers’ rond 1960. Het oorspronkelijke doel van dit kindervakantiewerk was om kinderen, wiens ouders geen zomervakantie konden veroorloven, toch een leuke week te bezorgen. Een soort vakantie, maar dan “gewoon” in de wijk. Ook toen al vond KVW plaats in de laatste week van de zomervakantie en draaide de gehele week enkel op vrijwilligers. De grote aanjager van KVW HeKoS was in de jaren ’70 en ’80 kapelaan Spijkers.
      <br />
      <br />
      Hoewel de organisatie achter en KVW zelf natuurlijk door de jaren heen gigantisch is ontwikkeld en gegroeid, is de kern van het programma nog enigszins identiek aan vroeger: low-budget, gezellige kinderactiviteiten en terug naar de basis namelijk, gewoon plezier maken!</p>
  </>
}

export function Programma() {
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
            KVW Programma
            <hr className="border border-border w-3/4 rounded-full" />
          </h2>
          <p className="tracking-wide opacity-70">
            Maanden voordat het zover is, wordt er druk gewerkt aan het programma. Uitstapjes worden geregeld, bussen worden besteld, sponsors worden benaderd, materiaal wordt aangeschaft, leiding wordt georganiseerd en nog veel meer. Zodra het programma voor komend jaar rond is, plaatsen wij dit op de website.                    </p>

          <Button asChild variant="default" className="bg-orange-500 self-start">
            <a href="/programma.pdf" target="_blank" rel="noreferrer">
              <Download /> Download het programma
            </a>
          </Button>
          <span className="opacity-50 border border-border rounded-full w-fit p-2 text-xs bg-muted bottom-0 md:absolute right-0">
            Laatst bijgewerkt: 1 juni 2024
          </span>
        </div>
      </div>
    </div>
  );
}

export function Groepen() {
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
            KVW Groepenlijst
            <hr className="border border-border w-3/4 rounded-full ml-auto" />
          </h2>
          <p className="tracking-wide opacity-70">
            Ieder jaar worden de kinderen die ingeschreven zijn ingedeeld in groepen. Bij de indeling wordt gelet op leeftijd, school en klas. Ook zal er zo veel mogelijk rekening worden gehouden met de wensen die zijn vastgelegd bij de inschrijving. Aan iedere groep wordt minimaal één ervaren aspirant begeleider toegewezen. Na veel gepuzzel komen we tot een groepsindeling waarmee hopelijk iedereen tevreden is.                    </p>

          <Button asChild variant="default" className="bg-sky-500 self-start">
            <a href="/groepen.pdf" target="_blank" rel="noreferrer">
              <Download /> Download de groepenlijst
            </a>
          </Button>
          <span className="opacity-50 border border-border rounded-full w-fit p-2 text-xs bg-muted bottom-0 md:absolute left-0">
            Laatst bijgewerkt: 1 juni 2024
          </span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [faded, setFaded] = useState(false);

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
              <h2 className={`text-orange-500 uppercase font-bold tracking-widest text-xl transform transition-all duration-700 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>welkom bij HeKoS Kindervakantiewerk</h2>
              <h1 className={`text-5xl font-bold tracking-wider transform transition-all duration-800 delay-100 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>De leukste vakantie activiteit voor kinderen!</h1>
              <p className={`text-lg font-semibold line-clamp-6 transform transition-all duration-800 delay-200 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Al ruim 55 jaar organiseert HeKoS Kindervakantiewerk elk jaar een leuke week vol activiteiten voor kinderen van de basisschool! Jaarlijks 5 dagen vol plezier in de laatste week van de zomervakantie.</p>
              <div className="flex gap-5 mx-auto">
                <Button variant="default" size="lg" className={`transform transition-all duration-800 delay-300 bg-orange-500 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  Schrijf uw kind in
                </Button>
                <Link href="#missie">
                  <Button variant="outline" size="lg" className={`transform transition-all duration-800 delay-400 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    Onze missie
                  </Button>
                </Link>
              </div>
            </div>
            <Image src="/hands_no_background.png" alt="Logo" width={250} height={250} className={`transform transition-all duration-800 delay-300 absolute -right-40 -top-48 ${faded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} />
          </div>
        </div>

      </section>
    </main>
  );
}

export function Sponsor() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 items-center justify-items-center">
      <Link href="https://cbwd.dev" target="_blank">
        <Image src="/cbwd.webp" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      </Link>
      <Link href="https://serverpunt.com" target="_blank">
        <Image src="/serverpunt.webp" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      </Link>
      <Image src="/blossem.png" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      <Image src="/ghevents.png" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      <Image src="/GianottenMutsaers.jpg" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      <Image src="/logokavavlam.png" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
      <Image src="/zomerlust.png" alt="Logo" width={200} height={200} className="max-w-full h-20 object-contain" />
    </div>
  )
}