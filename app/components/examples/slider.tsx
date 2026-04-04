"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  range: z
    .array(z.number())
    .length(2)
    .refine(([min, max]) => min < max, "Min must be less than max."),
});

export default function SliderExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { range: [20, 70] },
  });

  const range = useWatch({ control: form.control, name: "range" });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Budget range saved", {
      description: `${data.range[0]}% to ${data.range[1]}%`,
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Controller
          name="range"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Budget allocation</FieldLabel>
              <Slider
                value={field.value}
                onValueChange={field.onChange}
                max={100}
                step={5}
              />
              <FieldDescription>
                Range: {range[0]}% to {range[1]}%
              </FieldDescription>
            </Field>
          )}
        />
        <Button type="submit">Save budget</Button>
      </div>
    </Form>
  );
}
