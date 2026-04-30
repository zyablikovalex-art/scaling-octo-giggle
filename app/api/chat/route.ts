import { createGroq } from "@ai-sdk/groq";
import { streamText, type CoreMessage } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Ты дружелюбный консультант новогоднего магазина «Ёлки.Shop».
Помогаешь подобрать ёлку: спрашиваешь про высоту потолков, бюджет, наличие детей и животных, предпочтения по аромату.
В ассортименте: Сосна обыкновенная (от 1 490 ₽, 1.2–1.8 м), Ель датская (от 3 290 ₽, 1.5–2.2 м, не осыпается), Ель голубая (от 4 590 ₽, 1.3–2.0 м, серебристо-голубая хвоя), Пихта Нордмана (от 5 890 ₽, 1.6–2.5 м, мягкая хвоя, не колется).
Отвечай тепло, по-русски, коротко и по делу. Используй умеренно праздничный тон.`;

export async function POST(req: Request) {
  if (!process.env.GROQ_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Переменная окружения GROQ_KEY не настроена. Добавь её в Project Settings → Environment Variables на Vercel.",
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }

  let messages: CoreMessage[] = [];
  try {
    const body = (await req.json()) as { messages?: CoreMessage[] };
    messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  } catch {
    return new Response(
      JSON.stringify({ error: "Невалидное тело запроса" }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const groq = createGroq({ apiKey: process.env.GROQ_KEY });

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.7,
    maxTokens: 600,
  });

  return result.toDataStreamResponse();
}
