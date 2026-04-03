"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
/*  Types & initial data                                               */
/* ------------------------------------------------------------------ */

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const initialItems: CartItem[] = [
  { id: "launch-toolkit-pro", name: "Launch Toolkit Pro", price: 49, quantity: 1 },
  { id: "campaign-templates", name: "Campaign Templates", price: 29, quantity: 2 },
  { id: "analytics-addon", name: "Analytics Add-on", price: 19, quantity: 1 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your Hustle&nbsp;Launch items before checkout.
          </p>
        </div>

        {items.length === 0 ? (
          /* ---- Empty state ---- */
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-16">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted text-2xl text-muted-foreground">
                0
              </div>
              <p className="text-sm font-medium">Your cart is empty</p>
              <p className="text-xs text-muted-foreground">
                Browse our products and add something to get started.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Continue shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* ---- Cart layout ---- */
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Cart items table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="icon-xs"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              &minus;
                            </Button>
                            <span className="w-6 text-center text-xs tabular-nums">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon-xs"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="tabular-nums">
                          {formatCurrency(item.price * item.quantity)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="xs"
                            className="text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Order summary */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="tabular-nums">{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">{formatCurrency(total)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to checkout</Link>
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/">Continue shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </Container>
    </Layout>
  );
}
