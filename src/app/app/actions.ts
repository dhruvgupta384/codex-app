"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function text(formData: FormData, key: string, fallback = "") {
  return formData.get(key)?.toString().trim() ?? fallback;
}

function requiredText(formData: FormData, key: string, label: string) {
  const value = text(formData, key);
  if (!value) {
    throw new Error(`${label} is required.`);
  }
  return value;
}

function asInt(value: string, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asDate(value: string) {
  return value ? new Date(value) : new Date();
}

export async function createLeadAction(formData: FormData) {
  const { user, workspace } = await requireAuth();
  const fullName = requiredText(formData, "fullName", "Lead name");
  const phone = requiredText(formData, "phone", "Phone");
  const source = requiredText(formData, "source", "Source");
  const serviceType = requiredText(formData, "serviceType", "Service type");
  const nextFollowUpAt = asDate(requiredText(formData, "nextFollowUpAt", "Next follow-up"));

  const lead = await prisma.lead.create({
    data: {
      workspaceId: workspace.id,
      fullName,
      phone,
      email: text(formData, "email", `${fullName.replace(/\s+/g, ".").toLowerCase()}@example.com`),
      company: text(formData, "company", "Independent"),
      source,
      serviceType,
      status: text(formData, "status", "new"),
      budgetMin: asInt(text(formData, "budgetMin"), 0),
      budgetMax: asInt(text(formData, "budgetMax"), 0),
      priority: text(formData, "priority", "medium"),
      lastContactedAt: new Date(),
      nextFollowUpAt,
      notes: text(formData, "note")
        ? {
            create: {
              authorUserId: user.id,
              noteType: "note",
              content: text(formData, "note"),
            },
          }
        : undefined,
      followUps: {
        create: {
          dueAt: nextFollowUpAt,
          status: "pending",
          summary: text(formData, "followUpSummary", `Follow up with ${fullName}`),
        },
      },
      activities: {
        create: {
          type: "status_changed",
          metadata: "Lead created and added to the pipeline",
        },
      },
    },
  });

  revalidatePath("/app/dashboard");
  revalidatePath("/app/leads");
  redirect(`/app/leads/${lead.id}`);
}

export async function updateLeadAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const leadId = requiredText(formData, "leadId", "Lead");
  const status = requiredText(formData, "status", "Status");
  const nextFollowUpAt = asDate(requiredText(formData, "nextFollowUpAt", "Next follow-up"));

  const lead = await prisma.lead.findFirst({
    where: { id: leadId, workspaceId: workspace.id },
    select: { id: true },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      fullName: requiredText(formData, "fullName", "Lead name"),
      phone: requiredText(formData, "phone", "Phone"),
      email: requiredText(formData, "email", "Email"),
      company: requiredText(formData, "company", "Company"),
      source: requiredText(formData, "source", "Source"),
      serviceType: requiredText(formData, "serviceType", "Service type"),
      status,
      budgetMin: asInt(text(formData, "budgetMin"), 0),
      budgetMax: asInt(text(formData, "budgetMax"), 0),
      priority: text(formData, "priority", "medium"),
      nextFollowUpAt,
      wonAt: status === "won" ? new Date() : null,
      lostAt: status === "lost" ? new Date() : null,
      lostReason: status === "lost" ? text(formData, "lostReason") : null,
      activities: {
        create: {
          type: "status_changed",
          metadata: `Lead updated to ${status.replaceAll("_", " ")}`,
        },
      },
    },
  });

  if (status === "won" || status === "lost") {
    await prisma.followUp.updateMany({
      where: { leadId, status: "pending" },
      data: {
        status: "done",
        completedAt: new Date(),
      },
    });
  }

  revalidatePath("/app/dashboard");
  revalidatePath("/app/leads");
  revalidatePath(`/app/leads/${leadId}`);
}

