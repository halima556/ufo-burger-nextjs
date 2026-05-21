import type { LeadFormData, LeadType, WaitlistEntry } from "@/app/types";
import {
  EMAIL_PATTERN,
  LEAD_TYPE_OPTIONS,
  WAITLIST_STORAGE_KEY,
  WHATSAPP_NUMBER,
} from "./constants";

export function readWaitlist(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveWaitlist(entries: WaitlistEntry[]): boolean {
  try {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export function isEmailDuplicate(email: string): boolean {
  return readWaitlist().some((e) => e.email === email.toLowerCase());
}

export function validateEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function validateLeadType(value: string): value is LeadType {
  return LEAD_TYPE_OPTIONS.has(value as LeadType);
}

export function validatePhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 6;
}

export function buildLeadWhatsAppText(data: LeadFormData): string {
  const normalizedType: LeadType = LEAD_TYPE_OPTIONS.has(data.leadType as LeadType)
    ? (data.leadType as LeadType)
    : "Other";

  return [
    `[UFO LEAD: ${normalizedType.toUpperCase()}]`,
    "",
    `Source: ${data.source}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company || "N/A"}`,
    `Message: ${data.message || "N/A"}`,
    `Timestamp: ${new Date().toISOString()}`,
  ].join("\n");
}

export function openWhatsApp(messageText: string): boolean {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!number) return false;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) window.location.href = url;
  return true;
}
