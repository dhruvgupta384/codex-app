import Link from "next/link";
import {
  completeFollowUpAction,
  createFollowUpAction,
  deleteFollowUpAction,
  updateFollowUpAction,
} from "@/app/app/actions";
import { requireAuth } from "@/lib/auth";
import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { getFollowUps, getLeads } from "@/lib/data";
import { formatDate } from "@/lib/utils";

function FollowUpGroup({
  title,
  items,
}: {
  title: string;
  items: Awaited<ReturnType<typeof getFollowUps>>;
}) {
  return (
    <div className="app-surface rounded-[28px] p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted">{items.length} items</p>
      </div>
      <div className="mt-5 space-y-4">
        {items.map((item) => {
          return (
            <div key={item.id} className="rounded-[24px] bg-white/80 p-4">
              <form action={updateFollowUpAction} className="space-y-3">
                <input type="hidden" name="followUpId" value={item.id} />
                <input type="hidden" name="leadId" value={item.leadId} />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.lead.fullName}</p>
                    <p className="mt-1 text-sm text-muted">
                      {item.lead.company} | {item.lead.serviceType}
                    </p>
                  </div>
                  <StatusBadge value={item.status} />
                </div>
                <input name="summary" defaultValue={item.summary} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                  <span>{formatDate(item.dueAt)}</span>
                  <span>Source: {item.lead.source}</span>
                </div>
                <input name="dueAt" type="datetime-local" defaultValue={new Date(item.dueAt).toISOString().slice(0, 16)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold">Save</button>
                </div>
              </form>
              <div className="mt-3 flex flex-wrap gap-3">
                {item.status !== "done" ? (
                  <form action={completeFollowUpAction}>
                    <input type="hidden" name="followUpId" value={item.id} />
                    <input type="hidden" name="leadId" value={item.leadId} />
                    <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Complete</button>
                  </form>
                ) : null}
                <form action={deleteFollowUpAction}>
                  <input type="hidden" name="followUpId" value={item.id} />
                  <input type="hidden" name="leadId" value={item.leadId} />
                  <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-rose-700">Delete</button>
                </form>
                <Link href={`/app/leads/${item.leadId}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold">
                  Open lead
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function FollowUpsPage() {
  const { workspace } = await requireAuth();
  const [allFollowUps, leads] = await Promise.all([
    getFollowUps(workspace.id),
    getLeads(workspace.id),
  ]);
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const tomorrow = new Date(todayStart);
  tomorrow.setDate(todayStart.getDate() + 1);

  const overdue = allFollowUps.filter(
    (item) => item.status === "pending" && new Date(item.dueAt) < now,
  );
  const today = allFollowUps.filter((item) => {
    const due = new Date(item.dueAt);
    return item.status === "pending" && due >= todayStart && due < tomorrow;
  });
  const upcoming = allFollowUps.filter(
    (item) => item.status === "pending" && new Date(item.dueAt) >= tomorrow,
  );

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Follow-ups"
        title="Run the day from one queue instead of searching through chats."
        description="The reminder system is in-app only in V1. The point is to create visibility and discipline before adding email or calendar complexity."
        actions={<span className="rounded-full border border-line px-5 py-3 text-sm font-semibold">{allFollowUps.length} follow-ups</span>}
      />

      <form action={createFollowUpAction} className="app-surface rounded-[28px] p-6">
        <p className="text-sm font-semibold">Create follow-up</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <select name="leadId" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none">
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.fullName} | {lead.company}
              </option>
            ))}
          </select>
          <input name="summary" placeholder="What needs to happen next?" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none md:col-span-1" />
          <input name="dueAt" type="datetime-local" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
        </div>
        <button className="mt-4 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Add follow-up</button>
      </form>

      <div className="grid gap-6 xl:grid-cols-3">
        <FollowUpGroup title="Overdue" items={overdue} />
        <FollowUpGroup title="Due today" items={today} />
        <FollowUpGroup title="Upcoming" items={upcoming} />
      </div>
    </div>
  );
}
