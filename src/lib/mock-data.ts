import {
  FollowUp,
  Lead,
  LeadActivity,
  LeadNote,
  Quote,
  QuoteLineItem,
  Template,
  User,
  Workspace,
} from "@/lib/types";

export const currentUser: User = {
  id: "user_1",
  name: "Dhruv Gupta",
  email: "dhruv@example.com",
  createdAt: "2026-03-20T09:30:00.000Z",
};

export const workspace: Workspace = {
  id: "ws_1",
  name: "Northstar Growth",
  slug: "northstar-growth",
  industryType: "Performance marketing agency",
  timezone: "Asia/Calcutta",
  ownerUserId: currentUser.id,
};

export const leads: Lead[] = [
  {
    id: "lead_1",
    workspaceId: workspace.id,
    fullName: "Aman Verma",
    phone: "+91 98765 43120",
    email: "aman@vervatech.in",
    company: "Verva Tech",
    source: "WhatsApp",
    serviceType: "SEO retainer",
    status: "interested",
    budgetMin: 25000,
    budgetMax: 40000,
    priority: "high",
    lastContactedAt: "2026-03-22T12:30:00.000Z",
    nextFollowUpAt: "2026-03-24T08:00:00.000Z",
    createdAt: "2026-03-20T08:00:00.000Z",
    updatedAt: "2026-03-22T12:30:00.000Z",
  },
  {
    id: "lead_2",
    workspaceId: workspace.id,
    fullName: "Neha Mehta",
    phone: "+91 98111 82940",
    email: "neha@lumiahome.in",
    company: "Lumia Home",
    source: "Instagram",
    serviceType: "Performance ads",
    status: "quotation_sent",
    budgetMin: 55000,
    budgetMax: 85000,
    priority: "high",
    lastContactedAt: "2026-03-23T10:15:00.000Z",
    nextFollowUpAt: "2026-03-25T06:30:00.000Z",
    createdAt: "2026-03-19T11:00:00.000Z",
    updatedAt: "2026-03-23T10:15:00.000Z",
  },
  {
    id: "lead_3",
    workspaceId: workspace.id,
    fullName: "Rishi Nair",
    phone: "+91 99770 10110",
    email: "rishi@helix.fit",
    company: "Helix Fit",
    source: "Referral",
    serviceType: "Website redesign",
    status: "new",
    budgetMin: 70000,
    budgetMax: 120000,
    priority: "medium",
    lastContactedAt: "2026-03-23T08:45:00.000Z",
    nextFollowUpAt: "2026-03-23T13:00:00.000Z",
    createdAt: "2026-03-23T08:40:00.000Z",
    updatedAt: "2026-03-23T08:45:00.000Z",
  },
  {
    id: "lead_4",
    workspaceId: workspace.id,
    fullName: "Sana Kapoor",
    phone: "+91 98222 45454",
    email: "sana@artisanandco.in",
    company: "Artisan & Co.",
    source: "Call",
    serviceType: "Brand strategy",
    status: "won",
    budgetMin: 95000,
    budgetMax: 140000,
    priority: "medium",
    lastContactedAt: "2026-03-21T09:00:00.000Z",
    nextFollowUpAt: "2026-03-22T10:00:00.000Z",
    wonAt: "2026-03-21T09:15:00.000Z",
    createdAt: "2026-03-14T09:00:00.000Z",
    updatedAt: "2026-03-21T09:15:00.000Z",
  },
  {
    id: "lead_5",
    workspaceId: workspace.id,
    fullName: "Rahul Bedi",
    phone: "+91 90155 22212",
    email: "rahul@merakiapps.io",
    company: "Meraki Apps",
    source: "WhatsApp",
    serviceType: "Retainer design support",
    status: "lost",
    budgetMin: 20000,
    budgetMax: 30000,
    priority: "low",
    lastContactedAt: "2026-03-18T15:30:00.000Z",
    nextFollowUpAt: "2026-03-19T10:00:00.000Z",
    lostAt: "2026-03-19T13:00:00.000Z",
    lostReason: "Chose a lower-cost vendor",
    createdAt: "2026-03-16T15:30:00.000Z",
    updatedAt: "2026-03-19T13:00:00.000Z",
  },
];

export const leadNotes: LeadNote[] = [
  {
    id: "note_1",
    leadId: "lead_1",
    authorUserId: currentUser.id,
    noteType: "message_summary",
    content: "Lead wants to improve organic traffic before the next funding round.",
    createdAt: "2026-03-22T12:20:00.000Z",
  },
  {
    id: "note_2",
    leadId: "lead_1",
    authorUserId: currentUser.id,
    noteType: "call_summary",
    content: "Shared sample case studies and aligned on a 3-month pilot scope.",
    createdAt: "2026-03-22T12:30:00.000Z",
  },
  {
    id: "note_3",
    leadId: "lead_2",
    authorUserId: currentUser.id,
    noteType: "meeting",
    content: "Proposal walkthrough done. Waiting for founder sign-off on creative budget.",
    createdAt: "2026-03-23T10:10:00.000Z",
  },
  {
    id: "note_4",
    leadId: "lead_3",
    authorUserId: currentUser.id,
    noteType: "note",
    content: "Needs launch-ready redesign before April event. Fast turnaround matters.",
    createdAt: "2026-03-23T08:44:00.000Z",
  },
];

