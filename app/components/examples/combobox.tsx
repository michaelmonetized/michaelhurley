"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const allItems = [
  { value: "button", label: "Button" },
  { value: "dialog", label: "Dialog" },
  { value: "sheet", label: "Sheet" },
  { value: "tooltip", label: "Tooltip" },
  { value: "card", label: "Card" },
  { value: "badge", label: "Badge" },
  { value: "alert", label: "Alert" },
  { value: "tabs", label: "Tabs" },
];

const itemSchema = z.object({ value: z.string(), label: z.string() });

const formSchema = z.object({
  components: z.array(itemSchema).min(2, "Pick at least 2 components."),
});

export default function ComboboxExample() {
  const anchor = useComboboxAnchor();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { components: [] },
  });

  const selected = useWatch({ control: form.control, name: "components" });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Components selected", {
      description: data.components.map((c) => c.label).join(", "),
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Field data-invalid={!!form.formState.errors.components}>
          <FieldLabel>Components</FieldLabel>
          <Combobox
            multiple
            items={allItems}
            value={selected}
            onValueChange={(val) => {
              form.setValue(
                "components",
                val as z.infer<typeof formSchema>["components"],
                {
                  shouldValidate: form.formState.isSubmitted,
                },
              );
            }}
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.value}
          >
            <ComboboxChips ref={anchor}>
              {selected.map((chip) => (
                <ComboboxChip key={chip.value}>{chip.label}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Search components..." />
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>All components selected.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxLabel>UI Components</ComboboxLabel>
                  <ComboboxCollection>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Choose which components to include in the export bundle.
          </FieldDescription>
          {form.formState.errors.components && (
            <FieldError errors={[form.formState.errors.components]} />
          )}
        </Field>
        <Button type="submit">Export bundle</Button>
      </div>
    </Form>
  );
}
