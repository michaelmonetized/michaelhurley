/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "@/components/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { menuImages } from "@/components/michaelhurley/data";
import { WaveText, Wordmark } from "@/components/michaelhurley/shared";

export const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Timeline", href: "/#timeline" },
  { label: "On the Clock", href: "/on-the-clock" },
  { label: "Off the Clock", href: "/off-the-clock" },
  { label: "Calendar", href: "/calendar" },
] as const;

export function SiteNav() {
  return (
    <section
      id="navbar"
      className="p-2x fixed top-0 inset-inline-0 w-full flex justify-between items-center"
    >
      <div id="logo" className="animate-fadeInUp" style={{ "--fade-delay": "250ms" } as React.CSSProperties}>
        <Link href="/" aria-label="Jump to home">
          <Wordmark />
        </Link>
      </div>

      <div id="menu">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="menu-trigger relative animate-fadeInUp"
              style={{ "--fade-delay": "500ms" } as React.CSSProperties}
              aria-label="Open site navigation"
            >
              <span className="menu-icon h-8x w-8x flex flex-col gap-xl p-xl border-foreground border-4 rounded-xl place-content-center block">
                <hr />
                <hr />
              </span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton
            className="!max-w-none !w-svw !h-svh !top-0 !right-0 !left-0 !bottom-0 !border-0 p-4x bg-crust flex gap-4x place-items-center place-content-center"
          >
            <nav
              id="sheet-menu"
              className="w-full h-full flex gap-4x place-items-center place-content-center"
            >
              <div className="flex flex-wrap w-1/3">
                {menuImages.map((image) => (
                  <div key={image.src} className="w-1/2 p-xl">
                    <img src={image.src} alt={image.alt} className={image.className} />
                  </div>
                ))}
              </div>

              <ul className="w-2/3 text-center uppercase p-xl">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <WaveText text={link.label} className="text-7xl" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-xl py-4x text-center text-sm border-t border-border mt-auto">
      <p>Michael Hurley builds for growth, clarity, and momentum.</p>
      <p>
        <a href="https://github.com/michaelmonetized" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        •{" "}
        <a href="https://www.hurleyus.com/" target="_blank" rel="noreferrer">
          HurleyUS
        </a>{" "}
        •{" "}
        <a href="https://www.hustlelaunch.com/" target="_blank" rel="noreferrer">
          Hustle Launch
        </a>
      </p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh">
      <SiteNav />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
