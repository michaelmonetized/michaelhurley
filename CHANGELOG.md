# Changelog

## Unreleased

- Added global **Accessibility assistant** live chat in the root layout, powered by the Vercel AI SDK streaming through **OpenRouter** (`OPENROUTER_API_KEY`, optional `OPENROUTER_MODEL`, optional `OPENROUTER_HTTP_REFERER`). The assistant discusses WCAG, ADA-minded engineering, and this PoC’s Tailwind, shadcn-style UI, and Catppuccin-inspired theming patterns.
- New `POST /api/chat` route and `.env.example` entries for OpenRouter configuration.
- Cleared ESLint warnings: removed unused imports on cart/checkout pages; replaced `form.watch()` with `useWatch` in form examples for React Compiler compatibility; dropped unused `Badge` imports in date examples.
- OpenRouter chat: use valid default `openrouter/free` (not `openrouter/openrouter/free`), probe candidate ids once per process with `generateText`, cache the first success, and use `openrouter.chat(id)` so requests hit `/chat/completions` (not OpenAI’s `/responses`, which OpenRouter rejects for chat).
- Accessibility assistant: expanded system prompt with markdown “Codebase patterns”; `localStorage` persistence for the transcript; per-bubble copy and retry (regenerate assistant / resend user after truncating tail); root `Toaster` for copy feedback.
- Global `Toaster` in root layout; removed duplicate `Toaster` from the components demo page.
