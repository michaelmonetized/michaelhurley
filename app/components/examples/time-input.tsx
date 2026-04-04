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
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am–8pm

function formatHourLabel(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}

function formatTime24to12(time: string): string {
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const m = mStr;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m} ${period}`;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

const formSchema = z.object({
  time: z.string().min(1, "Select a time."),
});

export default function TimeInputExample() {
  const currentHour = new Date().getHours();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { time: "" },
  });

  const selectedTime = useWatch({ control: form.control, name: "time" });

  function handleSlotClick(hour: number, minutes: number) {
    const value = `${pad(hour)}:${pad(minutes)}`;
    form.setValue("time", value, {
      shouldValidate: form.formState.isSubmitted,
    });
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Time confirmed", {
      description: formatTime24to12(data.time),
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Controller
          name="time"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Select a time</FieldLabel>
              <div className="max-h-72 overflow-y-auto rounded-md border">
                {HOURS.map((h) => {
                  const isCurrentHour = h === currentHour;
                  const slot00 = `${pad(h)}:00`;
                  const slot30 = `${pad(h)}:30`;
                  const is00Selected = selectedTime === slot00;
                  const is30Selected = selectedTime === slot30;

                  return (
                    <div
                      key={h}
                      className={`flex items-center border-b last:border-b-0 ${
                        isCurrentHour ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="w-16 shrink-0 px-2 py-2 text-right text-xs font-medium text-muted-foreground">
                        {formatHourLabel(h)}
                      </div>
                      <div className="flex flex-1 gap-1 border-l px-2 py-1.5">
                        <Button
                          type="button"
                          variant={is00Selected ? "default" : "ghost"}
                          size="xs"
                          className="flex-1"
                          onClick={() => handleSlotClick(h, 0)}
                        >
                          :00
                        </Button>
                        <Button
                          type="button"
                          variant={is30Selected ? "default" : "ghost"}
                          size="xs"
                          className="flex-1"
                          onClick={() => handleSlotClick(h, 30)}
                        >
                          :30
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <FieldDescription>
                {selectedTime
                  ? `Selected: ${formatTime24to12(selectedTime)}`
                  : "Pick a 30-minute time slot."}
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button type="submit">Confirm time</Button>
      </div>
    </Form>
  );
}
