"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Loader2, Send, Sparkles, TreePine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GREETING =
  "Привет! Я Ёлкин — помогу выбрать дерево к Новому году. Расскажи, какая высота потолка и есть ли в доме маленькие дети?";

export function ChatPanel() {
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
  }, [messages, isLoading]);

  const lastMessage = messages[messages.length - 1];
  const showTyping = isLoading && lastMessage?.role === "user";

  return (
    <div
      role="region"
      aria-label="Чат с Ёлкиным помощником"
      className="flex h-[min(560px,80vh)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-border/50 bg-card/80 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <TreePine className="h-4 w-4" strokeWidth={1.75} />
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
  );
}
