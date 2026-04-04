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
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

type View = "week" | "month" | "year" | "monthList";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

// ── Header ──

function DatePickerHeader({
  navDate,
  view,
  onViewChange,
  onPrev,
  onNext,
}: {
  navDate: Date;
  view: View;
  onViewChange: (v: View) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Button type="button" variant="ghost" size="xs" onClick={onPrev}>
        <CaretLeftIcon className="size-4" />
      </Button>
      <div className="flex items-center gap-1 text-sm font-medium">
        {view === "year" ? (
          <span>{navDate.getFullYear()}</span>
        ) : view === "monthList" ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => onViewChange("year")}
          >
            {navDate.getFullYear()}
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => onViewChange("monthList")}
            >
              {MONTH_NAMES[navDate.getMonth()]}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => onViewChange("year")}
            >
              {navDate.getFullYear()}
            </Button>
          </>
        )}
      </div>
      <Button type="button" variant="ghost" size="xs" onClick={onNext}>
        <CaretRightIcon className="size-4" />
      </Button>
    </div>
  );
}

// ── Week view ──

function WeekView({
  navDate,
  selectedDate,
  onSelect,
}: {
  navDate: Date;
  selectedDate: Date | undefined;
  onSelect: (d: Date) => void;
}) {
  const week = getWeekDates(navDate);
  const today = new Date();

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-muted-foreground py-1 text-center text-xs font-normal select-none"
          >
            {day}
          </div>
        ))}
        {week.map((d, i) => {
          const isToday = isSameDay(d, today);
          const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
          return (
            <Button
              key={i}
              type="button"
              variant={isSelected ? "default" : isToday ? "secondary" : "ghost"}
              size="icon"
              className="aspect-square"
              onClick={() => onSelect(d)}
            >
              {d.getDate()}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// ── Month list view ──

function MonthListView({
  navDate,
  onSelect,
}: {
  navDate: Date;
  onSelect: (month: number) => void;
}) {
  const today = new Date();
  const year = navDate.getFullYear();

  return (
    <div className="grid grid-cols-3 gap-2">
      {MONTH_NAMES_SHORT.map((month, i) => {
        const isCurrentMonth =
          i === today.getMonth() && year === today.getFullYear();
        return (
          <Button
            key={month}
            type="button"
            variant={isCurrentMonth ? "secondary" : "outline"}
            size="sm"
            className="w-full"
            onClick={() => onSelect(i)}
          >
            {month}
          </Button>
        );
      })}
    </div>
  );
}

// ── Year grid view ──

function YearGridView({
  navDate,
  onSelect,
}: {
  navDate: Date;
  onSelect: (year: number) => void;
}) {
  const currentYear = navDate.getFullYear();
  const startYear = currentYear - 5;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-2">
      {years.map((year) => {
        const isCurrentYear = year === today.getFullYear();
        const isSelected = year === currentYear;
        return (
          <Button
            key={year}
            type="button"
            variant={
              isSelected ? "default" : isCurrentYear ? "secondary" : "outline"
            }
            size="sm"
            className="w-full"
            onClick={() => onSelect(year)}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
}

// ── Main form ──

const formSchema = z.object({
  date: z.date({ error: "Select a date." }),
});

export default function DateInputExample() {
  const [view, setView] = React.useState<View>("week");
  const [navDate, setNavDate] = React.useState(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: undefined },
  });

  const selectedDate = useWatch({ control: form.control, name: "date" });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date, {
        shouldValidate: form.formState.isSubmitted,
      });
      setNavDate(date);
    }
  }

  function handlePrev() {
    const d = new Date(navDate);
    if (view === "week") {
      d.setDate(d.getDate() - 7);
    } else if (view === "month") {
      d.setMonth(d.getMonth() - 1);
    } else if (view === "monthList") {
      d.setFullYear(d.getFullYear() - 1);
    } else if (view === "year") {
      d.setFullYear(d.getFullYear() - 12);
    }
    setNavDate(d);
  }

  function handleNext() {
    const d = new Date(navDate);
    if (view === "week") {
      d.setDate(d.getDate() + 7);
    } else if (view === "month") {
      d.setMonth(d.getMonth() + 1);
    } else if (view === "monthList") {
      d.setFullYear(d.getFullYear() + 1);
    } else if (view === "year") {
      d.setFullYear(d.getFullYear() + 12);
    }
    setNavDate(d);
  }

  function handleMonthSelect(month: number) {
    const d = new Date(navDate);
    d.setMonth(month);
    setNavDate(d);
    setView("week");
  }

  function handleYearSelect(year: number) {
    const d = new Date(navDate);
    d.setFullYear(year);
    setNavDate(d);
    setView("monthList");
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Date confirmed", {
      description: data.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  const views: { label: string; value: View }[] = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <Button
              key={v.value}
              type="button"
              variant={view === v.value ? "default" : "outline"}
              size="xs"
              onClick={() => setView(v.value)}
            >
              {v.label}
            </Button>
          ))}
        </div>

        <Separator />

        <Controller
          name="date"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Date</FieldLabel>

              <DatePickerHeader
                navDate={navDate}
                view={view}
                onViewChange={setView}
                onPrev={handlePrev}
                onNext={handleNext}
              />

              {view === "week" && (
                <WeekView
                  navDate={navDate}
                  selectedDate={selectedDate}
                  onSelect={handleDateSelect}
                />
              )}

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

              {view === "monthList" && (
                <MonthListView
                  navDate={navDate}
                  onSelect={handleMonthSelect}
                />
              )}

              {view === "year" && (
                <YearGridView
                  navDate={navDate}
                  onSelect={handleYearSelect}
                />
              )}

              <FieldDescription>
                {selectedDate
                  ? `Selected: ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                  : "Pick a date from the calendar."}
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button type="submit">Confirm date</Button>
      </div>
    </Form>
  );
}
