"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface ChatMessage {
  id: string
  role: "bot" | "user"
  content: string
}

const presetMessages: ChatMessage[] = [
  {
    id: "1",
    role: "bot",
    content:
      "Hey there! 👋 Welcome to Hustle Launch. I'm here to help you get started or answer any questions. What can I help with?",
  },
  {
    id: "2",
    role: "user",
    content: "How quickly can I get a landing page live?",
  },
  {
    id: "3",
    role: "bot",
    content:
      "Most founders go from zero to published in under 10 minutes using our templates. You can connect a custom domain right away too. Want me to walk you through it?",
  },
]

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot"

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Avatar size="sm">
        <AvatarFallback
          className={cn(
            "text-[10px] font-bold",
            isBot ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          {isBot ? "HL" : "U"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[75%] rounded-none px-3 py-2 text-xs leading-relaxed",
          isBot
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

export default function LiveChat({ className }: { className?: string }) {
  const [inputValue, setInputValue] = React.useState("")

  return (
    <div className={cn("fixed right-6 bottom-6 z-50", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon-lg"
            className="size-12 rounded-full shadow-lg"
            aria-label="Open live chat"
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
              <span className="inline-block size-2 rounded-full bg-emerald-500" />
              Hustle Launch Support
            </SheetTitle>
            <p className="text-xs text-muted-foreground">
              Typically replies in under 2 minutes
            </p>
          </SheetHeader>

          {/* Messages area */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {presetMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>

          {/* Input area */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex items-center gap-2"
            >
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="default">
                Send
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
