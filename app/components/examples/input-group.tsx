"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  hostname: z
    .string()
    .min(4, "Hostname must be at least 4 characters.")
    .regex(/^[a-z0-9.-]+$/, "Only lowercase letters, numbers, dots, and hyphens."),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(280, "Message must be under 280 characters."),
});

export default function InputGroupExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { hostname: "", message: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Saved", {
      description: `https://${data.hostname}`,
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <Controller
          name="hostname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Domain</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="portfolio.hustlelaunch.com"
                  autoComplete="off"
                />
              </InputGroup>
              <FieldDescription>
                Your custom domain for the project.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Welcome message</FieldLabel>
              <InputGroup className="w-full">
                <InputGroupTextarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Welcome to our site..."
                  autoComplete="off"
                />
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button type="submit">Save domain</Button>
      </div>
    </Form>
  );
}
