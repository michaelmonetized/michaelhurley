"use client";

import { cn } from "@/lib/utils";

const logos = [
  "Stripe",
  "Vercel",
  "Clerk",
  "Convex",
  "PostHog",
  "Sentry",
  "Resend",
];

function LogoItem({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center px-8 font-heading text-lg font-black tracking-tight text-muted-foreground/40 transition-colors hover:text-muted-foreground/70 md:px-12 md:text-xl">
      {name}
    </span>
  );
}

export default function LogoCarousel({ className }: { className?: string }) {
  return (
    <section className={cn("w-full py-12", className)}>
      <p className="mb-6 text-center font-mono uppercase tracking-widest text-muted-foreground/50">
        Trusted by teams shipping with
      </p>

      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[scroll_20s_linear_infinite]">
          {/* Duplicate the list to create a seamless loop */}
          {logos.map((name) => (
            <LogoItem key={`a-${name}`} name={name} />
          ))}
          {logos.map((name) => (
            <LogoItem key={`b-${name}`} name={name} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
