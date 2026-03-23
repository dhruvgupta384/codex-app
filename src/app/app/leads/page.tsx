import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { createLeadAction } from "@/app/app/actions";
import { requireAuth } from "@/lib/auth";
import { getLeads } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function LeadsPage() {
  const { workspace } = await requireAuth();
  const leads = await getLeads(workspace.id);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Leads"
        title="A single list for warm conversations, next actions, and budget fit."
        description="V1 keeps lead intake manual on purpose. That makes the workflow fast to validate while keeping the schema ready for integrations later."
        actions={
          <button className="rounded-full border border-line px-5 py-3 text-sm font-semibold">
            {leads.length} active records
          </button>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form action={createLeadAction} className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Quick add</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Lead name</span>
              <input name="fullName" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Company</span>
              <input name="company" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Source</span>
              <input name="source" defaultValue="WhatsApp" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Service type</span>
              <input name="serviceType" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Phone</span>
              <input name="phone" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Email</span>
              <input name="email" type="email" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Budget min</span>
              <input name="budgetMin" type="number" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Budget max</span>
              <input name="budgetMax" type="number" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Priority</span>
              <select name="priority" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Next follow-up</span>
              <input name="nextFollowUpAt" type="datetime-local" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-muted">Lead note</span>
            <textarea name="note" rows={4} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
          </label>
          <button className="mt-5 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white">
            Save lead
          </button>
        </form>

        <div className="app-surface overflow-hidden rounded-[28px]">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-4 border-b border-line px-6 py-4 text-xs uppercase tracking-[0.16em] text-muted">
            <span>Lead</span>
            <span>Stage</span>
            <span>Budget</span>
            <span>Next follow-up</span>
          </div>
          <div className="divide-y divide-line">
            {leads.map((lead) => (
              <Link
                key={lead.id}
                href={`/app/leads/${lead.id}`}
                className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-4 px-6 py-5 transition hover:bg-white/60"
              >
                <div>
                  <p className="font-semibold">{lead.fullName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {lead.company} | {lead.source}
                  </p>
                </div>
                <div className="pt-1">
                  <StatusBadge value={lead.status} />
                </div>
                <div className="text-sm text-muted">
                  {formatCurrency(lead.budgetMin)} - {formatCurrency(lead.budgetMax)}
                </div>
                <div className="text-sm text-muted">{formatDate(lead.nextFollowUpAt)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
