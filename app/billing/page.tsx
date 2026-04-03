"use client";

import { useState } from "react";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const usageMeters = [
  { label: "Campaigns", used: 8, limit: 25 },
  { label: "Team members", used: 3, limit: 10 },
  { label: "API calls", used: 12_847, limit: 50_000 },
];

const invoices = [
  { date: "Mar 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Feb 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Jan 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Dec 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Nov 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Oct 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
];

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PlanFeature[];
  current?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    features: [
      { text: "3 campaigns", included: true },
      { text: "1 team member", included: true },
      { text: "1,000 API calls / mo", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: false },
      { text: "Custom branding", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Growth",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    current: true,
    features: [
      { text: "25 campaigns", included: true },
      { text: "10 team members", included: true },
      { text: "50,000 API calls / mo", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Scale",
    monthlyPrice: "$79",
    yearlyPrice: "$790",
    features: [
      { text: "Unlimited campaigns", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Unlimited API calls", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatNumber(n: number): string {
  return n.toLocaleString();
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your subscription, usage, and payment details for Hustle&nbsp;Launch.
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Current plan                                             */}
        {/* -------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Growth plan
              <Badge variant="secondary">Current</Badge>
            </CardTitle>
            <CardDescription>
              $29 / month &middot; Next billing date: April&nbsp;1,&nbsp;2026
            </CardDescription>
            <CardAction>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Change plan
                </Button>
                <Button variant="destructive" size="sm">
                  Cancel
                </Button>
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Billing cycle</span>
                <span className="font-medium">14 of 30 days</span>
              </div>
              <Progress value={Math.round((14 / 30) * 100)} />
            </div>
          </CardContent>
        </Card>

        {/* -------------------------------------------------------- */}
        {/*  Usage                                                    */}
        {/* -------------------------------------------------------- */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Usage this period</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {usageMeters.map((meter) => {
              const pct = Math.round((meter.used / meter.limit) * 100);
              return (
                <Card key={meter.label}>
                  <CardHeader>
                    <CardTitle>{meter.label}</CardTitle>
                    <CardDescription>
                      {formatNumber(meter.used)} of {formatNumber(meter.limit)} used
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={pct} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Payment method                                           */}
        {/* -------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
            <CardAction>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-16 items-center justify-center rounded border border-border bg-muted text-xs font-bold">
                VISA
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">
                  &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
                </p>
                <p className="text-xs text-muted-foreground">Expires 12/27</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                Visa
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* -------------------------------------------------------- */}
        {/*  Billing history                                          */}
        {/* -------------------------------------------------------- */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Billing history</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.date}>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>{inv.description}</TableCell>
                      <TableCell>{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{inv.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="xs">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* -------------------------------------------------------- */}
        {/*  Plan comparison                                          */}
        {/* -------------------------------------------------------- */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Compare plans</h2>

          <Tabs
            value={billingCycle}
            onValueChange={(v) => setBillingCycle(v as "monthly" | "yearly")}
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>

            {/* Both tabs render the same grid; price changes via state */}
            <TabsContent value="monthly">
              <PlanGrid plans={plans} cycle="monthly" />
            </TabsContent>
            <TabsContent value="yearly">
              <PlanGrid plans={plans} cycle="yearly" />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/*  Plan grid sub-component                                            */
/* ------------------------------------------------------------------ */

function PlanGrid({ plans, cycle }: { plans: Plan[]; cycle: "monthly" | "yearly" }) {
  return (
    <div className="grid gap-4 pt-4 sm:grid-cols-3">
      {plans.map((plan) => {
        const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
        const period = price === "Free" ? "" : cycle === "monthly" ? "/mo" : "/yr";

        return (
          <Card
            key={plan.name}
            className={cn(plan.current && "ring-2 ring-primary")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.current && <Badge>Current</Badge>}
              </CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-foreground">{price}</span>
                {period && <span className="text-muted-foreground">{period}</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-xs">
                    {f.included ? (
                      <span className="text-primary">&#10003;</span>
                    ) : (
                      <span className="text-muted-foreground/40">&mdash;</span>
                    )}
                    <span className={cn(!f.included && "text-muted-foreground/50")}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.current ? (
                <Button variant="secondary" className="w-full" disabled>
                  Current plan
                </Button>
              ) : (
                <Button
                  variant={plan.name === "Scale" ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.name === "Starter" ? "Downgrade" : "Upgrade"}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
