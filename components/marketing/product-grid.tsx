import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

const features = [
  {
    icon: "🚀",
    title: "Instant Landing Pages",
    description:
      "Drag-and-drop builder with conversion-optimized templates. Go live in minutes, not days.",
    href: "/features/landing-pages",
  },
  {
    icon: "📧",
    title: "Waitlist & Email Capture",
    description:
      "Built-in waitlist management with referral tracking, automated drip sequences, and segmentation.",
    href: "/features/waitlist",
  },
  {
    icon: "💳",
    title: "Payments & Billing",
    description:
      "Stripe-powered subscriptions, one-time charges, and usage-based billing — zero custom code required.",
    href: "/features/payments",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Track signups, conversions, MRR, churn, and cohort retention from a single dashboard.",
    href: "/features/analytics",
  },
  {
    icon: "🔗",
    title: "Integrations Hub",
    description:
      "Connect to Slack, Discord, Zapier, and 40+ tools. Webhooks for everything else.",
    href: "/features/integrations",
  },
  {
    icon: "🛡️",
    title: "Auth & User Management",
    description:
      "Passwordless login, SSO, role-based access, and team invitations baked into every project.",
    href: "/features/auth",
  },
]

export default function ProductGrid({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-20 md:py-28", className)}>
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2 className="font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
          Everything you need to launch
        </h2>
        <p className="max-w-[32rem] text-sm text-muted-foreground">
          One platform, zero duct tape. Hustle Launch ships with every tool a founder needs
          to go from idea to revenue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="group transition-colors hover:bg-muted/30">
            <CardHeader>
              <span className="mb-1 text-2xl" role="img" aria-label={feature.title}>
                {feature.icon}
              </span>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href={feature.href}
                className="font-mono text-xs text-primary transition-colors hover:text-primary/80"
              >
                Learn more &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
