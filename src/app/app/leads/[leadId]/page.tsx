import { notFound } from "next/navigation";
import {
  completeFollowUpAction,
  createFollowUpAction,
  deleteFollowUpAction,
  deleteLeadAction,
  updateFollowUpAction,
  updateLeadAction,
} from "@/app/app/actions";
import { requireAuth } from "@/lib/auth";
import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { getLeadDetail } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;
  const { workspace } = await requireAuth();
  const lead = await getLeadDetail(workspace.id, leadId);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Lead detail"
        title={`${lead.fullName} • ${lead.company}`}
        description={`${lead.serviceType} from ${lead.source}. This page brings notes, follow-ups, quote history, and lifecycle events into one workspace.`}
        actions={
          <>
            <StatusBadge value={lead.status} className="self-center" />
            <button className="rounded-full border border-line px-5 py-3 text-sm font-semibold">
              Update stage
            </button>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <form action={updateLeadAction} className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Lead profile</p>
            <input type="hidden" name="leadId" value={lead.id} />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Lead name</span>
                <input name="fullName" defaultValue={lead.fullName} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Company</span>
                <input name="company" defaultValue={lead.company} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Phone</span>
                <input name="phone" defaultValue={lead.phone} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Email</span>
                <input name="email" type="email" defaultValue={lead.email} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Source</span>
                <input name="source" defaultValue={lead.source} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Service type</span>
                <input name="serviceType" defaultValue={lead.serviceType} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Budget min</span>
                <input name="budgetMin" type="number" defaultValue={lead.budgetMin} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Budget max</span>
                <input name="budgetMax" type="number" defaultValue={lead.budgetMax} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Priority</span>
                <select name="priority" defaultValue={lead.priority} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Status</span>
                <select name="status" defaultValue={lead.status} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="quotation_sent">Quotation sent</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm text-muted">Next follow-up</span>
                <input name="nextFollowUpAt" type="datetime-local" defaultValue={new Date(lead.nextFollowUpAt).toISOString().slice(0, 16)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm text-muted">Lost reason</span>
                <input name="lostReason" defaultValue={lead.lostReason ?? ""} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Save changes</button>
            </div>
          </form>
          <form action={deleteLeadAction} className="app-surface rounded-[28px] p-6">
            <input type="hidden" name="leadId" value={lead.id} />
            <p className="text-sm font-semibold">Danger zone</p>
            <p className="mt-2 text-sm text-muted">Delete this lead and all related follow-ups, notes, and quotes.</p>
            <button className="mt-4 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white">
              Delete lead
            </button>
          </form>

          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Follow-ups</p>
            <div className="mt-4 space-y-3">
              {lead.followUps.map((followUp) => (
                <div key={followUp.id} className="rounded-[24px] bg-white/80 p-4">
                  <form action={updateFollowUpAction} className="space-y-3">
                    <input type="hidden" name="followUpId" value={followUp.id} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <div className="flex items-center justify-between gap-3">
                      <input name="summary" defaultValue={followUp.summary} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
                      <StatusBadge value={followUp.status} />
                    </div>
                    <input name="dueAt" type="datetime-local" defaultValue={new Date(followUp.dueAt).toISOString().slice(0, 16)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold">Update</button>
                    </div>
                  </form>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {followUp.status !== "done" ? (
                      <form action={completeFollowUpAction}>
                        <input type="hidden" name="followUpId" value={followUp.id} />
                        <input type="hidden" name="leadId" value={lead.id} />
                        <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Mark done</button>
                      </form>
                    ) : null}
                    <form action={deleteFollowUpAction}>
                      <input type="hidden" name="followUpId" value={followUp.id} />
                      <input type="hidden" name="leadId" value={lead.id} />
                      <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-rose-700">Delete</button>
                    </form>
                  </div>
                  <p className="mt-2 text-sm text-muted">{formatDate(followUp.dueAt)}</p>
                </div>
              ))}
            </div>
            <form action={createFollowUpAction} className="mt-5 space-y-3 border-t border-line pt-5">
              <input type="hidden" name="leadId" value={lead.id} />
              <input name="summary" placeholder="New follow-up summary" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              <input name="dueAt" type="datetime-local" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              <button className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white">
                Add follow-up
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Notes timeline</p>
            <div className="mt-5 space-y-4">
              {lead.notes.map((note) => (
                <div key={note.id} className="border-l border-line pl-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{note.noteType.replace("_", " ")}</p>
                  <p className="mt-2 text-sm leading-6">{note.content}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Quotations</p>
            <div className="mt-4 space-y-4">
              {lead.quotes.length === 0 ? (
                <p className="text-sm text-muted">No quotations created for this lead yet.</p>
              ) : (
                lead.quotes.map((quote) => (
                  <div key={quote.id} className="rounded-[24px] border border-line bg-white/80 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{quote.quoteNumber}</p>
                        <p className="mt-1 text-sm text-muted">{quote.introText}</p>
                      </div>
                      <StatusBadge value={quote.status} />
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-muted">
                      {quote.lineItems.map((item) => (
                        <div key={item.id} className="flex justify-between gap-4">
                          <span>{item.title}</span>
                          <span>{formatCurrency(item.unitPrice)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(quote.total)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="app-surface rounded-[28px] p-6">
            <p className="text-sm font-semibold">Activity</p>
            <div className="mt-4 space-y-4">
              {lead.activities.map((activity) => (
                <div key={activity.id} className="border-l border-line pl-4">
                  <p className="text-sm">{activity.metadata}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                    {formatDate(activity.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
