#!/usr/bin/env node

/**
 * Generates TailwindCSS kitchen sink example components with literal class names
 * so the Tailwind compiler can see and compile them.
 *
 * Run: bun scripts/generate-tailwind-kitchen-sink.mjs
 * Hooked into: bun run dev, bun run build (runs before next)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const EXAMPLES_DIR = path.resolve("app/tailwindcss/examples");
const PAGE_PATH = path.resolve("app/tailwindcss/page.tsx");

mkdirSync(EXAMPLES_DIR, { recursive: true });

// ── Data ────────────────────────────────────────────────────────────────────

const sizeTypes = [
  "text",
  "size",
  "rounded",
  "block",
  "inline",
  "min-w",
  "w",
  "max-w",
  "min-h",
  "h",
  "max-h",
  "p",
  "m",
];

const spacingTypes = ["space-x", "space-y"];

const insetTypes = ["inset", "inset-x", "inset-y"];

const sizes = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2x",
  "2xl",
  "3x",
  "3xl",
  "4x",
  "4xl",
  "5x",
  "5xl",
  "6x",
  "6xl",
  "7x",
  "7xl",
  "8x",
  "8xl",
  "9x",
  "9xl",
];

const uiColors = [
  "primary-foreground",
  "primary-hover",
  "primary",
  "secondary-foreground",
  "secondary-hover",
  "secondary",
  "accent-foreground",
  "accent-hover",
  "accent",
  "success-foreground",
  "success-hover",
  "success",
  "destructive-foreground",
  "destructive-hover",
  "destructive",
  "background",
  "foreground",
  "border",
  "ring",
  "input",
  "card",
  "card-foreground",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "muted-foreground",
  "muted",
  "popover-foreground",
  "popover",
  "sidebar-accent-foreground",
  "sidebar-accent",
  "sidebar-border",
  "sidebar-foreground",
  "sidebar-primary-foreground",
  "sidebar-primary",
  "sidebar-ring",
  "sidebar",
];

const paletteColors = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
];

const paletteColorShades = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

const paletteGrays = [
  "text",
  "subtext-1",
  "subtext-0",
  "overlay-2",
  "overlay-1",
  "overlay-0",
  "surface-2",
  "surface-1",
  "surface-0",
  "base",
  "mantle",
  "crust",
];

const colorables = ["text", "bg", "border", "shadow"];

const aspects = [
  "video",
  "square",
  "golden",
  "retro",
  "portrait",
  "panorama",
  "imax",
];

// ── Generators ──────────────────────────────────────────────────────────────

function generateSizes() {
  const rows = [];
  for (const type of sizeTypes) {
    const cells = [];
    for (const size of sizes) {
      const cls = `${type}-${size}`;
      // max-w and max-h need full w/h to show the constraint
      let extra = "";
      if (type === "text") {
        extra = "";
      } else if (type === "max-w" || type === "max-h") {
        const full = type === "max-w" ? " w-full" : " h-full";
        extra = `${full} border border-border`;
      } else {
        extra = " border border-border";
      }
      cells.push(
        `              <div className="${cls}${extra}">\n                ${type} ${size}\n              </div>`,
      );
    }
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${type}</h3>\n            <div className="flex flex-row flex-wrap gap-2">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent("SizesExample", "sizes", rows.join("\n"));
}

function generateSpacing() {
  const rows = [];
  for (const type of spacingTypes) {
    const cells = [];
    const direction = type === "space-x" ? "flex" : "flex flex-col";
    for (const size of sizes) {
      const cls = `${type}-${size}`;
      cells.push(
        `              <div className="flex flex-col gap-1">\n                <span className="text-xs text-muted-foreground">${size}</span>\n                <div className="${direction} ${cls}">\n                  <div className="border border-border p-1 text-xs">${type}</div>\n                  <div className="border border-border p-1 text-xs">${size}</div>\n                </div>\n              </div>`,
      );
    }
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${type}</h3>\n            <div className="flex flex-row flex-wrap gap-4">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent("SpacingExample", "spacing", rows.join("\n"));
}

function generateInsets() {
  const rows = [];
  for (const type of insetTypes) {
    const cells = [];
    for (const size of sizes) {
      const cls = `${type}-${size}`;
      cells.push(
        `              <div className="relative border border-border" style={{ width: "6rem", height: "4rem" }}>\n                <div className="absolute ${cls} border border-primary bg-primary/10 text-[0.5rem] text-primary p-0.5">\n                  ${type} ${size}\n                </div>\n              </div>`,
      );
    }
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${type}</h3>\n            <div className="flex flex-row flex-wrap gap-4">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent("InsetsExample", "insets", rows.join("\n"));
}

function generateUIColors() {
  const rows = [];
  for (const colorable of colorables) {
    const cells = [];
    for (const color of uiColors) {
      const cls = `${colorable}-${color}`;
      let extra = "";
      if (colorable === "shadow") {
        extra = " shadow-xl min-w-24 min-h-8 p-1";
      } else if (colorable !== "text") {
        extra = " border border-border min-w-24 min-h-8 p-1";
      }
      cells.push(
        `              <div className="${cls}${extra} text-xs">\n                ${colorable} ${color}\n              </div>`,
      );
    }
    // shadow colorable parent gets *:shadow-md
    const parentExtra = colorable === "shadow" ? " *:shadow-md" : "";
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${colorable}</h3>\n            <div className="flex flex-row flex-wrap gap-2${parentExtra}">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent("UIColorsExample", "ui-colors", rows.join("\n"));
}

function generatePaletteColors() {
  const rows = [];
  for (const colorable of colorables) {
    const cells = [];
    for (const color of paletteColors) {
      const cls = `${colorable}-${color}`;
      let extra = "";
      if (colorable === "shadow") {
        extra = " shadow-xl min-w-20 min-h-8 p-1";
      } else if (colorable !== "text") {
        extra = " border border-border min-w-20 min-h-8 p-1";
      }
      cells.push(
        `              <div className="${cls}${extra} text-xs">\n                ${colorable} ${color}\n              </div>`,
      );
    }
    const parentExtra = colorable === "shadow" ? " *:shadow-md" : "";
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${colorable}</h3>\n            <div className="flex flex-row flex-wrap gap-2${parentExtra}">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent(
    "PaletteColorsExample",
    "palette-colors",
    rows.join("\n"),
  );
}

function generateGrays() {
  const rows = [];
  for (const colorable of colorables) {
    const cells = [];
    for (const gray of paletteGrays) {
      const cls = `${colorable}-${gray}`;
      let extra = "";
      if (colorable === "shadow") {
        extra = " shadow-xl min-w-20 min-h-8 p-1";
      } else if (colorable !== "text") {
        extra = " border border-border min-w-20 min-h-8 p-1";
      }
      cells.push(
        `              <div className="${cls}${extra} text-xs">\n                ${colorable} ${gray}\n              </div>`,
      );
    }
    const parentExtra = colorable === "shadow" ? " *:shadow-md" : "";
    rows.push(
      `          <div className="flex flex-col gap-2">\n            <h3>${colorable}</h3>\n            <div className="flex flex-row flex-wrap gap-2${parentExtra}">\n${cells.join("\n")}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent("GraysExample", "grays", rows.join("\n"));
}

function generatePaletteShades() {
  const rows = [];
  for (const colorable of colorables) {
    const colorRows = [];
    for (const color of paletteColors) {
      const cells = [];
      for (const shade of paletteColorShades) {
        const cls = `${colorable}-${color}-${shade}`;
        let extra = "";
        if (colorable === "shadow") {
          extra = " shadow-xl min-w-14 min-h-8 p-1";
        } else if (colorable !== "text") {
          extra = " border border-border min-w-14 min-h-8 p-1";
        }
        cells.push(
          `                  <div className="${cls}${extra} text-[0.6rem]">\n                    ${shade}\n                  </div>`,
        );
      }
      const parentExtra = colorable === "shadow" ? " *:shadow-md" : "";
      colorRows.push(
        `              <div className="flex flex-col gap-1">\n                <span className="text-muted-foreground">${color}</span>\n                <div className="flex flex-row flex-wrap gap-1${parentExtra}">\n${cells.join("\n")}\n                </div>\n              </div>`,
      );
    }
    rows.push(
      `          <div className="flex flex-col gap-3">\n            <h3>${colorable}</h3>\n${colorRows.join("\n")}\n          </div>`,
    );
  }

  return wrapComponent(
    "PaletteShadesExample",
    "palette-shades",
    rows.join("\n"),
  );
}

function generateAspects() {
  const cells = [];
  for (const aspect of aspects) {
    cells.push(
      `          <div className="w-32">\n            <div className="aspect-${aspect} border border-border flex items-center justify-center text-muted-foreground">\n              ${aspect}\n            </div>\n          </div>`,
    );
  }

  return wrapComponent(
    "AspectsExample",
    "aspects",
    `          <div className="flex flex-row flex-wrap gap-4">\n${cells.join("\n")}\n          </div>`,
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function wrapComponent(name, slug, body) {
  return {
    name,
    slug,
    code: `// Auto-generated by scripts/generate-tailwind-kitchen-sink.mjs
// Do not edit manually — changes will be overwritten.

export default function ${name}() {
  return (
    <div className="flex flex-col gap-6">
${body}
    </div>
  );
}
`,
  };
}

// ── Write files ─────────────────────────────────────────────────────────────

const sections = [
  { title: "Sizes", ...generateSizes() },
  { title: "Spacing", ...generateSpacing() },
  { title: "Insets", ...generateInsets() },
  { title: "UI Colors", ...generateUIColors() },
  { title: "Palette Colors", ...generatePaletteColors() },
  { title: "Grays", ...generateGrays() },
  { title: "Palette Color Shades", ...generatePaletteShades() },
  { title: "Aspects", ...generateAspects() },
];

// Write each example component
for (const section of sections) {
  const filePath = path.join(EXAMPLES_DIR, `${section.slug}.tsx`);
  writeFileSync(filePath, section.code, "utf8");
}

// Write the page
const imports = sections
  .map((s) => `import ${s.name} from "./examples/${s.slug}";`)
  .join("\n");

const sectionEntries = sections
  .map((s) => `  ["${s.title}", "${s.slug}", <${s.name} key="${s.slug}" />],`)
  .join("\n");

const page = `// Auto-generated by scripts/generate-tailwind-kitchen-sink.mjs
// Do not edit manually — changes will be overwritten.

import Layout from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar } from "@/components/ui/layout/sidebar";
${imports}

type SectionsType = Array<[string, string, React.ReactNode]>;

const sections: SectionsType = [
${sectionEntries}
];

function SectionHeader({ index }: { index: number }) {
  const [title, id] = sections[index];

  return (
    <h2 className="text-lg font-bold">
      <span id={\`\${id}-title\`}>{title}</span>
      {index < sections.length - 1 && (
        <a href={\`#\${sections[index + 1][1]}\`} className="sr-nav-link">
          Skip to {sections[index + 1][0]}
        </a>
      )}
      {index > 0 && (
        <a href={\`#\${sections[index - 1][1]}\`} className="sr-nav-link">
          Back to {sections[index - 1][0]}
        </a>
      )}
    </h2>
  );
}

function Section({ index }: { index: number }) {
  const [title, id, content] = sections[index];

  return (
    <div
      className="flex flex-col gap-4 p-md w-full grow"
      id={id}
      aria-labelledby={\`\${id}-title\`}
      aria-description={\`\${title} Section\`}
    >
      <SectionHeader index={index} />
      {content}
    </div>
  );
}

function PageHeader() {
  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>TailwindCSS</Badge>
        <Badge variant="secondary">Kitchen Sink</Badge>
        <Badge variant="outline">Catpuccin latte/mocha</Badge>
      </div>
      <div className="space-y-2">
        <h1>Completely WCAG Compliant TailwindCSS Kitchen Sink</h1>
        <p>
          A dense reference page for every tailwindcss primitive in this repo,
          grouped by how you actually reach for them in product work.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
          <CardDescription>
            Each section uses only the local shadcn components in this codebase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <nav>
            <ul>
              {sections.map(([title, id]) => (
                <li key={id}>
                  <a href={\`#\${id}\`}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </header>
  );
}

export default function TailwindCSS() {
  return (
    <Layout variant="sidebar">
      <Sidebar sections={sections} />
      <div className="flex flex-col place-items-stretch place-content-stretch w-full *:p-md *:w-full *:grow">
        <PageHeader />
        <main className="space-y-10" id="main" role="main">
          {sections.map((_, index) => (
            <Section key={sections[index][1]} index={index} />
          ))}
        </main>
      </div>
    </Layout>
  );
}
`;

writeFileSync(PAGE_PATH, page, "utf8");

const totalClasses = sections.reduce((sum, s) => {
  const matches = s.code.match(/className="/g);
  return sum + (matches ? matches.length : 0);
}, 0);

console.log(
  `[generate-tailwind-kitchen-sink] Generated ${sections.length} examples (${totalClasses} literal classNames) → app/tailwindcss/`,
);
