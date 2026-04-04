"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  type UIMessage,
} from "ai";
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

const CHAT_ID = "layout-accessibility-chat";

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome-accessibility",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi — I’m your accessibility guide for this proof-of-concept. Ask about WCAG-minded patterns, keyboard and focus, semantic HTML, ARIA, contrast and color tokens, reduced motion, or how Tailwind, shadcn-style UI, and Catppuccin-inspired theming show up here. What would you like to explore?",
      },
    ],
  },
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text"
    )
    .map((part) => part.text)
    .join("");
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isAssistant = message.role === "assistant";
  const content = getMessageText(message);
  const isStreaming =
    isAssistant &&
    message.parts.some(
      (p) => p.type === "text" && p.state === "streaming"
    );

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Avatar size="sm">
        <AvatarFallback
          className={cn(
            "text-[10px] font-bold",
            isAssistant
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
          aria-hidden
        >
          {isAssistant ? "A11y" : "You"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[75%] rounded-none px-3 py-2 text-xs leading-relaxed",
          isAssistant
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {isStreaming ? (
          <span className="sr-only">Assistant is still typing.</span>
        ) : null}
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    []
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    id: CHAT_ID,
    transport,
    messages: INITIAL_MESSAGES,
  });

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const busy = status === "submitted" || status === "streaming";
  const canSend =
    apiConfigured && !busy && inputValue.trim().length > 0;

  return (
    <div className={cn("fixed right-6 bottom-6 z-50", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            size="icon-lg"
            className="size-12 rounded-full shadow-lg"
            aria-label="Open accessibility assistant chat"
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
          className="flex flex-col sm:max-w-[24rem]"
        >
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full bg-emerald-500"
                aria-hidden
              />
              Accessibility assistant
            </SheetTitle>
            <SheetDescription>
              Powered by OpenRouter. Ask about WCAG, ADA-minded engineering, and
              this app&apos;s accessibility-oriented patterns.
            </SheetDescription>
            {!apiConfigured ? (
              <p
                className="text-xs text-destructive"
                role="status"
              >
                Chat is offline: set{" "}
                <span className="font-mono">OPENROUTER_API_KEY</span> (and
                optionally{" "}
                <span className="font-mono">OPENROUTER_MODEL</span>) in{" "}
                <span className="font-mono">.env.local</span>, then restart dev.
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
              <MessageBubble key={msg.id} message={msg} />
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
                  name="accessibility-chat-message"
                  placeholder={
                    apiConfigured
                      ? "Ask about accessibility and this PoC…"
                      : "Configure OpenRouter to enable chat"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                  disabled={!apiConfigured || busy}
                  autoComplete="off"
                  aria-label="Message to accessibility assistant"
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
                <Button
                  type="submit"
                  disabled={!canSend}
                  aria-busy={busy}
                >
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
