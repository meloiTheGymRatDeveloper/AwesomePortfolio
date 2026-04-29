"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      (event.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8">
        <h3 className="text-lg font-semibold text-neutral-900">
          Message sent.
        </h3>
        <p className="mt-2 text-neutral-600">
          Thanks for reaching out — I&apos;ll reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="input"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input"
          />
        </Field>
      </div>

      <Field label="Project type" htmlFor="projectType">
        <select id="projectType" name="projectType" className="input">
          <option value="">Select one…</option>
          <option>Landing page</option>
          <option>Full website</option>
          <option>Web application</option>
          <option>Something else</option>
        </select>
      </Field>

      <Field label="Tell me about your project" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Goals, timeline, budget range, anything relevant."
          className="input resize-y"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} />
            Send message
          </>
        )}
      </button>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(229 229 229);
          background-color: white;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: rgb(23 23 23);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: rgb(23 23 23);
          box-shadow: 0 0 0 2px rgb(23 23 23 / 0.06);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-900">
        {label}
      </span>
      {children}
    </label>
  );
}
