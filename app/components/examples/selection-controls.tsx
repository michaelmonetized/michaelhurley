"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms.",
  }),
  enablePreviews: z.boolean(),
  mode: z.string().min(1, "Select a publish mode."),
});

export default function SelectionControlsExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptTerms: false,
      enablePreviews: true,
      mode: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Preferences saved", {
      description: `Mode: ${data.mode}, Previews: ${data.enablePreviews ? "on" : "off"}`,
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <Controller
              name="acceptTerms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms-check"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="terms-check">Accept terms</Label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="enablePreviews"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="switch-demo"
                  />
                  <Label htmlFor="switch-demo">Enable previews</Label>
                </div>
              )}
            />
          </div>
          <Controller
            name="mode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Publish mode</FieldLabel>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="live" id="mode-live" />
                    <Label htmlFor="mode-live">Live</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="draft" id="mode-draft" />
                    <Label htmlFor="mode-draft">Draft</Label>
                  </div>
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button type="submit">Save preferences</Button>
      </div>
    </Form>
  );
}
