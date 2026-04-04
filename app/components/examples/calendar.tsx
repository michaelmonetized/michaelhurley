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
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

type View = "day" | "week" | "month" | "year";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

// ── Day view ──

function DayView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const today = new Date();

  function shift(days: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    onDateChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => shift(-1)}>
          ←
        </Button>
        <span className="text-sm font-medium">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          {isSameDay(date, today) && (
            <Badge variant="secondary" className="ml-2">
              Today
            </Badge>
          )}
        </span>
        <Button variant="ghost" size="xs" onClick={() => shift(1)}>
          →
        </Button>
      </div>
      <div className="max-h-64 space-y-px overflow-y-auto border">
        {HOURS.map((h) => (
          <div
            key={h}
            className="flex items-center border-b last:border-b-0 hover:bg-muted/50"
          >
            <div className="w-14 shrink-0 px-2 py-2 text-right text-xs text-muted-foreground">
              {h > 12 ? h - 12 : h}
              {h >= 12 ? "pm" : "am"}
            </div>
            <div className="min-h-8 flex-1 border-l px-2 py-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Week view ──

function WeekView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const week = getWeekDates(date);
  const today = new Date();

  function shift(weeks: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + weeks * 7);
    onDateChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => shift(-1)}>
          ←
        </Button>
        <span className="text-sm font-medium">
          {week[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" – "}
          {week[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <Button variant="ghost" size="xs" onClick={() => shift(1)}>
          →
        </Button>
      </div>
      <div className="overflow-x-auto border">
        <div className="grid min-w-[28rem] grid-cols-[3.5rem_repeat(7,1fr)]">
          {/* Header */}
          <div className="border-b px-1 py-1.5" />
          {week.map((d, i) => (
            <div
              key={i}
              className={`border-b border-l px-1 py-1.5 text-center text-xs font-medium ${
                isSameDay(d, today)
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              <div>{DAYS[i]}</div>
              <div>{d.getDate()}</div>
            </div>
          ))}
          {/* Hour rows */}
          {HOURS.slice(0, 8).map((h) => (
            <React.Fragment key={h}>
              <div className="border-b px-1 py-1.5 text-right text-xs text-muted-foreground">
                {h > 12 ? h - 12 : h}
                {h >= 12 ? "p" : "a"}
              </div>
              {week.map((_, i) => (
                <div key={i} className="min-h-7 border-b border-l hover:bg-muted/50" />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Year view ──

function YearView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const [year, setYear] = React.useState(date.getFullYear());
  const today = new Date();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => setYear((y) => y - 1)}>
          ←
        </Button>
        <span className="text-sm font-medium">{year}</span>
        <Button variant="ghost" size="xs" onClick={() => setYear((y) => y + 1)}>
          →
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, i) => {
          const isCurrentMonth =
            i === today.getMonth() && year === today.getFullYear();
          const isSelected =
            i === date.getMonth() && year === date.getFullYear();
          return (
            <Button
              key={month}
              variant={isSelected ? "default" : isCurrentMonth ? "secondary" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => {
                const d = new Date(year, i, 1);
                onDateChange(d);
              }}
            >
              {month}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main example with form ──

const formSchema = z.object({
  date: z.date({ error: "Select a launch date." }),
});

export default function CalendarExample() {
  const [view, setView] = React.useState<View>("month");
  const [navDate, setNavDate] = React.useState(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: undefined },
  });

  const selectedDate = useWatch({ control: form.control, name: "date" });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date, { shouldValidate: form.formState.isSubmitted });
      setNavDate(date);
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Launch date set", {
      description: data.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  const views: View[] = ["day", "week", "month", "year"];

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <Button
              key={v}
              type="button"
              variant={view === v ? "default" : "outline"}
              size="xs"
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>

        <Separator />

        <Controller
          name="date"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Launch date</FieldLabel>

              {view === "month" && (
                <Calendar
                  mode="single"
                  month={navDate}
                  onMonthChange={setNavDate}
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-none border"
                />
              )}

              {view === "day" && (
                <DayView date={navDate} onDateChange={setNavDate} />
              )}

              {view === "week" && (
                <WeekView date={navDate} onDateChange={setNavDate} />
              )}

              {view === "year" && (
                <YearView date={navDate} onDateChange={(d) => {
                  setNavDate(d);
                  setView("month");
                }} />
              )}

              <FieldDescription>
                {selectedDate
                  ? `Selected: ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                  : "Choose when the campaign goes live."}
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button type="submit">Set launch date</Button>
      </div>
    </Form>
  );
}
