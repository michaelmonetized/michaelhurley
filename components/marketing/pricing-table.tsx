"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

type Interval = "monthly" | "yearly"

interface Tier {
  name: string
  description: string
  price: { monthly: string; yearly: string }
  interval: { monthly: string; yearly: string }
  popular: boolean
  cta: string
  href: string
  features: string[]
}

const tiers: Tier[] = [
  {
    name: "Starter",
    description: "For solo founders testing the waters.",
    price: { monthly: "$0", yearly: "$0" },
    interval: { monthly: "/mo", yearly: "/yr" },
    popular: false,
    cta: "Get started free",
    href: "/signup?plan=starter",
    features: [
      "1 project",
      "Landing page builder",
      "Up to 500 waitlist signups",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    name: "Growth",
    description: "For founders ready to scale.",
    price: { monthly: "$29", yearly: "$290" },
    interval: { monthly: "/mo", yearly: "/yr" },
    popular: true,
    cta: "Start 14-day trial",
    href: "/signup?plan=growth",
    features: [
      "Unlimited projects",
      "Custom domains",
      "Stripe payments integration",
      "Advanced analytics & funnels",
      "Email sequences",
      "Priority support",
      "Team members (up to 5)",
    ],
  },
  {
    name: "Scale",
    description: "For teams shipping at full speed.",
    price: { monthly: "$79", yearly: "$790" },
    interval: { monthly: "/mo", yearly: "/yr" },
    popular: false,
    cta: "Start 14-day trial",
    href: "/signup?plan=scale",
    features: [
      "Everything in Growth",
      "Unlimited team members",
      "SSO & role-based access",
      "Webhooks & API access",
      "White-label options",
      "Dedicated account manager",
      "99.9% uptime SLA",
    ],
  },
]

export default function PricingTable({ className }: { className?: string }) {
  const [interval, setInterval] = React.useState<Interval>("monthly")

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-20 md:py-28", className)}>
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[28rem] text-sm text-muted-foreground">
          Start free. Upgrade when you&apos;re ready. No surprises.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-1 rounded-none border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-none px-3 py-1 font-mono text-xs transition-colors",
              interval === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("yearly")}
            className={cn(
              "rounded-none px-3 py-1 font-mono text-xs transition-colors",
              interval === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="ml-1.5 text-[10px] text-emerald-500">Save 17%</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "relative flex flex-col transition-colors",
              tier.popular && "ring-2 ring-primary"
            )}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-4">
                <Badge variant="default" className="font-mono text-[10px] uppercase tracking-wider">
                  Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pb-0">
              <CardTitle className="text-core">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-black text-foreground">
                  {tier.price[interval]}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {tier.interval[interval]}
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-0.5 text-primary" aria-hidden="true">
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                variant={tier.popular ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
