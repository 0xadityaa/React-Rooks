import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CpuIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import ThemeChangeToggle from "../ThemeChangeToggle";
import { cookies } from "next/headers";
import Image from "next/image";

export function Header() {
  const links = [
    {
      name: "React Rooks",
      href: "/",
      icon: () => (
        <Image src="/Icon.svg" width={50} height={50} alt="React Rooks Logo" />
      ),
    },
    {
      name: "Game",
      href: "/Ai",
    },
    {
      name: "Profile",
      href: "/profile",
    },
  ];

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <div className="sticky top-0 z-50 flex w-full flex-col">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 justify-between">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground font-mono text-md font-extrabold transition-colors hover:text-muted-foreground flex items-center order-first" // Move link with icon to the left
              >
                {LinkIcon && <LinkIcon />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* responsive mobile navigation */}
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                {links.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {LinkIcon && <LinkIcon />}
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ThemeChangeToggle />

          {/* implement auth button functionality here */}
          {token ? (
            <Link href={"/api/auth/signout"}>
              <LogOutIcon className="h-6 w-6" />
            </Link>
          ) : (
            <Link href={"/signin"}>
              <LogInIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
