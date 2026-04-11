import {
  // FacebookIcon,
  Heart,
  // InstagramIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";


const Footer = () => {
  return (

    <footer className="mt-10">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-6 sm:flex-row xl:px-0">
          <Link className="my-auto mx-auto flex  gap-2 items-center justify-center" href={"https://www.cbwd.dev"}>
            <span className="flex gap-2">Website ontwikkeld met <Heart className="text-red-500 fill-red-500" /> door </span>
            <Image src="/cbwd.webp" alt="Logo" className="my-auto" width={50} height={50} />
          </Link>

        </div>
        <Separator />
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            Kindervakantiewerk HeKoS. Alle rechten voorbehouden.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="https://www.facebook.com/kvwhekos" target="_blank">
              {/* <FacebookIcon className="h-5 w-5" /> */}
            </Link>
            <Link href="https://www.instagram.com/kvw_hekos/" target="_blank">
              {/* <InstagramIcon className="h-5 w-5" /> */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
