"use client";
import { ThemeProvider } from "next-themes";

export default function ColorScheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      storageKey="color-scheme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
