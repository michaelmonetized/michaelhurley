# Route Registry and Metadata System

## Summary

This proposal introduces a single route registry in [`project.ts`](/Users/michael/Projects/test-create-next-app/project.ts) that drives:

- app identity
- page-level metadata defaults
- sitemap inclusion
- robots rules
- route grouping conventions for the App Router

The goal is to stop scattering SEO and route intent across `page.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`, and one-off constants. The route registry becomes the authored source of truth, while filesystem routes remain the execution layer.

## Motivation

The current App Router setup encourages metadata to drift:

- app identity lives in `project.ts`
- page metadata is defined ad hoc inside route files
- `robots.ts`, `manifest.ts`, and `sitemap.ts` are easy to let drift out of sync
- there is no explicit distinction between public marketing pages, utility pages, conversion pages, and private pages

This proposal gives each route an explicit content and indexing policy.

## Goals

- Make `project.ts` the single source of truth for app identity and route intent.
- Allow route grouping by purpose: primary, secondary, utility, conversion, private.
- Generate consistent metadata defaults for every page.
- Keep branded search results cleaner by excluding low-value pages from sitemap and indexing by default.
- Make `manifest.ts`, `robots.ts`, and `sitemap.ts` derive from the same route data.
- Make route intent obvious to the developer opening the repo for the first time.

## Non-Goals

- This proposal does not generate route files from config.
- This proposal does not rewrite `project.ts` automatically during dev or build.
- This proposal does not replace auth protections for private routes.
- This proposal does not attempt to infer metadata from component content.

## Proposed Filesystem Layout

```text
app/
  (primary)/
    page.tsx
    pricing/
      page.tsx
      route.config.ts
  (secondary)/
    press/
      page.tsx
  (utility)/
    privacy/
      page.tsx
      route.config.ts
    terms/
      page.tsx
  (conversion)/
    thank-you/
      page.tsx
  (private)/
    dashboard/
      page.tsx
```

Notes:

- Route groups are organizational only; they do not affect URL paths.
- The route registry still explicitly stores each page path and policy.
- `route.config.ts` is preferred over `seo.ts` because the file is broader than SEO. It captures indexing and sitemap policy too.

## Proposed Data Model

The current [`project.ts`](/Users/michael/Projects/test-create-next-app/project.ts) should expand to include app identity plus a typed page registry.

```ts
type PageGroup =
  | "primary"
  | "secondary"
  | "utility"
  | "conversion"
  | "private";

type PageEntry = {
  path: `/${string}`;
  group: PageGroup;
  title: string;
  description?: string;
  image?: string;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  sitemap?: boolean;
  index?: boolean;
  follow?: boolean;
  disallow?: boolean;
};

type ProjectApp = {
  name: string;
  shortName?: string;
  description: string;
  url: string;
  locale?: string;
};
```

Recommended additions to `project.ts`:

```ts
const groupDefaults = {
  primary: {
    priority: 0.8,
    sitemap: true,
    index: true,
    follow: true,
    disallow: false,
  },
  secondary: {
    priority: 0.5,
    sitemap: true,
    index: true,
    follow: true,
    disallow: false,
  },
  utility: {
    priority: 0.2,
    sitemap: false,
    index: false,
    follow: true,
    disallow: false,
  },
  conversion: {
    priority: 0.1,
    sitemap: false,
    index: false,
    follow: false,
    disallow: true,
  },
  private: {
    priority: 0,
    sitemap: false,
    index: false,
    follow: false,
    disallow: true,
  },
} as const;
```

And:

```ts
const pages = [
  {
    path: "/",
    group: "primary",
    title: "Home",
    description: "Modern web design and strategic marketing for emerging brands.",
  },
  {
    path: "/privacy",
    group: "utility",
    title: "Privacy Policy",
  },
  {
    path: "/terms",
    group: "utility",
    title: "Terms of Service",
  },
  {
    path: "/thank-you",
    group: "conversion",
    title: "Thank You",
  },
] satisfies PageEntry[];
```

## Why `utility` Instead of `nofollow`

`nofollow` is not a good route group name because it describes one metadata flag, not the full intent of the page.

These pages often share the same product intent:

- privacy
- terms
- accessibility
- cookies
- thank-you
- confirmation pages

What matters is not merely whether links should be followed, but:

- should the page be indexed
- should it be included in the sitemap
- should it be disallowed in `robots.txt`
- should it be considered a main public destination

For that reason:

- use `utility` for legal and support pages
- use `conversion` for ephemeral post-conversion pages
- use `private` for authenticated or internal pages

## Metadata Strategy

Each route may optionally export a local override object from `route.config.ts`.

Example:

```ts
// app/(utility)/privacy/route.config.ts
import type { Metadata } from "next";

export const routeConfig = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect personal information.",
} satisfies Partial<Metadata>;
```

The implementation should provide a helper that combines:

1. app-level defaults from `project.ts`
2. page entry defaults from the route registry
3. group defaults
4. route-local overrides from `route.config.ts`

Example helper:

