import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";

import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from "./navbar";

const navigationLinks = [
    { text: "Home", href: "/" },
    { text: "Over ons", href: "/over-ons" },
    { text: "Sponsorpakketten", href: "/sponsorpakketten" },
    { text: "Gedragscode", href: "/gedragscode" },
    { text: "Contact", href: "/contact" },
];

export default function Navbar({ className }: { className?: string }) {
    return (
        <header className={cn("sticky top-0 z-50 px-4", className)}>
            <div className="absolute left-0 h-18 w-full bg-background/15 backdrop-blur-lg" />
            <div className="relative mx-auto max-w-container">
                <NavbarComponent>
                    <NavbarLeft>
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                            <Image src="/petje_groot.png" alt="KVW HeKoS" width={30} height={30} />
                            KVW HeKoS
                        </Link>
                        <nav className="ml-6 hidden items-center gap-4 md:flex">
                            {navigationLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                    </NavbarLeft>

                    <NavbarRight>
                        <Button asChild variant="outline" className="hidden md:inline-flex">
                            <Link href="/inschrijven/vrijwilliger">Vrijwilliger</Link>
                        </Button>
                        <Button asChild className="bg-orange-500">
                            <Link href="/inschrijven/kind">Kind inschrijven</Link>
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                                    <Menu className="size-5" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="grid gap-4 text-lg font-medium">
                                    <Link href="/" className="text-xl font-bold">
                                        KVW HeKoS
                                    </Link>
                                    {navigationLinks.map((link) => (
                                        <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                                            {link.text}
                                        </Link>
                                    ))}
                                    <div className="mt-4 grid gap-2">
                                        <Button asChild variant="outline">
                                            <Link href="/inschrijven/vrijwilliger">Inschrijven vrijwilliger</Link>
                                        </Button>
                                        <Button asChild className="bg-orange-500">
                                            <Link href="/inschrijven/kind">Inschrijven kind</Link>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </NavbarRight>
                </NavbarComponent>
            </div>
        </header>
    );
}
