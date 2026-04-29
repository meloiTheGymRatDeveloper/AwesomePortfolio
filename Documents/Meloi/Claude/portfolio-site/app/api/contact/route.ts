import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown, max = 5000): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, projectType, message } = payload;

  if (!isNonEmptyString(name, 200)) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (!isNonEmptyString(message)) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 400 }
    );
  }

  const projectTypeStr = typeof projectType === "string" ? projectType : "";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO ?? "hello@example.com";
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[contact] New submission (no RESEND_API_KEY set):", {
      name,
      email,
      projectType: projectTypeStr,
      message,
    });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const subject = projectTypeStr
      ? `New inquiry from ${name} - ${projectTypeStr}`
      : `New inquiry from ${name}`;

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectTypeStr || "-"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Could not send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error. Please try again later." },
      { status: 500 }
    );
  }
}
