import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.leadTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.leadActivity.deleteMany();
  await prisma.quoteLineItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.leadNote.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.template.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("demo12345", 10);

  const user = await prisma.user.create({
    data: {
      name: "Dhruv Gupta",
      email: "owner@northstargrowth.com",
      passwordHash,
    },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: "Northstar Growth",
      slug: "northstar-growth",
      industryType: "Performance marketing agency",
      timezone: "Asia/Calcutta",
      ownerUserId: user.id,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: user.id,
      role: "owner",
    },
  });

  await prisma.template.createMany({
    data: [
      {
        workspaceId: workspace.id,
        type: "quote",
        name: "Starter growth retainer",
        body: "3-month retainer with weekly reporting, KPI dashboard, and one strategy call per week.",
      },
      {
        workspaceId: workspace.id,
        type: "whatsapp_reply",
        name: "Warm first response",
        body: "Thanks for reaching out. I looked through your requirement and can share an approach plus rough budget today.",
      },
    ],
  });

  const lead1 = await prisma.lead.create({
    data: {
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
      lastContactedAt: new Date("2026-03-22T12:30:00.000Z"),
      nextFollowUpAt: new Date("2026-03-24T08:00:00.000Z"),
      notes: {
        create: [
          {
            authorUserId: user.id,
            noteType: "message_summary",
            content: "Lead wants to improve organic traffic before the next funding round.",
          },
          {
            authorUserId: user.id,
            noteType: "call_summary",
            content: "Shared sample case studies and aligned on a 3-month pilot scope.",
          },
        ],
      },
      followUps: {
        create: {
          dueAt: new Date("2026-03-24T08:00:00.000Z"),
          status: "pending",
          summary: "Share SEO roadmap and proposed KPIs",
        },
      },
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
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
      lastContactedAt: new Date("2026-03-23T10:15:00.000Z"),
      nextFollowUpAt: new Date("2026-03-25T06:30:00.000Z"),
      notes: {
        create: {
          authorUserId: user.id,
          noteType: "meeting",
          content: "Proposal walkthrough done. Waiting for founder sign-off on creative budget.",
        },
      },
      followUps: {
        create: {
          dueAt: new Date("2026-03-25T06:30:00.000Z"),
          status: "pending",
          summary: "Check on quote review and timeline approval",
        },
      },
      quotes: {
        create: {
          quoteNumber: "NG-204",
          status: "sent",
          currency: "INR",
          subtotal: 95000,
          discount: 5000,
          total: 90000,
          validUntil: new Date("2026-03-31T18:30:00.000Z"),
          introText: "Performance media management for the upcoming growth quarter.",
          termsText: "50% upfront, 50% on launch. Ad spend billed separately.",
          lineItems: {
            create: [
              {
                title: "Campaign strategy",
                description: "Platform plan, funnel design, creative direction.",
                quantity: 1,
                unitPrice: 35000,
                sortOrder: 1,
              },
              {
                title: "Monthly media management",
                description: "Optimization, reporting, and weekly review calls.",
                quantity: 1,
                unitPrice: 60000,
                sortOrder: 2,
              },
            ],
          },
        },
      },
    },
  });

  const lead3 = await prisma.lead.create({
    data: {
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
      lastContactedAt: new Date("2026-03-23T08:45:00.000Z"),
      nextFollowUpAt: new Date("2026-03-23T13:00:00.000Z"),
      notes: {
        create: {
          authorUserId: user.id,
          noteType: "note",
          content: "Needs launch-ready redesign before April event. Fast turnaround matters.",
        },
      },
      followUps: {
        create: {
          dueAt: new Date("2026-03-23T13:00:00.000Z"),
          status: "pending",
          summary: "Call to confirm scope and delivery window",
        },
      },
    },
  });

  const lead4 = await prisma.lead.create({
    data: {
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
      lastContactedAt: new Date("2026-03-21T09:00:00.000Z"),
      nextFollowUpAt: new Date("2026-03-22T10:00:00.000Z"),
      wonAt: new Date("2026-03-21T09:15:00.000Z"),
      quotes: {
        create: {
          quoteNumber: "NG-198",
          status: "accepted",
          currency: "INR",
          subtotal: 120000,
          discount: 0,
          total: 120000,
          validUntil: new Date("2026-03-18T18:30:00.000Z"),
          introText: "Brand strategy sprint and positioning workshop.",
          termsText: "One workshop, two revision cycles, final brand narrative deck.",
          lineItems: {
            create: [
              {
                title: "Brand strategy sprint",
                description: "Research, workshop, positioning, and story framework.",
                quantity: 1,
                unitPrice: 120000,
                sortOrder: 1,
              },
            ],
          },
        },
      },
    },
  });

  await prisma.lead.create({
    data: {
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
      lastContactedAt: new Date("2026-03-18T15:30:00.000Z"),
      nextFollowUpAt: new Date("2026-03-19T10:00:00.000Z"),
      lostAt: new Date("2026-03-19T13:00:00.000Z"),
      lostReason: "Chose a lower-cost vendor",
      followUps: {
        create: {
          dueAt: new Date("2026-03-19T10:00:00.000Z"),
          status: "done",
          completedAt: new Date("2026-03-19T13:00:00.000Z"),
          summary: "Final price discussion",
        },
      },
    },
  });

  await prisma.leadActivity.createMany({
    data: [
      {
        leadId: lead2.id,
        type: "quote_created",
        metadata: "Created quotation NG-204",
      },
      {
        leadId: lead3.id,
        type: "status_changed",
        metadata: "Lead created and added to the New stage",
      },
      {
        leadId: lead1.id,
        type: "note_added",
        metadata: "Call summary added after roadmap discussion",
      },
      {
        leadId: lead4.id,
        type: "status_changed",
        metadata: "Lead marked won after brand strategy approval",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
