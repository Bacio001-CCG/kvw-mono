import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@workspace/ui/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "./navbar";
import Navigation from "./navigation";
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet";
import Image from "next/image";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
  className?: string;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <Image src="/petje_groot.png" alt="Logo" width={30} height={30} />,
  name = "KVW HeKoS",
  homeUrl = "/",
  mobileLinks = [
    // { text: "Getting Started", href: "https://www.launchuicomponents.com/" },
    // { text: "Components", href: "https://www.launchuicomponents.com/" },
    // { text: "Documentation", href: "https://www.launchuicomponents.com/" },
  ],
  actions = [
    {
      text: "Inschrijven",
      href: "/registreren",
      isButton: true,
      variant: "default",
      className: "bg-orange-500",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 px-4", className)}>
      <div className="fade-bottom bg-background/15 absolute  left-0 h-18 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            {actions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  asChild
                  className={action.className}
                >
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a
                  key={index}
                  href={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.text}
                </a>
              ),
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
