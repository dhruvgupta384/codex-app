export type LeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "quotation_sent"
  | "won"
  | "lost";

export type FollowUpStatus = "pending" | "done";
export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";
export type NoteType = "note" | "call_summary" | "meeting" | "message_summary";
export type TemplateType = "quote" | "whatsapp_reply";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  industryType: string;
  timezone: string;
  ownerUserId: string;
}

export interface Lead {
  id: string;
  workspaceId: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  source: string;
  serviceType: string;
  status: LeadStatus;
  budgetMin: number;
  budgetMax: number;
  priority: "low" | "medium" | "high";
  lastContactedAt: string;
  nextFollowUpAt: string;
  wonAt?: string;
  lostAt?: string;
  lostReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  authorUserId: string;
  noteType: NoteType;
  content: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  dueAt: string;
  status: FollowUpStatus;
  summary: string;
  completedAt?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  leadId: string;
  quoteNumber: string;
  status: QuoteStatus;
  currency: string;
  subtotal: number;
  discount: number;
  total: number;
  validUntil: string;
  introText: string;
  termsText: string;
  createdAt: string;
}

export interface QuoteLineItem {
  id: string;
  quoteId: string;
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  sortOrder: number;
}

export interface Template {
  id: string;
  workspaceId: string;
  type: TemplateType;
  name: string;
  body: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: "status_changed" | "follow_up_completed" | "quote_created" | "note_added";
  metadata: string;
  createdAt: string;
}
