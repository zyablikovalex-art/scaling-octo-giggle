"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GREETING =
  "Привет! Я Ёлкин — помогу выбрать дерево к Новому году. Расскажи, какая высота потолка и есть ли в доме маленькие дети?";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      { id: "greeting", role: "assistant", content: GREETING },
    ],
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const lastMessage = messages[messages.length - 1];
  const showTyping = isLoading && lastMessage?.role === "user";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть чат" : "Открыть чат"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-amber-400 via-rose-500 to-rose-600 text-white",
          "shadow-[0_10px_40px_rgba(244,63,94,0.45)] ring-1 ring-white/20",
          "transition-all duration-200 hover:scale-105 active:scale-95",
        )}
      >
        <span
          className={cn(
            "absolute transition-all duration-200",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <MessageCircle className="h-6 w-6" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-200",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        >
          <X className="h-6 w-6" />
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-full bg-amber-400/40 blur-xl" />
      </button>

      <div
        role="dialog"
        aria-label="Чат с Ёлкиным помощником"
        aria-hidden={!open}
        className={cn(
          "fixed bottom-24 right-4 z-50 flex h-[min(560px,80vh)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl",
          "origin-bottom-right transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-border/50 bg-card/80 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_18px_rgba(16,185,129,0.45)]">
              🎄
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Ёлкин помощник
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" /> Llama 3.3 · Groq
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {showTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                печатает…
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
                Не получилось ответить: {error.message}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/50 p-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Спроси про ёлку…"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            aria-label="Отправить"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
