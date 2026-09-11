import { NextRequest, NextResponse } from "next/server";
import type { ZodType } from "zod";
export async function handleForm(
  request: NextRequest,
  schema: ZodType,
  kind: "inquiry" | "newsletter",
) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const parsedOrigin = new URL(origin);
      if (
        !["http:", "https:"].includes(parsedOrigin.protocol) ||
        parsedOrigin.host !== request.headers.get("host")
      )
        return NextResponse.json(
          { error: "Please submit this form from the Aurelia website." },
          { status: 403 },
        );
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 415 });
  if (Number(request.headers.get("content-length")) > 12000)
    return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "We couldn’t read your enquiry. Please try again." },
      { status: 400 },
    );
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json(
      { error: "Please check the highlighted details.", fields },
      { status: 422 },
    );
  }
  const endpoint = process.env.AURELIA_FORMS_WEBHOOK;
  if (!endpoint)
    return NextResponse.json(
      { ok: true, demo: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("Invalid endpoint");
    const { website, ...data } = result.data as Record<string, unknown>;
    void website;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.AURELIA_FORMS_SECRET
          ? { Authorization: `Bearer ${process.env.AURELIA_FORMS_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ kind, data, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json(
      { ok: true, demo: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "We couldn’t deliver your enquiry. Please try again shortly." },
      { status: 503 },
    );
  }
}
