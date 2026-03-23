import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { requireAuth } from "@/lib/auth";
import { getDashboardData } from "@/lib/data";
import { formatDate, titleCaseStatus } from "@/lib/utils";

export default async function DashboardPage() {
  const { workspace } = await requireAuth();
  const { metrics, hotLeads, todayFollowUps, activities } = await getDashboardData(workspace.id);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Dashboard"
        title="Everything that needs your attention is visible before noon."
        description="Relay keeps a solo agency owner focused on the next follow-up, the warmest opportunities, and the quotes closest to conversion."
        actions={
          <>
            <Link href="/app/leads" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">
              Add new lead
            </Link>
            <Link href="/app/follow-ups" className="rounded-full border border-line px-5 py-3 text-sm font-semibold">
              Review follow-ups
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total leads" value={`${metrics.totalLeads}`} detail={`${metrics.newThisWeek} new this week`} />
        <MetricCard label="Follow-ups due today" value={`${metrics.dueToday}`} detail="Calls and check-ins ready to run" tone="warning" />
        <MetricCard label="Quotations sent" value={`${metrics.quotationsSent}`} detail="Sent proposals linked to active leads" />
        <MetricCard label="Conversion rate" value={`${metrics.conversionRate}%`} detail={`${metrics.wonLeads} won leads so far`} tone="accent" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="app-surface rounded-[28px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Hot pipeline</p>
              <p className="mt-1 text-sm text-muted">Priority leads with context, stage, and next action.</p>
            </div>
            <Link href="/app/leads" className="text-sm font-semibold text-accent">
              View all
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {hotLeads.map((lead) => (
              <Link key={lead.id} href={`/app/leads/${lead.id}`} className="block rounded-[24px] border border-line bg-white/80 p-4 transition hover:bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{lead.fullName}</p>
                    <p className="mt-1 text-sm text-muted">
                      {lead.company} | {lead.serviceType}
                    </p>
                  </div>
                  <StatusBadge value={lead.status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  <span>Source: {lead.source}</span>
                  <span>Next action: {formatDate(lead.nextFollowUpAt)}</span>
                  <span>Priority: {lead.priority}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Today&apos;s follow-ups</p>
            <div className="mt-4 space-y-3">
              {todayFollowUps.map((item) => {
                return (
                  <div key={item.id} className="rounded-[24px] bg-white/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{item.lead.fullName}</p>
                      <StatusBadge value={item.status} />
                    </div>
                    <p className="mt-2 text-sm text-muted">{item.summary}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
                      {formatDate(item.dueAt)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Recent activity</p>
            <div className="mt-4 space-y-4">
              {activities.map((activity) => {
                return (
                  <div key={activity.id} className="border-l border-line pl-4">
                    <p className="text-sm font-semibold">
                      {activity.lead.fullName} | {titleCaseStatus(activity.lead.status as never)}
                    </p>
                    <p className="mt-1 text-sm text-muted">{activity.metadata}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                      {formatDate(activity.createdAt)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
