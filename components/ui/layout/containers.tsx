"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "aside";
}

/**
 * Base responsive container with max-width constraints
 * - Mobile: full width with padding
 * - Tablet (md): max 48rem
 * - Desktop (lg): max 72rem
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full p-md mx-auto",
        "md:max-w-[48rem]",
        "lg:max-w-6xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Narrow container for content-focused layouts (forms, articles, etc.)
 * - Mobile: full width with padding
 * - Tablet+: max 48rem
 */
export function NarrowContainer({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("w-full p-md mx-auto", "md:max-w-[48rem]", className)}>
      {children}
    </Component>
  );
}

/**
 * Wide container for dashboard/full layouts
 * - Mobile: full width with padding
 * - Desktop: max 90rem
 */
export function WideContainer({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("w-full p-md mx-auto", "lg:max-w-360", className)}>
      {children}
    </Component>
  );
}

interface FlexContainerProps extends ContainerProps {
  direction?: "row" | "col";
  gap?: "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
}

/**
 * Responsive flex container
 */
export function FlexContainer({
  children,
  className,
  as: Component = "div",
  direction = "col",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
}: FlexContainerProps) {
  const gapClasses = {
    sm: "gap-sm",
    md: "gap-md",
    lg: "gap-lg",
    xl: "gap-xl",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  return (
    <Component
      className={cn(
        "flex w-full p-md mx-auto",
        direction === "row" ? "flex-row" : "flex-col",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        "md:max-w-[48rem]",
        "lg:max-w-6xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}

interface GridContainerProps extends ContainerProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 6 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
}

/**
 * Responsive grid container
 */
export function GridContainer({
  children,
  className,
  as: Component = "div",
  cols = 1,
  mdCols,
  lgCols,
  gap = "md",
}: GridContainerProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    12: "grid-cols-12",
  };

  const mdColClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    6: "md:grid-cols-6",
    12: "md:grid-cols-12",
  };

  const lgColClasses = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    6: "lg:grid-cols-6",
    12: "lg:grid-cols-12",
  };

  const gapClasses = {
    sm: "gap-sm",
    md: "gap-md",
    lg: "gap-lg",
    xl: "gap-xl",
  };

  return (
    <Component
      className={cn(
        "grid w-full p-md mx-auto",
        colClasses[cols],
        mdCols && mdColClasses[mdCols],
        lgCols && lgColClasses[lgCols],
        gapClasses[gap],
        "md:max-w-[48rem]",
        "lg:max-w-6xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Section wrapper with consistent vertical spacing
 */
export function Section({ children, className }: ContainerProps) {
  return (
    <section className={cn("w-full py-lg", className)}>{children}</section>
  );
}
