import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export type OpenRouterProvider = ReturnType<typeof createOpenAI>;

/** First successful id is cached for the lifetime of the Node process (per serverless instance). */
let cachedModelId: string | null = null;

/**
 * Build ordered model id candidates: comma-separated OPENROUTER_MODEL first, then known-good fallbacks.
 * OpenRouter’s “free router” is `openrouter/free` (not `openrouter/openrouter/free`).
 */
export function buildOpenRouterModelCandidates(): string[] {
  const fromEnv =
    process.env.OPENROUTER_MODEL?.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean) ??
    [];
  const fallbacks = [
    "openrouter/free",
    "xiaomi/mimo-v2-flash:free",
    "openrouter/auto",
    "meta-llama/llama-3.2-3b-instruct:free",
  ];
  return [...new Set([...fromEnv, ...fallbacks])];
}

/**
 * Picks the first model id that completes a tiny generateText call.
 * Logs failures with `[openrouter]` and the chosen id on success.
 */
export async function resolveOpenRouterModelId(
  openrouter: OpenRouterProvider
): Promise<string> {
  if (cachedModelId) {
    return cachedModelId;
  }

  const candidates = buildOpenRouterModelCandidates();

  for (const id of candidates) {
    try {
      await generateText({
        // OpenRouter expects Chat Completions (`/chat/completions`), not OpenAI Responses (`/responses`).
        model: openrouter.chat(id),
        prompt: ".",
        maxOutputTokens: 1,
      });
      console.info(`[openrouter] using model: ${id}`);
      cachedModelId = id;
      return id;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[openrouter] model failed (trying next): ${id} — ${msg}`);
    }
  }

  throw new Error(
    "No working OpenRouter model. Set OPENROUTER_MODEL to a valid id (see https://openrouter.ai/models). Hint: list free models with: curl -s https://openrouter.ai/api/v1/models | rg ':free'"
  );
}
