import type { Metadata } from "next";
import {
  Source_Sans_3,
  Source_Serif_4,
  Source_Code_Pro,
} from "next/font/google";
import "./globals.css";
import "../styles/max.css";
import "../styles/michaelhurley.css";
import ColorScheme from "@/components/color-scheme";
import Accessibility from "@/components/accessibility";
import LiveChat from "@/components/marketing/live-chat";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

const sourceMono = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Hurley",
  description:
    "Business operations, growth, design, and software development profile for Michael Hurley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSans.variable} ${sourceSerif.variable} ${sourceMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <ColorScheme>
          <Accessibility>
            {children}
            <LiveChat />
          </Accessibility>
        </ColorScheme>
      </body>
    </html>
  );
}
