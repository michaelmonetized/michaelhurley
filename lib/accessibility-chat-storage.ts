import type { UIMessage } from "ai";

export const ACCESSIBILITY_CHAT_STORAGE_KEY =
  "accessibility-chat:layout-accessibility-chat";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function parseTextParts(
  parts: unknown
): UIMessage["parts"] | null {
  if (!Array.isArray(parts)) return null;
  const out: UIMessage["parts"] = [];
  for (const p of parts) {
    if (!isRecord(p) || p.type !== "text" || typeof p.text !== "string") {
      continue;
    }
    const textPart: { type: "text"; text: string; state?: "streaming" | "done" } =
      { type: "text", text: p.text };
    if (p.state === "streaming" || p.state === "done") {
      textPart.state = p.state;
    }
    out.push(textPart);
  }
  return out.length ? out : null;
}

/** Normalize messages for persistence (no in-flight streaming state). */
export function stripStreamingForStorage(messages: UIMessage[]): UIMessage[] {
  return messages.map((m) => ({
    ...m,
    parts: m.parts.map((p) => {
      if (p.type === "text" && p.state === "streaming") {
        return { type: "text" as const, text: p.text, state: "done" as const };
      }
      return p;
    }),
  }));
}

export function parseStoredMessages(raw: string | null): UIMessage[] | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return null;
    const out: UIMessage[] = [];
    for (const item of data) {
      if (!isRecord(item)) continue;
      if (item.role !== "user" && item.role !== "assistant") continue;
      if (typeof item.id !== "string") continue;
      const parts = parseTextParts(item.parts);
      if (!parts) continue;
      out.push({ id: item.id, role: item.role, parts });
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

export function loadAccessibilityChatFromStorage(): UIMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredMessages(localStorage.getItem(ACCESSIBILITY_CHAT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveAccessibilityChatToStorage(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload = stripStreamingForStorage(messages);
    localStorage.setItem(ACCESSIBILITY_CHAT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // QuotaExceededError or private mode — ignore
  }
}

export function clearAccessibilityChatStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACCESSIBILITY_CHAT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
