This is a [Next.js](https://nextjs.org) app using a repo-scoped local HTTPS hostname for development.

## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

This does a little more than plain `next dev`:

- computes a stable local hostname from the repo name
- writes a per-project Caddy snippet
- reloads Caddy
- starts Next on an internal high port

For this repo, the dev URL is:

```text
https://test-create-next-app.localhost
```

You can inspect the derived host and port with:

```bash
bun run dev:info
```

## Local Dev Requirements

- `caddy` must be installed and running from `~/.local/etc/Caddyfile`
- the top-level Caddyfile must include:

```caddyfile
import ~/.local/etc/caddy/dev-sites/*.caddy
```

- this repo expects Next dev requests to come from the repo-scoped hostname above, not `localhost:3000`

## Why

Using a unique `.localhost` hostname avoids dev-origin issues with Next HMR and keeps local HTTPS/dev-origin behavior compatible with auth providers like Clerk.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
