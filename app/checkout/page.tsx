"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip: z.string().length(5, "ZIP code must be exactly 5 characters"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3}$/, "CVC must be exactly 3 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/* ------------------------------------------------------------------ */
/*  Static order data                                                  */
/* ------------------------------------------------------------------ */

const lineItems = [
  { name: "Launch Toolkit Pro", price: 49 },
  { name: "Campaign Templates (x2)", price: 58 },
  { name: "Analytics Add-on", price: 19 },
];

const subtotal = 126;
const shipping = 0;
const tax = 10.08;
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

export default function CheckoutPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = useCallback(
    async (data: CheckoutFormValues) => {
      void data;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Order placed successfully!");
      router.push("/order-complete");
    },
    [router],
  );

  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your Hustle&nbsp;Launch purchase.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* ---- Form ---- */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Field data-invalid={!!errors.email || undefined}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        {...field}
                      />
                      {errors.email && (
                        <FieldError>{errors.email.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Field data-invalid={!!errors.name || undefined}>
                      <FieldLabel htmlFor="name">Full name</FieldLabel>
                      <Input
                        id="name"
                        placeholder="Jane Doe"
                        aria-invalid={!!errors.name}
                        {...field}
                      />
                      {errors.name && (
                        <FieldError>{errors.name.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Field data-invalid={!!errors.address || undefined}>
                      <FieldLabel htmlFor="address">Address</FieldLabel>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        aria-invalid={!!errors.address}
                        {...field}
                      />
                      {errors.address && (
                        <FieldError>{errors.address.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Field data-invalid={!!errors.city || undefined}>
                        <FieldLabel htmlFor="city">City</FieldLabel>
                        <Input
                          id="city"
                          placeholder="San Francisco"
                          aria-invalid={!!errors.city}
                          {...field}
                        />
                        {errors.city && (
                          <FieldError>{errors.city.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <Field data-invalid={!!errors.zip || undefined}>
                        <FieldLabel htmlFor="zip">ZIP code</FieldLabel>
                        <Input
                          id="zip"
                          placeholder="94102"
                          aria-invalid={!!errors.zip}
                          {...field}
                        />
                        {errors.zip && (
                          <FieldError>{errors.zip.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <Field data-invalid={!!errors.cardNumber || undefined}>
                      <FieldLabel htmlFor="cardNumber">Card number</FieldLabel>
                      <Input
                        id="cardNumber"
                        placeholder="4242424242424242"
                        maxLength={16}
                        aria-invalid={!!errors.cardNumber}
                        {...field}
                      />
                      {errors.cardNumber && (
                        <FieldError>{errors.cardNumber.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    name="expiry"
                    control={control}
                    render={({ field }) => (
                      <Field data-invalid={!!errors.expiry || undefined}>
                        <FieldLabel htmlFor="expiry">Expiry date</FieldLabel>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                          aria-invalid={!!errors.expiry}
                          {...field}
                        />
                        {errors.expiry && (
                          <FieldError>{errors.expiry.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="cvc"
                    control={control}
                    render={({ field }) => (
                      <Field data-invalid={!!errors.cvc || undefined}>
                        <FieldLabel htmlFor="cvc">CVC</FieldLabel>
                        <Input
                          id="cvc"
                          placeholder="123"
                          maxLength={3}
                          aria-invalid={!!errors.cvc}
                          {...field}
                        />
                        {errors.cvc && (
                          <FieldError>{errors.cvc.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place order"}
            </Button>
          </form>

          {/* ---- Order summary sidebar ---- */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lineItems.map((item) => (
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
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Shipping</span>
                <span className="tabular-nums">
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </span>
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
          </Card>
        </div>
      </Container>
    </Layout>
  );
}
