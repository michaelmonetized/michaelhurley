"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowClockwiseIcon, CopySimpleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  loadMichaelHurleyChatFromStorage,
  saveMichaelHurleyChatToStorage,
} from "@/lib/michael-hurley-chat-storage";

const CHAT_ID = "michael-hurley-profile-assistant";

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome-michael",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi — I'm Michael's AI assistant. Ask me anything about his background in business operations, technology, management, or software engineering. What would you like to know?",
      },
    ],
  },
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text",
    )
    .map((part) => part.text)
    .join("");
}

async function copyMessageText(text: string) {
  if (!text.trim()) {
    toast.error("Nothing to copy yet.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch {
    toast.error("Could not copy");
  }
}

function MessageBubble({
  message,
  busy,
  onRetry,
}: {
  message: UIMessage;
  busy: boolean;
  onRetry: () => void | Promise<void>;
}) {
  const isAssistant = message.role === "assistant";
  const content = getMessageText(message);
  const isStreaming =
    isAssistant &&
    message.parts.some((p) => p.type === "text" && p.state === "streaming");
  const canRetry = !busy && !isStreaming && content.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isAssistant ? "items-start" : "items-end",
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2",
          isAssistant ? "flex-row" : "flex-row-reverse",
        )}
      >
        <Avatar size="sm">
          <AvatarFallback
            className={cn(
              "text-[10px] font-bold",
              isAssistant
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
            aria-hidden
          >
            {isAssistant ? "MH" : "You"}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            "max-w-[min(100%,18rem)] rounded-none px-3 py-2 text-xs leading-relaxed",
            isAssistant
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          <p className="whitespace-pre-wrap wrap-break-word">{content}</p>
          {busy && (
            <p className="whitespace-pre-wrap wrap-break-word">
              <span className="flex gap-2">
                <span className="block animate-bounce">&bull;</span>
                <span className="block animate-bounce delay-75">&bull;</span>
                <span className="block animate-bounce delay-150">&bull;</span>
              </span>
            </p>
          )}
          {isStreaming ? (
            <p className="whitespace-pre-wrap wrap-break-word">
              <span className="sr-only">Assistant is still typing.</span>
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "flex gap-1",
          isAssistant ? "ml-8" : "mr-8 flex-row-reverse",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label={
            isAssistant ? "Copy assistant message" : "Copy your message"
          }
          disabled={!content.trim()}
          onClick={() => void copyMessageText(content)}
        >
          <CopySimpleIcon className="size-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label={
            isAssistant ? "Regenerate assistant reply" : "Resend this message"
          }
          disabled={!canRetry}
          onClick={() => void onRetry()}
        >
          <ArrowClockwiseIcon className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

export default function LiveChat({
  className,
  apiConfigured = true,
}: {
  className?: string;
  apiConfigured?: boolean;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [storageReady, setStorageReady] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const {
    messages,
    sendMessage,
    setMessages,
    regenerate,
    status,
    error,
    stop,
  } = useChat({
    id: CHAT_ID,
    transport,
    messages: INITIAL_MESSAGES,
  });

  React.useEffect(() => {
    const stored = loadMichaelHurleyChatFromStorage();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
    setStorageReady(true);
  }, [setMessages]);

  React.useEffect(() => {
    if (!storageReady) return;
    const t = window.setTimeout(() => {
      saveMichaelHurleyChatToStorage(messages);
    }, 300);
    return () => window.clearTimeout(t);
  }, [messages, storageReady]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const busy = status === "submitted" || status === "streaming";

  const handleRetry = React.useCallback(
    async (message: UIMessage) => {
      if (message.role === "assistant") {
        try {
          await regenerate({ messageId: message.id });
        } catch {
          toast.error("Could not regenerate reply");
        }
        return;
      }

      const idx = messages.findIndex((m) => m.id === message.id);
      if (idx < 0) return;
      const text = getMessageText(message);
      if (!text.trim()) return;

      const prior = messages.slice(0, idx);
      setMessages(prior);
      try {
        await sendMessage({ text });
      } catch {
        setMessages(messages);
        toast.error("Could not resend message");
      }
    },
    [messages, regenerate, sendMessage, setMessages],
  );

  const canSend = apiConfigured && !busy && inputValue.trim().length > 0;

  return (
    <div className={cn("fixed right-6 bottom-6 z-[10000]", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            size="icon-lg"
            className="size-12 rounded-full shadow-lg"
            aria-label="Open Michael Hurley profile assistant chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton
          className="flex flex-col sm:max-w-[24rem] z-[10001]"
        >
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full bg-emerald-500"
                aria-hidden
              />
              Profile assistant
            </SheetTitle>
            <SheetDescription>
              Powered by OpenRouter. Ask about Michael Hurley&apos;s background,
              career, and skills. History is saved on this device.
            </SheetDescription>
            {!apiConfigured ? (
              <p className="text-xs text-destructive" role="status">
                Chat is offline: set{" "}
                <span className="font-mono">OPENROUTER_API_KEY</span> (and
                optionally <span className="font-mono">OPENROUTER_MODEL</span>)
                in <span className="font-mono">.env.local</span>, then restart
                dev.
              </p>
            ) : null}
          </SheetHeader>

          <div
            role="log"
            aria-label="Chat messages"
            aria-relevant="additions"
            className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                busy={busy}
                onRetry={() => handleRetry(msg)}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {error ? (
            <p className="px-4 text-xs text-destructive" role="alert">
              {error.message}
            </p>
          ) : null}

          <div className="border-t p-4">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                const text = inputValue.trim();
                if (!text || !apiConfigured || busy) return;
                setInputValue("");
                try {
                  await sendMessage({ text });
                } catch {
                  setInputValue(text);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  name="profile-chat-message"
                  placeholder={
                    apiConfigured
                      ? "Ask me anything…"
                      : "Configure OpenRouter to enable chat"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                  disabled={!apiConfigured || busy}
                  autoComplete="off"
                  aria-label="Message to profile assistant"
                />
                {busy ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => stop()}
                    aria-label="Stop generating"
                  >
                    Stop
                  </Button>
                ) : null}
                <Button type="submit" disabled={!canSend} aria-busy={busy}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
