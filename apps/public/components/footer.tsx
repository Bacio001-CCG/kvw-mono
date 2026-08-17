import { FacebookIcon, Heart, InstagramIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";

import SponsorStrip from "@/components/site/sponsor-strip";

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 xl:px-0">
        {/* <SponsorStrip title="Onze sponsoren" /> */}
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-0 py-6 sm:flex-row">
          <Link className="my-auto mx-auto flex gap-2 items-center justify-center" href="https://www.cbwd.dev">
            <span className="flex gap-2">Website ontwikkeld met <Heart className="text-red-500 fill-red-500" /> door </span>
            <Image src="/cbwd.webp" alt="Logo" className="my-auto" width={50} height={50} />
          </Link>
        </div>
        <Separator />
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 py-8 sm:flex-row">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Kindervakantiewerk HeKoS. Alle rechten voorbehouden.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="https://www.facebook.com/kvwhekos" target="_blank" aria-label="Facebook">
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/kvw_hekos/" target="_blank" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