```ts
import type { Metadata } from "next";

type BuildMetadataInput = {
  page: PageEntry;
  override?: Partial<Metadata>;
};

export function buildPageMetadata({
  page,
  override,
}: BuildMetadataInput): Metadata {
  const defaults = groupDefaults[page.group];

  return {
    title: page.title,
    description: page.description ?? project.app.description,
    metadataBase: new URL(project.app.url),
    openGraph: {
      title: page.title,
      description: page.description ?? project.app.description,
      url: page.path,
      siteName: project.app.name,
      images: page.image ? [{ url: page.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description ?? project.app.description,
      images: page.image ? [page.image] : undefined,
    },
    robots: {
      index: page.index ?? defaults.index,
      follow: page.follow ?? defaults.follow,
    },
    ...override,
  };
}
```

## `manifest.ts`

The web manifest should derive app identity from `project.ts`, not route files.

Example:

```ts
import type { MetadataRoute } from "next";
import { project } from "@/project";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: project.app.name,
    short_name: project.app.shortName ?? project.app.name,
    description: project.app.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d0f",
    theme_color: "#0b0d0f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
```

## `sitemap.ts`

The sitemap should only include pages that are explicitly allowed into the sitemap.

Example:

```ts
import type { MetadataRoute } from "next";
import { project } from "@/project";

export default function sitemap(): MetadataRoute.Sitemap {
  return project.pages
    .filter((page) => {
      const defaults = project.pageGroupDefaults[page.group];
      return page.sitemap ?? defaults.sitemap;
    })
    .map((page) => {
      const defaults = project.pageGroupDefaults[page.group];

      return {
        url: new URL(page.path, project.app.url).toString(),
        changeFrequency: page.changeFrequency ?? "monthly",
        priority: page.priority ?? defaults.priority,
      };
    });
}
```

## `robots.ts`

`robots.ts` should use the route registry for `disallow` rules, but page-level `index/follow` should still be expressed through metadata.

Example:

```ts
import type { MetadataRoute } from "next";
import { project } from "@/project";

export default function robots(): MetadataRoute.Robots {
  const disallow = project.pages
    .filter((page) => {
      const defaults = project.pageGroupDefaults[page.group];
      return page.disallow ?? defaults.disallow;
    })
    .map((page) => page.path);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: new URL("/sitemap.xml", project.app.url).toString(),
  };
}
```

## Validation Instead of Codegen

The registry should be authored by the developer and validated by tooling. Build and dev scripts should not rewrite `project.ts`.

Recommended validation checks:

- every public route in the registry exists on disk
- every route config path resolves to a real route
- every `private` route has `index: false` and `follow: false`
- every `conversion` route defaults to `sitemap: false`
- every `utility` route is intentionally classified rather than drifting into `primary`

Suggested script:

```text
scripts/validate-routes.mjs
```

This can run during `bun run build` and optionally during `bun run dev`.

## Proposed Helper Files

```text
lib/seo/build-page-metadata.ts
lib/seo/get-page-entry.ts
lib/seo/get-group-defaults.ts
scripts/validate-routes.mjs
types/project.ts
```

## Example Route Usage

Home page:

```ts
// app/(primary)/page.tsx
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { getPageEntry } from "@/lib/seo/get-page-entry";

const page = getPageEntry("/");

export const metadata = buildPageMetadata({ page });

export default function HomePage() {
  return <main>...</main>;
}
```

Privacy page with local override:

```ts
// app/(utility)/privacy/page.tsx
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { getPageEntry } from "@/lib/seo/get-page-entry";
import { routeConfig } from "./route.config";

const page = getPageEntry("/privacy");

export const metadata = buildPageMetadata({
  page,
  override: routeConfig,
});

export default function PrivacyPage() {
  return <main>...</main>;
}
```

## Migration Plan

### Phase 1: Introduce Registry

- Expand `project.ts` to include `app`, `pages`, and `pageGroupDefaults`.
- Keep existing routes where they are.
- Add helper functions for metadata lookup and metadata construction.

### Phase 2: Move Routes Into Groups

- Move route folders into `(primary)`, `(secondary)`, `(utility)`, `(conversion)`, and `(private)`.
- Preserve URL structure by relying on route groups.

### Phase 3: Derive Platform Files

- Update `manifest.ts` to derive from `project.app`.
- Add `sitemap.ts` and `robots.ts` derived from `project.pages`.

### Phase 4: Add Validation

- Add `scripts/validate-routes.mjs`.
- Fail builds when registry and filesystem drift.

## Tradeoffs

### Benefits

- One place to update app identity and route intent.
- Cleaner branded-search posture.
- Predictable sitemap and robots behavior.
- Metadata becomes systematic rather than improvised.

### Costs

- Slightly more ceremony for each new route.
- Requires discipline to keep route registry and filesystem aligned.
- A validation script is required to make the registry trustworthy.

## Recommendation

Implement this system with:

- route groups for filesystem organization
- `project.ts` as the route registry and app identity source
- `route.config.ts` for local per-route metadata overrides
- helper functions for metadata assembly
- validation scripts instead of automatic mutation during dev and build

That gives the repo a true single source of truth without creating a fragile code generation pipeline.
