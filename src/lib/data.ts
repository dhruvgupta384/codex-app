import { prisma } from "@/lib/prisma";

export async function getDashboardData(workspaceId: string) {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [totalLeads, wonLeads, quotationsSent, newThisWeek, hotLeads, followUps, activities] =
    await Promise.all([
      prisma.lead.count({ where: { workspaceId } }),
      prisma.lead.count({ where: { workspaceId, status: "won" } }),
      prisma.quote.count({ where: { lead: { workspaceId } } }),
      prisma.lead.count({ where: { workspaceId, createdAt: { gte: weekAgo } } }),
      prisma.lead.findMany({
        where: { workspaceId },
        orderBy: [{ priority: "desc" }, { nextFollowUpAt: "asc" }],
        take: 4,
      }),
      prisma.followUp.findMany({
        where: {
          status: "pending",
          dueAt: {
            gte: todayStart,
            lt: tomorrow,
          },
          lead: {
            workspaceId,
          },
        },
        include: {
          lead: true,
        },
        orderBy: { dueAt: "asc" },
        take: 4,
      }),
      prisma.leadActivity.findMany({
        where: {
          lead: {
            workspaceId,
          },
        },
        include: {
          lead: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const dueToday = followUps.length;
  const overdue = await prisma.followUp.count({
    where: {
      status: "pending",
      dueAt: { lt: now },
      lead: { workspaceId },
    },
  });

  return {
    metrics: {
      totalLeads,
      wonLeads,
      quotationsSent,
      newThisWeek,
      dueToday,
      overdue,
      conversionRate: totalLeads ? Math.round((wonLeads / totalLeads) * 100) : 0,
    },
    hotLeads,
    todayFollowUps: followUps,
    activities,
  };
}

export async function getLeads(workspaceId: string) {
  return prisma.lead.findMany({
    where: { workspaceId },
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getLeadDetail(workspaceId: string, leadId: string) {
  return prisma.lead.findFirst({
    where: {
      id: leadId,
      workspaceId,
    },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
      followUps: {
        orderBy: { dueAt: "asc" },
      },
      quotes: {
        include: {
          lineItems: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      activities: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getFollowUps(workspaceId: string) {
  return prisma.followUp.findMany({
    where: {
      lead: { workspaceId },
    },
    include: {
      lead: true,
    },
    orderBy: { dueAt: "asc" },
  });
}

export async function getQuotes(workspaceId: string) {
  return prisma.quote.findMany({
    where: {
      lead: { workspaceId },
    },
    include: {
      lead: true,
      lineItems: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTemplates(workspaceId: string) {
  return prisma.template.findMany({
    where: { workspaceId },
    orderBy: [{ type: "asc" }, { createdAt: "desc" }],
  });
}
