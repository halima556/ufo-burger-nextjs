"use client";

import { type CSSProperties, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crewFormSchema, type CrewFormData } from "@/app/lib/schemas";
import { StatusMessage } from "@/app/components/ui/FormFields";
import { useWaitlist } from "@/app/hooks/useWaitlist";
import { buildLeadWhatsAppText, isEmailDuplicate, openWhatsApp } from "@/app/lib/utils";
import { checkRateLimit, getRateLimitKey } from "@/app/lib/rateLimit";
import { isSuspiciousInput, sanitizeFormData } from "@/app/lib/sanitize";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

export function CrewSection() {
  const { countLabel, addEntry } = useWaitlist();
  const [status, setStatus] = useState<{
    msg: string;
    type: "success" | "error" | "";
  }>({ msg: "", type: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CrewFormData>({
    resolver: zodResolver(crewFormSchema),
  });

  const onSubmit = async (data: CrewFormData) => {
    // Rate limiting
    const rlKey = getRateLimitKey("crew-form");
    const { allowed, remainingMs } = checkRateLimit(rlKey);
    if (!allowed) {
      const seconds = Math.ceil(remainingMs / 1000);
      setStatus({
        msg: `Too many attempts. Please wait ${seconds} seconds.`,
        type: "error",
      });
      return;
    }

    // Sanitize inputs
    const sanitized = sanitizeFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message ?? "",
    });

    // Check for suspicious input
    if (Object.values(sanitized).some(isSuspiciousInput)) {
      setStatus({ msg: "Invalid input detected.", type: "error" });
      return;
    }

    // Honeypot check
    const honeypot = (document.getElementById("website") as HTMLInputElement)?.value;
    if (honeypot) return;

    if (isEmailDuplicate(sanitized.email)) {
      setStatus({
        msg: "This email is already on the launch access list.",
        type: "error",
      });
      return;
    }

    const text = buildLeadWhatsAppText({
      source: "Crew waitlist form",
      leadType: "Customer",
      ...sanitized,
    });

    setStatus({ msg: "Opening WhatsApp...", type: "success" });

    if (!openWhatsApp(text)) {
      setStatus({
        msg: "WhatsApp contact is not configured yet.",
        type: "error",
      });
      return;
    }

    const ok = addEntry({
      name: sanitized.name,
      email: sanitized.email,
      leadType: "Customer",
      phone: sanitized.phone,
      message: sanitized.message,
      createdAt: new Date().toISOString(),
    });

    if (!ok) {
      setStatus({
        msg: "WhatsApp opened, but local save failed. Please submit again.",
        type: "error",
      });
      return;
    }

    setStatus({
      msg: `Thanks ${sanitized.name}! WhatsApp opened and your launch access is saved.`,
      type: "success",
    });
    reset();
  };

  return (
    <section id="crew" className="section">
      <div className="section-head">
        <p className="kicker">05</p>
        <h2>Join the waitlist</h2>
        <p className="section-subtitle">FIRST DROP. FIRST SIGNAL.</p>
      </div>

      <div className="grid two-col">
        <article className="panel reveal-item" style={delay("0.04s")}>
          <h3>Launch Access List</h3>
          <p>Get first access to launch day, menu drops, and limited offers.</p>
          <p className="crew-count" aria-live="polite">
            {countLabel}
          </p>
        </article>

        <form
          className="panel crew-form reveal-item"
          style={delay("0.09s")}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Honeypot field — hidden from users, visible to bots */}
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <label htmlFor="name">YOUR NAME</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
          <p className="field-error" role="alert">
              {errors.name.message}
            </p>
          )}

          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error" role="alert">
              {errors.email.message}
            </p>
          )}

          <label htmlFor="phone">PHONE / WHATSAPP</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44..."
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="field-error" role="alert">
              {errors.phone.message}
            </p>
          )}

          <label htmlFor="message">MESSAGE (OPTIONAL)</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about your favorite planet..."
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="field-error" role="alert">
              {errors.message.message}
            </p>
          )}

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Join the waitlist"}
            </button>
          </div>

          <p className="form-note">
            We will send your first launch signal and opening updates.
          </p>

          <StatusMessage message={status.msg} type={status.type} />
        </form>
      </div>
    </section>
  );
}
