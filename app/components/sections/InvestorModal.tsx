"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorFormSchema, type InvestorFormData } from "@/app/lib/schemas";
import { StatusMessage } from "@/app/components/ui/FormFields";
import { buildLeadWhatsAppText, openWhatsApp } from "@/app/lib/utils";
import { checkRateLimit, getRateLimitKey } from "@/app/lib/rateLimit";
import { isSuspiciousInput, sanitizeFormData } from "@/app/lib/sanitize";

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorModal({ isOpen, onClose }: InvestorModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{
    msg: string;
    type: "success" | "error" | "";
  }>({ msg: "", type: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvestorFormData>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: { leadType: "Investor" },
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      reset();
      setStatus({ msg: "", type: "" });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: InvestorFormData) => {
    const rlKey = getRateLimitKey("investor-form");
    const { allowed, remainingMs } = checkRateLimit(rlKey, 3, 60_000);
    if (!allowed) {
      const seconds = Math.ceil(remainingMs / 1000);
      setStatus({ msg: `Too many attempts. Please wait ${seconds} seconds.`, type: "error" });
      return;
    }

    const honeypot = (document.getElementById("investor-website") as HTMLInputElement)?.value;
    if (honeypot) return;

    const sanitized = sanitizeFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? "",
      message: data.message ?? "",
    });

    if (Object.values(sanitized).some(isSuspiciousInput)) {
      setStatus({ msg: "Invalid input detected.", type: "error" });
      return;
    }

    const text = buildLeadWhatsAppText({
      source: "Investor modal form",
      leadType: data.leadType,
      ...sanitized,
    });

    if (!openWhatsApp(text)) {
      setStatus({ msg: "WhatsApp contact is not configured yet.", type: "error" });
      return;
    }

    setStatus({ msg: "WhatsApp opened with your contact details.", type: "success" });
    reset();
    setTimeout(onClose, 500);
  };

  const { ref: registerRef, ...nameRegister } = register("name");

  if (!isOpen) return null;

  return (
    <div className="investor-modal" id="investor-modal">
      <div className="investor-modal__overlay" onClick={onClose} aria-hidden="true" />
      <section
        className="investor-modal__dialog panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="investor-modal-title"
        style={{ position: "relative", paddingTop: "3.5rem" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="modal-close-btn"
        >
          ✕
        </button>

        <h2 id="investor-modal-title">Investor Contact</h2>
        <p className="section-subtitle">SEND YOUR DETAILS TO WHATSAPP</p>

        <form className="crew-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            id="investor-website"
            name="investor-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <label htmlFor="investor-name">YOUR NAME</label>
          <input
            id="investor-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
            ref={(el) => {
              registerRef(el);
              (firstInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }}
            {...nameRegister}
          />
          {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}

          <label htmlFor="investor-type">LEAD TYPE</label>
          <select id="investor-type" aria-invalid={!!errors.leadType} {...register("leadType")}>
            <option value="Investor">Investor</option>
            <option value="Partner">Partner</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="investor-email">EMAIL ADDRESS</label>
          <input
            id="investor-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}

          <label htmlFor="investor-phone">PHONE / WHATSAPP</label>
          <input
            id="investor-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44..."
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <p className="field-error" role="alert">{errors.phone.message}</p>}

          <label htmlFor="investor-company">COMPANY (OPTIONAL)</label>
          <input
            id="investor-company"
            type="text"
            autoComplete="organization"
            placeholder="Your company name"
            {...register("company")}
          />

          <label htmlFor="investor-message">MESSAGE (OPTIONAL)</label>
          <textarea
            id="investor-message"
            rows={4}
            placeholder="Tell us what kind of partnership or investment you are looking for..."
            {...register("message")}
          />

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send via WhatsApp"}
            </button>
          </div>

          <p className="form-note">Your details will be prepared in WhatsApp before sending.</p>
          <StatusMessage message={status.msg} type={status.type} />
        </form>
      </section>
    </div>
  );
}
