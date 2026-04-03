"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  plan: z.enum(["starter", "growth", "scale", "custom"], {
    error: "Select a plan.",
  }),
  palette: z.enum(["slate", "stone", "zinc"], {
    error: "Select a color palette.",
  }),
});

export default function SelectExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: undefined,
      palette: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Configuration saved", {
      description: `Plan: ${data.plan}, Palette: ${data.palette}`,
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="plan"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Plan</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plans</SelectLabel>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="scale">Scale</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Enterprise</SelectLabel>
                      <SelectItem value="custom">Custom quote</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="palette"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Color palette</FieldLabel>
                <NativeSelect value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value)}>
                  <NativeSelectOption value="" disabled>
                    Select a palette
                  </NativeSelectOption>
                  <NativeSelectOptGroup label="Palettes">
                    <NativeSelectOption value="slate">Slate</NativeSelectOption>
                    <NativeSelectOption value="stone">Stone</NativeSelectOption>
                    <NativeSelectOption value="zinc">Zinc</NativeSelectOption>
                  </NativeSelectOptGroup>
                </NativeSelect>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button type="submit">Save configuration</Button>
      </div>
    </Form>
  );
}
