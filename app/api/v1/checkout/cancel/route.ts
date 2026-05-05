import { NextResponse } from "next/server";
import { checkAuth, sessionStore } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const session_id = new URL(req.url).searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json(
      { error: "session_id обязателен" },
      { status: 400 },
    );
  }

  const session = sessionStore.get(session_id);
  if (!session) {
    return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 });
  }

  session.cancelled = true;
  console.info("[YCP] checkout session cancelled", session_id);
  return NextResponse.json({});
}