export async function deleteLeadAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const leadId = requiredText(formData, "leadId", "Lead");

  const lead = await prisma.lead.findFirst({
    where: { id: leadId, workspaceId: workspace.id },
    select: { id: true },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await prisma.leadTag.deleteMany({ where: { leadId } });
  await prisma.leadActivity.deleteMany({ where: { leadId } });
  await prisma.followUp.deleteMany({ where: { leadId } });
  await prisma.leadNote.deleteMany({ where: { leadId } });
  const quotes = await prisma.quote.findMany({
    where: { leadId },
    select: { id: true },
  });
  const quoteIds = quotes.map((quote) => quote.id);
  if (quoteIds.length > 0) {
    await prisma.quoteLineItem.deleteMany({
      where: { quoteId: { in: quoteIds } },
    });
  }
  await prisma.quote.deleteMany({ where: { leadId } });
  await prisma.lead.delete({
    where: { id: leadId },
  });

  revalidatePath("/app/dashboard");
  revalidatePath("/app/leads");
  redirect("/app/leads");
}

export async function createFollowUpAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const leadId = requiredText(formData, "leadId", "Lead");
  const dueAt = asDate(requiredText(formData, "dueAt", "Due date"));
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, workspaceId: workspace.id },
    select: { id: true },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await prisma.followUp.create({
    data: {
      leadId,
      dueAt,
      summary: requiredText(formData, "summary", "Summary"),
      status: "pending",
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      nextFollowUpAt: dueAt,
      activities: {
        create: {
          type: "follow_up_completed",
          metadata: "New follow-up scheduled",
        },
      },
    },
  });

  revalidatePath("/app/dashboard");
  revalidatePath("/app/follow-ups");
  revalidatePath(`/app/leads/${leadId}`);
}

export async function updateFollowUpAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const followUpId = requiredText(formData, "followUpId", "Follow-up");
  const leadId = requiredText(formData, "leadId", "Lead");
  const dueAt = asDate(requiredText(formData, "dueAt", "Due date"));

  const followUp = await prisma.followUp.findFirst({
    where: {
      id: followUpId,
      leadId,
      lead: { workspaceId: workspace.id },
    },
    select: { id: true },
  });

  if (!followUp) {
    throw new Error("Follow-up not found.");
  }

  await prisma.followUp.update({
    where: { id: followUpId },
    data: {
      dueAt,
      summary: requiredText(formData, "summary", "Summary"),
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      nextFollowUpAt: dueAt,
    },
  });

  revalidatePath("/app/follow-ups");
  revalidatePath(`/app/leads/${leadId}`);
}

export async function completeFollowUpAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const followUpId = requiredText(formData, "followUpId", "Follow-up");
  const leadId = requiredText(formData, "leadId", "Lead");

  const followUp = await prisma.followUp.findFirst({
    where: {
      id: followUpId,
      leadId,
      lead: { workspaceId: workspace.id },
    },
    select: { id: true },
  });

  if (!followUp) {
    throw new Error("Follow-up not found.");
  }

  await prisma.followUp.update({
    where: { id: followUpId },
    data: {
      status: "done",
      completedAt: new Date(),
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      lastContactedAt: new Date(),
      activities: {
        create: {
          type: "follow_up_completed",
          metadata: "Follow-up completed",
        },
      },
    },
  });

  revalidatePath("/app/dashboard");
  revalidatePath("/app/follow-ups");
  revalidatePath(`/app/leads/${leadId}`);
}

export async function deleteFollowUpAction(formData: FormData) {
  const { workspace } = await requireAuth();
  const followUpId = requiredText(formData, "followUpId", "Follow-up");
  const leadId = requiredText(formData, "leadId", "Lead");

  const followUp = await prisma.followUp.findFirst({
    where: {
      id: followUpId,
      leadId,
      lead: { workspaceId: workspace.id },
    },
    select: { id: true },
  });

  if (!followUp) {
    throw new Error("Follow-up not found.");
  }

  await prisma.followUp.delete({
    where: { id: followUpId },
  });

  revalidatePath("/app/dashboard");
  revalidatePath("/app/follow-ups");
  revalidatePath(`/app/leads/${leadId}`);
}
