"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .max(50, "Project name must be at most 50 characters."),
  audience: z.string().min(1, "Select an audience."),
});

export default function FieldExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      audience: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Project settings saved", {
      description: `${data.projectName} targeting ${data.audience}`,
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Project settings</FieldLegend>
        <FieldDescription>
          Configure the project name and target audience.
        </FieldDescription>
        <FieldGroup>
          <Controller
            name="projectName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Project name</FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Hustle Launch"
                    autoComplete="off"
                  />
                </FieldContent>
                <FieldDescription>
                  Used in the browser title and the nav.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSeparator />
          <Controller
            name="audience"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Audience</FieldLabel>
                <FieldContent>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="founders" id="aud-founders" />
                      <Label htmlFor="aud-founders">Founders</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="marketers" id="aud-marketers" />
                      <Label htmlFor="aud-marketers">Marketers</Label>
                    </div>
                  </RadioGroup>
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" className="mt-4">Save settings</Button>
      </FieldSet>
    </Form>
  );
}
