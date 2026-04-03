import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: "⚡",
    name: "Launch Accelerator",
    description:
      "Go from napkin sketch to live product in under a week. We handle hosting, CI/CD, and domain setup.",
    href: "/services/accelerator",
  },
  {
    icon: "🎯",
    name: "Growth Strategy",
    description:
      "Data-driven growth playbooks, A/B testing, and funnel optimization — tailored to your market.",
    href: "/services/growth",
  },
  {
    icon: "🔧",
    name: "Custom Integrations",
    description:
      "Need a bespoke Stripe flow or a webhook pipeline? Our team builds it and hands it off.",
    href: "/services/integrations",
  },
  {
    icon: "📞",
    name: "Founder Office Hours",
    description:
      "Weekly 1-on-1 sessions with our team. Get advice on pricing, positioning, and product-market fit.",
    href: "/services/office-hours",
  },
]

export default function ServiceGrid({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto w-full max-w-5xl px-6 py-20 md:py-28", className)}>
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2 className="font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
          Services that move the needle
        </h2>
        <p className="max-w-[28rem] text-sm text-muted-foreground">
          Beyond the platform. Hands-on services to help you launch with confidence.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.name}
            href={service.href}
            className="group flex flex-col gap-4 rounded-none border border-border bg-card p-6 ring-1 ring-foreground/5 transition-colors hover:bg-muted/50"
          >
            <span className="text-3xl" role="img" aria-label={service.name}>
              {service.icon}
            </span>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-heading text-sm font-bold text-foreground">
                {service.name}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>

            <span className="mt-auto inline-flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Explore
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
