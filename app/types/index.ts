export type LeadType = "Customer" | "Investor" | "Partner" | "Other";

export type MenuCategory = "all" | "savory" | "sweet" | "drinks";

export interface WaitlistEntry {
  name: string;
  email: string;
  leadType: LeadType;
  phone: string;
  message: string;
  createdAt: string;
}

export interface LeadFormData {
  source: string;
  leadType: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "all">;
  type: string;
  tag: string;
  detail: string;
  image?: string;
  planetClass?: string;
}
