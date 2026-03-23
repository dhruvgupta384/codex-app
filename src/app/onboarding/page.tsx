import Link from "next/link";

const steps = [
  "Create your agency workspace and set the timezone",
  "Keep the default lead stages or rename them later in settings",
  "Import sample data or start with your first WhatsApp lead manually",
];

export default function OnboardingPage() {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center py-10">
      <div className="glass-panel w-full max-w-3xl rounded-[36px] p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Onboarding</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Set up Relay in under ten minutes.</h1>
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-6 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Workspace name</span>
              <input
                defaultValue="Northstar Growth"
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Industry</span>
              <select className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                <option>Performance marketing agency</option>
                <option>Creative studio</option>
                <option>Web agency</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Timezone</span>
              <select className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                <option>Asia/Calcutta</option>
                <option>UTC</option>
              </select>
            </label>
            <div className="rounded-[24px] border border-dashed border-line p-5">
              <p className="text-sm font-semibold">Default stages</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                New, Contacted, Interested, Quotation Sent, Won, Lost.
              </p>
            </div>
            <Link href="/app/dashboard" className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
              Enter workspace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
