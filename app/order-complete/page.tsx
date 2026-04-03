import Link from "next/link";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static order data                                                  */
/* ------------------------------------------------------------------ */

const orderNumber = "#HL-2026-0401";

const orderItems = [
  { name: "Launch Toolkit Pro", price: 49 },
  { name: "Campaign Templates (x2)", price: 58 },
  { name: "Analytics Add-on", price: 19 },
];

const total = 136.08;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OrderCompletePage() {
  return (
    <Layout variant="default">
      <Container className="py-lg">
        <div className="mx-auto flex max-w-[32rem] flex-col items-center gap-6 text-center">
          {/* Success icon */}
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full",
              "bg-emerald-500/10 text-emerald-500",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Order confirmed!
            </h1>
            <p className="text-sm text-muted-foreground">
              Thank you for your purchase. Your order{" "}
              <span className="font-medium text-foreground">{orderNumber}</span>{" "}
              has been placed successfully.
            </p>
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to your inbox with the full
              order details.
            </p>
          </div>

          {/* Order details card */}
          <Card className="w-full text-left">
            <CardHeader>
              <CardTitle>Order details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="tabular-nums">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/order-history">View order history</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
