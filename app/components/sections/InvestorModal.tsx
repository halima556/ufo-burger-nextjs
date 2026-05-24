"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorFormSchema, type InvestorFormData } from "@/app/lib/schemas";
import { StatusMessage } from "@/app/components/ui/FormFields";
import { buildLeadWhatsAppText, openWhatsApp } from "@/app/lib/utils";
import { useState } from "react";

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorModal({ isOpen, onClose }: InvestorModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ msg: string; type: "success" | "error" | "" }>({
    msg: "",
    type: "",
  });

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
    const text = buildLeadWhatsAppText({
      source: "Investor modal form",
      leadType: data.leadType,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
    });

    if (!openWhatsApp(text)) {
      setStatus({ msg: "WhatsApp contact is not configured yet.", type: "error" });
      return;
    }

    setStatus({ msg: "WhatsApp opened with your contact details.", type: "success" });
    reset();
    setTimeout(onClose, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="investor-modal" id="investor-modal">
      <div className="investor-modal__overlay" onClick={onClose} aria-hidden="true" />
      <section
        className="investor-modal__dialog panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="investor-modal-title"
      >
        <button
          className="investor-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          Close
        </button>

        <h2 id="investor-modal-title">Investor Contact</h2>
        <p className="section-subtitle">SEND YOUR DETAILS TO WHATSAPP</p>

        <form className="crew-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="investor-name">YOUR NAME</label>
          <input
            ref={firstInputRef}
            id="investor-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="field-error" role="alert">{errors.name.message}</p>
          )}

          <label htmlFor="investor-type">LEAD TYPE</label>
          <select
            id="investor-type"
            aria-invalid={!!errors.leadType}
            {...register("leadType")}
          >
            <option value="Investor">Investor</option>
            <option value="Partner">Partner</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
          {errors.leadType && (
            <p className="field-error" role="alert">{errors.leadType.message}</p>
          )}

          <label htmlFor="investor-email">EMAIL ADDRESS</label>
          <input
            id="investor-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error" role="alert">{errors.email.message}</p>
          )}

          <label htmlFor="investor-phone">PHONE / WHATSAPP</label>
          <input
            id="investor-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44..."
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="field-error" role="alert">{errors.phone.message}</p>
          )}

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
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send via WhatsApp"}
            </button>
          </div>

          <p className="form-note">
            Your details will be prepared in WhatsApp before sending.
          </p>

          <StatusMessage message={status.msg} type={status.type} />
        </form>
      </section>
    </div>
  );
}
