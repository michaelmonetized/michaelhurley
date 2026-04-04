# Changelog

## Unreleased

- Added global **Accessibility assistant** live chat in the root layout, powered by the Vercel AI SDK streaming through **OpenRouter** (`OPENROUTER_API_KEY`, optional `OPENROUTER_MODEL`, optional `OPENROUTER_HTTP_REFERER`). The assistant discusses WCAG, ADA-minded engineering, and this PoC’s Tailwind, shadcn-style UI, and Catppuccin-inspired theming patterns.
- New `POST /api/chat` route and `.env.example` entries for OpenRouter configuration.
