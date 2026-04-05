"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTASection({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");

  return (
    <section className={cn("w-full px-6 py-28", className)}>
      <div className="relative mx-auto max-w-4xl">
        {/* Gradient border wrapper */}
        <div className="rounded-none bg-linear-to-r from-primary via-primary/60 to-primary/20 p-px">
          <div className="flex flex-col items-center gap-6 rounded-none bg-background px-16 py-20 text-center">
            <h2 className="font-heading text-4xl font-black tracking-tight text-foreground">
              Ready to stop planning and start shipping?
            </h2>

            <p className="max-w-128 text-muted-foreground">
              Join 2,000+ founders who launched their products with Hustle
              Launch. Get early access — no credit card required.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex w-full max-w-112 flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="default">
                Get early access
              </Button>
            </form>

            <p className="font-mono text-muted-foreground/50">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
