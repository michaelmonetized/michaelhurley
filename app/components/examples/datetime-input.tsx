"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am–8pm

function getWeekDates(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

type DateView = "week" | "month" | "year";

const formSchema = z.object({
  date: z.date({ error: "Select a date and time." }),
});

export default function DatetimeInputExample() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [dateView, setDateView] = React.useState<DateView>("week");
  const [navDate, setNavDate] = React.useState(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: undefined },
  });

  const selectedDate = form.watch("date");

  function handleDateSelect(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    form.setValue("date", d, { shouldValidate: form.formState.isSubmitted });
    setNavDate(d);
    setStep(2);
  }

  function handleTimeSelect(h: number, m: number) {
    const current = form.getValues("date");
    if (!current) return;
    const d = new Date(current);
    d.setHours(h, m, 0, 0);
    form.setValue("date", d, { shouldValidate: form.formState.isSubmitted });
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Date and time confirmed", {
      description: data.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
        " at " +
        data.date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={step === 1 ? "default" : "outline"}
            size="xs"
            onClick={() => setStep(1)}
          >
            1. Date
          </Button>
          <span className="text-muted-foreground">/</span>
          <Button
            type="button"
            variant={step === 2 ? "default" : "outline"}
            size="xs"
            onClick={() => {
              if (selectedDate) setStep(2);
            }}
          >
            2. Time
          </Button>
        </div>

        <Separator />

        <Controller
          name="date"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Date and time</FieldLabel>

              {/* ── Step 1: Date selection ── */}
              {step === 1 && (
                <div className="space-y-3">
                  {/* View toggles: week, month, year */}
                  <div className="flex flex-wrap gap-1.5">
                    {(["week", "month", "year"] as DateView[]).map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant={dateView === v ? "default" : "outline"}
                        size="xs"
                        onClick={() => setDateView(v)}
                      >
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                      </Button>
                    ))}
                  </div>

                  {/* Week view */}
                  {dateView === "week" && (
                    <WeekDatePicker
                      navDate={navDate}
                      selectedDate={selectedDate}
                      onNavChange={setNavDate}
                      onSelect={handleDateSelect}
                    />
                  )}

                  {/* Month view */}
                  {dateView === "month" && (
                    <div>
                      <div className="mb-2 flex items-center justify-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => setDateView("year")}
                        >
                          {navDate.toLocaleDateString("en-US", { month: "long" })}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => setDateView("year")}
                        >
                          {navDate.getFullYear()}
                        </Button>
                      </div>
                      <Calendar
                        mode="single"
                        month={navDate}
                        onMonthChange={setNavDate}
                        selected={selectedDate}
                        onSelect={(d) => {
                          if (d) handleDateSelect(d);
                        }}
                        className="rounded-none border"
                      />
                    </div>
                  )}

                  {/* Year view */}
                  {dateView === "year" && (
                    <YearDatePicker
                      navDate={navDate}
                      onSelect={(d) => {
                        setNavDate(d);
                        setDateView("month");
                      }}
                    />
                  )}
                </div>
              )}

              {/* ── Step 2: Time selection (day view) ── */}
              {step === 2 && selectedDate && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                    >
                      &larr; Back to date
                    </Button>
                    <span className="text-sm font-medium">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="max-h-72 space-y-px overflow-y-auto border">
                    {HOURS.map((h) =>
                      [0, 30].map((m) => {
                        const isSelected =
                          selectedDate.getHours() === h &&
                          selectedDate.getMinutes() === m &&
                          (selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0 || (h === 0 && m === 0));
                        // Only highlight if time has actually been picked (not midnight default)
                        const hasTimePicked =
                          selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0;
                        const highlighted = hasTimePicked && isSelected;

                        return (
                          <Button
                            key={`${h}-${m}`}
                            type="button"
                            variant={highlighted ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start rounded-none border-b last:border-b-0"
                            onClick={() => handleTimeSelect(h, m)}
                          >
                            {formatTime(h, m)}
                          </Button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              <FieldDescription>
                {selectedDate
                  ? selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0
                    ? selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }) +
                      " at " +
                      selectedDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }) + " — select a time"
                  : "Pick a date, then choose a time."}
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button type="submit">Confirm date and time</Button>
      </div>
    </Form>
  );
}

// ── Week date picker ──

function WeekDatePicker({
  navDate,
  selectedDate,
  onNavChange,
  onSelect,
}: {
  navDate: Date;
  selectedDate: Date | undefined;
  onNavChange: (d: Date) => void;
  onSelect: (d: Date) => void;
}) {
  const week = getWeekDates(navDate);
  const today = new Date();

  function shift(weeks: number) {
    const d = new Date(navDate);
    d.setDate(d.getDate() + weeks * 7);
    onNavChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" type="button" onClick={() => shift(-1)}>
          &larr;
        </Button>
        <span className="text-sm font-medium">
          {week[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" – "}
          {week[6].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <Button variant="ghost" size="xs" type="button" onClick={() => shift(1)}>
          &rarr;
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {week.map((d, i) => {
          const isToday = isSameDay(d, today);
          const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;

          return (
            <Button
              key={i}
              type="button"
              variant={isSelected ? "default" : isToday ? "secondary" : "ghost"}
              size="sm"
              className="flex h-auto flex-col gap-0 px-1 py-2"
              onClick={() => onSelect(d)}
            >
              <span className="text-[0.65rem] uppercase">{DAYS[i]}</span>
              <span className="text-sm font-medium">{d.getDate()}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// ── Year date picker (12 month grid) ──

function YearDatePicker({
  navDate,
  onSelect,
}: {
  navDate: Date;
  onSelect: (d: Date) => void;
}) {
  const [year, setYear] = React.useState(navDate.getFullYear());
  const today = new Date();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" type="button" onClick={() => setYear((y) => y - 1)}>
          &larr;
        </Button>
        <span className="text-sm font-medium">{year}</span>
        <Button variant="ghost" size="xs" type="button" onClick={() => setYear((y) => y + 1)}>
          &rarr;
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, i) => {
          const isCurrentMonth =
            i === today.getMonth() && year === today.getFullYear();
          const isSelected =
            i === navDate.getMonth() && year === navDate.getFullYear();
          return (
            <Button
              key={month}
              type="button"
              variant={isSelected ? "default" : isCurrentMonth ? "secondary" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => onSelect(new Date(year, i, 1))}
            >
              {month}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
