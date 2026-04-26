"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CaretLineUpIcon } from "@phosphor-icons/react";

export default function BackToTop() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Button
      asChild
      variant={"default"}
      size={"icon-lg"}
      className="rounded-md fixed z-9090 bottom-md right-md"
    >
      <a href="#top" title="Back to top">
        <span className="sr-only focus:not-sr-only">Back to top</span>
        <CaretLineUpIcon />
      </a>
    </Button>
  );
}
