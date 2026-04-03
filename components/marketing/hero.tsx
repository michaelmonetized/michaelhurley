"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  variant?: "centered" | "split" | "minimal"
  className?: string
}

function HeroCentered() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-32 lg:py-40">
      <Badge variant="secondary" className="font-mono text-[11px] tracking-wide uppercase">
        Now in Public Beta
      </Badge>

      <div className="flex max-w-[48rem] flex-col items-center gap-4">
        <h1 className="font-heading text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Ship your startup
          <br />
          <span className="text-primary">before the hype dies</span>
        </h1>

        <p className="max-w-[36rem] text-base text-muted-foreground md:text-lg">
          Hustle Launch gives founders the toolkit to validate, build, and ship products in weeks
          — not months. Landing pages, waitlists, analytics, and payments out of the box.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/signup">Start for free</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/demo">See it in action</Link>
        </Button>
      </div>

      <p className="font-mono text-xs text-muted-foreground/60">
        No credit card required &middot; Free tier forever
      </p>
    </section>
  )
}

function HeroSplit() {
  return (
    <section className="grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:gap-20 lg:py-36">
      <div className="flex flex-col gap-6">
        <Badge variant="outline" className="w-fit font-mono text-[11px] tracking-wide uppercase">
          Launch toolkit for founders
        </Badge>

        <h1 className="font-heading text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
          From zero to launched in record time
        </h1>

        <p className="max-w-[28rem] text-sm text-muted-foreground md:text-base">
          Stop duct-taping tools together. Hustle Launch is the single platform that takes you
          from idea validation to revenue — with everything wired up from day one.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/pricing">View pricing &rarr;</Link>
          </Button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full rounded-none border border-border bg-gradient-to-br from-primary/10 via-background to-muted p-8 ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">Dashboard</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-500">
                <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-none border border-border/50 bg-background/50 p-4">
                <span className="font-mono text-[11px] uppercase text-muted-foreground">MRR</span>
                <span className="font-heading text-2xl font-black text-foreground">$4,280</span>
                <span className="font-mono text-[11px] text-emerald-500">+12.3%</span>
              </div>
              <div className="flex flex-col gap-1 rounded-none border border-border/50 bg-background/50 p-4">
                <span className="font-mono text-[11px] uppercase text-muted-foreground">Users</span>
                <span className="font-heading text-2xl font-black text-foreground">1,847</span>
                <span className="font-mono text-[11px] text-emerald-500">+8.1%</span>
              </div>
              <div className="flex flex-col gap-1 rounded-none border border-border/50 bg-background/50 p-4">
                <span className="font-mono text-[11px] uppercase text-muted-foreground">Signups</span>
                <span className="font-heading text-2xl font-black text-foreground">342</span>
                <span className="font-mono text-[11px] text-emerald-500">+24.7%</span>
              </div>
              <div className="flex flex-col gap-1 rounded-none border border-border/50 bg-background/50 p-4">
                <span className="font-mono text-[11px] uppercase text-muted-foreground">Churn</span>
                <span className="font-heading text-2xl font-black text-foreground">2.1%</span>
                <span className="font-mono text-[11px] text-emerald-500">-0.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroMinimal() {
  return (
    <section className="flex items-center justify-center px-6 py-16 md:py-20">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <h1 className="font-heading text-lg font-black tracking-tight text-foreground md:text-xl">
          Launch faster with Hustle Launch.
        </h1>
        <Button size="default" asChild>
          <Link href="/signup">Get early access</Link>
        </Button>
      </div>
    </section>
  )
}

export default function Hero({ variant = "centered", className }: HeroProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl", className)}>
      {variant === "centered" && <HeroCentered />}
      {variant === "split" && <HeroSplit />}
      {variant === "minimal" && <HeroMinimal />}
    </div>
  )
}
