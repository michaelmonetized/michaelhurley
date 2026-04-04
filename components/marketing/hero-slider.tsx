"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const slides = [
  {
    headline: "Your launch toolkit, finally unified",
    subtitle:
      "Hustle Launch replaces your patchwork of SaaS tools with one platform built for speed. Waitlists, payments, analytics — all connected.",
    cta: { label: "Start building", href: "/signup" },
  },
  {
    headline: "Validate before you build",
    subtitle:
      "Spin up a landing page, capture emails, and measure demand in under ten minutes. Know what your audience wants before you write a line of code.",
    cta: { label: "Try it free", href: "/signup" },
  },
  {
    headline: "From first commit to first dollar",
    subtitle:
      "Stripe integration, usage-based billing, and customer dashboards come standard. Stop wiring plumbing and start shipping product.",
    cta: { label: "See pricing", href: "/pricing" },
  },
];

export default function HeroSlider({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-32",
        className,
      )}
    >
      <div className="relative h-55 w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-5 text-center transition-opacity duration-700 ease-in-out",
              index === activeIndex
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <h2 className="font-heading font-black tracking-tight text-foreground text-5xl">
              {slide.headline}
            </h2>

            <p className="max-w-2xl text-muted-foreground">{slide.subtitle}</p>

            <Button size="lg" asChild>
              <Link href={slide.cta.href}>{slide.cta.label}</Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}