export const followUps: FollowUp[] = [
  {
    id: "fu_1",
    leadId: "lead_1",
    dueAt: "2026-03-24T08:00:00.000Z",
    status: "pending",
    summary: "Share SEO roadmap and proposed KPIs",
    createdAt: "2026-03-22T12:30:00.000Z",
  },
  {
    id: "fu_2",
    leadId: "lead_2",
    dueAt: "2026-03-25T06:30:00.000Z",
    status: "pending",
    summary: "Check on quote review and timeline approval",
    createdAt: "2026-03-23T10:15:00.000Z",
  },
  {
    id: "fu_3",
    leadId: "lead_3",
    dueAt: "2026-03-23T13:00:00.000Z",
    status: "pending",
    summary: "Call to confirm scope and delivery window",
    createdAt: "2026-03-23T08:45:00.000Z",
  },
  {
    id: "fu_4",
    leadId: "lead_5",
    dueAt: "2026-03-19T10:00:00.000Z",
    status: "done",
    summary: "Final price discussion",
    completedAt: "2026-03-19T13:00:00.000Z",
    createdAt: "2026-03-18T15:40:00.000Z",
  },
];

export const quotes: Quote[] = [
  {
    id: "quote_1",
    leadId: "lead_2",
    quoteNumber: "NG-204",
    status: "sent",
    currency: "INR",
    subtotal: 95000,
    discount: 5000,
    total: 90000,
    validUntil: "2026-03-31T18:30:00.000Z",
    introText: "Performance media management for the upcoming growth quarter.",
    termsText: "50% upfront, 50% on launch. Ad spend billed separately.",
    createdAt: "2026-03-23T09:45:00.000Z",
  },
  {
    id: "quote_2",
    leadId: "lead_4",
    quoteNumber: "NG-198",
    status: "accepted",
    currency: "INR",
    subtotal: 120000,
    discount: 0,
    total: 120000,
    validUntil: "2026-03-18T18:30:00.000Z",
    introText: "Brand strategy sprint and positioning workshop.",
    termsText: "One workshop, two revision cycles, final brand narrative deck.",
    createdAt: "2026-03-15T10:00:00.000Z",
  },
];

export const quoteLineItems: QuoteLineItem[] = [
  {
    id: "qli_1",
    quoteId: "quote_1",
    title: "Campaign strategy",
    description: "Platform plan, funnel design, creative direction.",
    quantity: 1,
    unitPrice: 35000,
    sortOrder: 1,
  },
  {
    id: "qli_2",
    quoteId: "quote_1",
    title: "Monthly media management",
    description: "Optimization, reporting, and weekly review calls.",
    quantity: 1,
    unitPrice: 60000,
    sortOrder: 2,
  },
  {
    id: "qli_3",
    quoteId: "quote_2",
    title: "Brand strategy sprint",
    description: "Research, workshop, positioning, and story framework.",
    quantity: 1,
    unitPrice: 120000,
    sortOrder: 1,
  },
];

export const templates: Template[] = [
  {
    id: "tpl_1",
    workspaceId: workspace.id,
    type: "quote",
    name: "Starter growth retainer",
    body: "3-month retainer with weekly reporting, KPI dashboard, and one strategy call per week.",
    createdAt: "2026-03-18T08:30:00.000Z",
  },
  {
    id: "tpl_2",
    workspaceId: workspace.id,
    type: "whatsapp_reply",
    name: "Warm first response",
    body: "Thanks for reaching out. I looked through your requirement and can share an approach plus rough budget today.",
    createdAt: "2026-03-18T08:45:00.000Z",
  },
];

export const leadActivities: LeadActivity[] = [
  {
    id: "act_1",
    leadId: "lead_2",
    type: "quote_created",
    metadata: "Created quotation NG-204",
    createdAt: "2026-03-23T09:45:00.000Z",
  },
  {
    id: "act_2",
    leadId: "lead_3",
    type: "status_changed",
    metadata: "Lead created and added to the New stage",
    createdAt: "2026-03-23T08:45:00.000Z",
  },
  {
    id: "act_3",
    leadId: "lead_1",
    type: "note_added",
    metadata: "Call summary added after roadmap discussion",
    createdAt: "2026-03-22T12:30:00.000Z",
  },
];

export const leadStages = [
  "new",
  "contacted",
  "interested",
  "quotation_sent",
  "won",
  "lost",
] as const;

export function getLeadById(leadId: string) {
  return leads.find((lead) => lead.id === leadId);
}

export function getLeadNotes(leadId: string) {
  return leadNotes.filter((note) => note.leadId === leadId);
}

export function getLeadFollowUps(leadId: string) {
  return followUps.filter((followUp) => followUp.leadId === leadId);
}

export function getLeadQuotes(leadId: string) {
  return quotes.filter((quote) => quote.leadId === leadId);
}

export function getQuoteItems(quoteId: string) {
  return quoteLineItems.filter((item) => item.quoteId === quoteId);
}

export function getLeadActivities(leadId: string) {
  return leadActivities.filter((activity) => activity.leadId === leadId);
}

export function getDashboardMetrics() {
  const totalLeads = leads.length;
  const wonLeads = leads.filter((lead) => lead.status === "won").length;
  const quotationsSent = leads.filter(
    (lead) => lead.status === "quotation_sent" || lead.status === "won",
  ).length;
  const now = new Date("2026-03-23T10:30:00.000Z");

  const dueToday = followUps.filter((followUp) => {
    const due = new Date(followUp.dueAt);
    return (
      followUp.status === "pending" &&
      due.getUTCFullYear() === now.getUTCFullYear() &&
      due.getUTCMonth() === now.getUTCMonth() &&
      due.getUTCDate() === now.getUTCDate()
    );
  }).length;

  const overdue = followUps.filter(
    (followUp) => followUp.status === "pending" && new Date(followUp.dueAt) < now,
  ).length;

  return {
    totalLeads,
    wonLeads,
    dueToday,
    overdue,
    quotationsSent,
    conversionRate: Math.round((wonLeads / totalLeads) * 100),
    newThisWeek: 3,
  };
}
