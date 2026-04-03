"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MenuItem from "@/components/ui/layout/menu-item";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "@/components/link";
import { ListIcon } from "@phosphor-icons/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Logo from "@/components/logo";

export const pages = [
  {
    anchor: "Elements",
    href: "/elements/",
    title: "WCAG Compliant HTML5 Kitchen Sink",
  },
  {
    anchor: "TailwindCSS",
    href: "/tailwindcss/",
    title: "WCAG Compliant TailwindCSS Kitchen Sink",
  },
  {
    anchor: "Components",
    href: "/components/",
    title: "WCAG Compliant ShadCN Kitchen Sink",
  },
] as const;

export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {pages.map((page) => (
          <MenuItem
            key={page.anchor}
            anchor={page.anchor}
            href={page.href}
            className="m-0 p-sm rounded-md"
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger className="p-sm">
        <ListIcon />
      </SheetTrigger>
      <SheetContent className="p-0">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              {"Use the menu to easily find what you're looking for…"}
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <div className="flex flex-col gap-sm">
          <div className="p-sm self-center">
            <Link href="/" title="Hustle Launch is where the money is…">
              <Logo className="h-4xl w-auto" />
            </Link>
          </div>
          <div className="flex flex-col divide-y">
            {pages.map((page) => (
              <Link href={page.href} className="p-4" key={page.anchor}>
                {page.anchor}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
