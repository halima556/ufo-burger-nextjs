"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { InputField, StatusMessage, TextareaField } from "@/app/components/ui/FormFields";
import {
  buildLeadWhatsAppText,
  openWhatsApp,
  validateEmail,
  validateLeadType,
  validatePhone,
} from "@/app/lib/utils";

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      setStatus({ msg: "", type: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const leadType = String(fd.get("leadType") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim().toLowerCase();
    const phone = String(fd.get("phone") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (name.length < 2) {
      setStatus({ msg: "Please enter a valid name (at least 2 characters).", type: "error" });
      return;
    }
    if (!validateEmail(email)) {
      setStatus({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (!validateLeadType(leadType)) {
      setStatus({ msg: "Please select a valid lead type.", type: "error" });
      return;
    }
    if (!validatePhone(phone)) {
      setStatus({ msg: "Please enter a valid phone/WhatsApp number.", type: "error" });
      return;
    }

    const text = buildLeadWhatsAppText({
      source: "Investor modal form",
      leadType,
      name,
      email,
      phone,
      company,
      message,
    });

    if (!openWhatsApp(text)) {
      setStatus({ msg: "WhatsApp contact is not configured yet.", type: "error" });
      return;
    }

    setStatus({ msg: "WhatsApp opened with your contact details.", type: "success" });
    (e.target as HTMLFormElement).reset();
    setTimeout(onClose, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="investor-modal" id="investor-modal">
      <div
        className="investor-modal__overlay"
        onClick={onClose}
        aria-hidden="true"
      />
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

        <form className="crew-form" onSubmit={handleSubmit}>
          <InputField
            ref={firstInputRef}
            label="YOUR NAME"
            id="investor-name"
            name="name"
            type="text"
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="investor-type">LEAD TYPE</label>
          <select id="investor-type" name="leadType" defaultValue="Investor" required>
            <option value="Investor">Investor</option>
            <option value="Partner">Partner</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>

          <InputField
            label="EMAIL ADDRESS"
            id="investor-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
          />
          <InputField
            label="PHONE / WHATSAPP"
            id="investor-phone"
            name="phone"
            type="tel"
            minLength={6}
            maxLength={30}
            autoComplete="tel"
            placeholder="+44..."
            required
          />
          <InputField
            label="COMPANY (OPTIONAL)"
            id="investor-company"
            name="company"
            type="text"
            maxLength={80}
            autoComplete="organization"
            placeholder="Your company name"
          />
          <TextareaField
            label="MESSAGE (OPTIONAL)"
            id="investor-message"
            name="message"
            rows={4}
            maxLength={500}
            placeholder="Tell us what kind of partnership or investment you are looking for..."
          />

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Send via WhatsApp
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
