import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { requireAuth } from "@/lib/auth";
import { getQuotes } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function QuotesPage() {
  const { workspace } = await requireAuth();
  const quotes = await getQuotes(workspace.id);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Quotations"
        title="Quotes stay attached to the lead, not buried in files and chat threads."
        description="V1 stores quotation records, line items, and statuses in the product so you can track proposal momentum without needing invoicing yet."
        actions={
          <>
            <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Create quote</button>
            <button className="rounded-full border border-line px-5 py-3 text-sm font-semibold">Use template</button>
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Quote builder</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["Lead", "Quote number", "Valid until", "Currency"].map((field) => (
              <label key={field} className="block">
                <span className="mb-2 block text-sm text-muted">{field}</span>
                <input className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
              </label>
            ))}
          </div>
          <div className="mt-5 rounded-[24px] border border-dashed border-line p-5">
            <p className="text-sm font-semibold">Line items</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Quote totals should always be derived from line items. Billing and invoice collection can be layered on
              later without changing the quote model.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {quotes.map((quote) => {
            return (
              <article key={quote.id} className="app-surface rounded-[28px] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted">{quote.quoteNumber}</p>
                    <h2 className="mt-1 text-2xl font-semibold">{quote.lead.fullName}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {quote.lead.company} | valid until{" "}
                      {formatDate(quote.validUntil, { dateStyle: "medium", timeStyle: undefined })}
                    </p>
                  </div>
                  <StatusBadge value={quote.status} />
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  {quote.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 rounded-2xl bg-white/80 px-4 py-3">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-muted">{item.description}</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(item.unitPrice)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <p className="text-sm text-muted">Total</p>
                  <p className="text-lg font-semibold">{formatCurrency(quote.total)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
