import OpenAI from "openai";

export const runtime = "edge";

const SYSTEM_PROMPT = `Ты дружелюбный консультант новогоднего магазина «Ёлки.Shop».
Помогаешь подобрать ёлку: спрашиваешь про высоту потолков, бюджет, наличие детей и животных, предпочтения по аромату.
В ассортименте: Сосна обыкновенная (от 1 490 ₽, 1.2–1.8 м), Ель датская (от 3 290 ₽, 1.5–2.2 м, не осыпается), Ель голубая (от 4 590 ₽, 1.3–2.0 м, серебристо-голубая хвоя), Пихта Нордмана (от 5 890 ₽, 1.6–2.5 м, мягкая хвоя, не колется).
Отвечай тепло, по-русски, коротко и по делу. Используй умеренно праздничный тон.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "Ключ OPENAI_API_KEY не настроен. Добавь его в Project Settings → Environment Variables на Vercel.",
      },
      { status: 500 },
    );
  }

  let messages: ChatMessage[] = [];
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  } catch {
    return Response.json({ error: "Невалидное тело запроса" }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const message = completion.choices[0]?.message?.content?.trim() ?? "";
    return Response.json({ message });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Неизвестная ошибка OpenAI";
    return Response.json({ error: msg }, { status: 500 });
  }
}
