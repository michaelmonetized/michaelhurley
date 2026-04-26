# michaelhurley

This repo is Michael Hurley's personal Next.js profile site, rebuilt from a CodePen prototype on top of the existing Tailwind v4 and App Router starter.

## Getting Started

Install dependencies:

```bash
bun install
```

Start the local dev server:

```bash
bun run dev
```

This does more than plain `next dev`:

- computes a stable hostname from the repo name
- writes a per-project Caddy snippet
- reloads Caddy, or starts it if the admin API is not already running
- starts Next on an internal high port

For this repo, the local URL is:

```text
https://michaelhurley.localhost
```

Inspect the derived host and port with:

```bash
bun run dev:info
```

## Tech Stack

- Runtime and package manager: Bun
- Framework: Next.js `16.2.1-canary.13` using the App Router
- UI: React `19.2.4`
- Language: TypeScript in `strict` mode
- Styling: Tailwind CSS `v4`, `tailwind-merge`, `clsx`, `tw-animate-css`
- Component layer: local `components/ui/*` primitives built around shadcn/ui, Base UI, Radix UI, and custom layout wrappers
- Forms and validation: `react-hook-form`, `zod`, `@hookform/resolvers`
- Charts and interaction helpers: `recharts`, `embla-carousel-react`, `react-day-picker`, `react-resizable-panels`, `sonner`
- Icons and theming: Phosphor Icons, `next-themes`, `next/font`
- AI integration: Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`) against OpenRouter
- HTML parsing for image prefetching: `linkedom`

## Architecture Style

This app is structured as a component-driven App Router monolith with a strong design-system flavor. The overall pattern is server-first rendering with explicit client islands only where interactivity is needed.

### Directory shape

- `app/`: route entry points, route handlers, metadata routes, and error boundaries
- `components/ui/`: reusable UI primitives and layout infrastructure
- `components/ui/layout/`: navigation, footer, shell, sidebar, and container helpers
- `components/marketing/`: landing-page sections and promotional components
- `components/accessibility/`: accessibility affordances and chat-related helpers
- `lib/`: small shared utilities and prompt/model helpers
- `scripts/`: local dev host bootstrapping and generated Tailwind showcase code

### Architectural notes

- `app/layout.tsx` is the shared root shell. It wires fonts, theme handling, accessibility helpers, live chat, tooltips, and toasts.
- Routes in `app/` default to server components. Pages that use hooks, local state, or browser APIs opt into `"use client"`.
- The UI layer is intentionally centralized in `components/ui/*` so product pages can compose primitives instead of restyling from scratch.
- Several pages are reference/demo surfaces rather than production flows. They document the component system and accessibility posture as much as they model an app.
- `app/tailwindcss/page.tsx` and `app/tailwindcss/examples/*` are generated from `scripts/generate-tailwind-kitchen-sink.mjs`. Edit the script, not the generated output.

## Code Standards

- Use Bun commands only. Do not switch the repo over to npm, pnpm, or yarn workflows.
- Treat this as canary-era Next.js. Before making framework-specific changes, read the relevant guide in `node_modules/next/dist/docs/`.
- Prefer server components by default. Add `"use client"` only when a component needs hooks, event handlers, or browser-only APIs.
- Reuse local primitives from `components/ui/*` and layout wrappers from `components/ui/layout/*` before introducing one-off patterns.
- Use absolute imports through the `@/*` alias instead of long relative import chains.
- Keep forms on the existing stack: `react-hook-form` plus `zod` validation.
- Shared class composition should go through `lib/utils.ts` via `cn(...)`.
- Treat generated files as generated. In particular, do not hand-edit `app/tailwindcss/page.tsx` or `app/tailwindcss/examples/*`.
- Use `bun tsc --watch` and `bun lint` for local verification.
- Before committing, run:

```bash
bun tsc && bun lint --fix --max-warnings 9999
```

- Do not use `bun run build` as the local verification step for this repo.

## Route Map

### Product and marketing pages

- `/`: marketing home page with hero sections, logo carousel, product grid, services, pricing, and CTAs
- `/dashboard`: sidebar-based SaaS dashboard mock with KPI cards, recent activity, and a chart placeholder
- `/profile`: profile view/edit flow using tabs, `react-hook-form`, and `zod`
- `/billing`: subscription management, usage meters, payment method, invoice history, and plan comparison
- `/cart`: editable cart with quantity controls and order summary
- `/checkout`: validated checkout form that submits to an in-memory success flow
- `/order-complete`: purchase confirmation screen with follow-up actions
- `/order-history`: table of historical orders and statuses
- `/knowledge-base`: searchable help-center layout with categories and popular articles
- `/privacy`: privacy policy page with custom metadata
- `/terms`: terms of service page with custom metadata

### Reference and design-system pages

- `/components`: large shadcn/ui kitchen sink organized by actions, navigation, forms, data display, overlays, and advanced widgets
- `/ui-kit`: higher-level application pattern gallery covering dashboards, shells, marketing, social, and feedback surfaces
- `/tailwindcss`: generated Tailwind utility showcase for spacing, sizes, colors, grays, shades, and aspect ratios
- `/elements`: WCAG-oriented HTML element kitchen sink and semantic reference page

### Framework and API surfaces

- `/api/chat`: streams accessibility chat responses through OpenRouter via the Vercel AI SDK
- `/api/prefetch-images/[...rest]`: fetches a local page, extracts `main img` elements, and returns image metadata as JSON
- `/robots.txt`: generated from `app/robots.ts`
- `/manifest.webmanifest`: generated from `app/manifest.ts`
- `app/not-found.tsx`, `app/error.tsx`, and `app/global-error.tsx`: route fallbacks and error boundaries

## Environment

- `OPENROUTER_API_KEY`: required to enable the live accessibility chat in the UI and `/api/chat`
- `OPENROUTER_HTTP_REFERER`: optional override for the referer header sent to OpenRouter

Without `OPENROUTER_API_KEY`, the chat route returns a `503` and the layout still renders without a working AI backend.

## Local Dev Requirements

- `caddy` must be installed
- `bun run dev` manages `~/.local/etc/Caddyfile` and `~/.local/etc/caddy/dev-sites/*.caddy` automatically
- if you maintain the top-level Caddyfile manually, the import must use the fully resolved home path, not `~`
- on the first local HTTPS startup, Caddy may prompt for your macOS password so it can finish local trust or privileged-port setup

- this repo expects dev traffic to arrive through the repo-scoped `.localhost` hostname above, not `localhost:3000`

## Notes

- The repo already contains generated showcase code and demo data. Not every route is wired to persistence or a real backend.
- The App Router uses React canary behavior internally. If framework behavior looks unfamiliar, prefer the local Next docs over older general knowledge.
