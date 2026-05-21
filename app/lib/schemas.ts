import { z } from "zod";

export const crewFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .trim(),
  message: z
    .string()
    .max(280, "Message must be less than 280 characters")
    .trim()
    .optional(),
});

export const investorFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be less than 80 characters")
    .trim(),
  leadType: z.enum(["Customer", "Investor", "Partner", "Other"]),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .trim(),
  company: z
    .string()
    .max(80, "Company name is too long")
    .trim()
    .optional(),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .trim()
    .optional(),
});

export type CrewFormData = z.infer<typeof crewFormSchema>;
export type InvestorFormData = z.infer<typeof investorFormSchema>;
