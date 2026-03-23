import Link from "next/link";

const proof = [
  "Manual lead capture from WhatsApp, Instagram, calls, or referrals",
  "Dedicated follow-up queue with today and overdue views",
  "Quotation records attached to each lead and stage change",
];

const steps = [
  {
    title: "Capture without friction",
    body: "Open Relay, add the lead in under a minute, and keep the full business context next to the conversation.",
  },
  {
    title: "Run every follow-up from one queue",
    body: "Today, overdue, and upcoming actions stay visible so nothing slips between WhatsApp and your notes.",
  },
  {
    title: "Quote and close with context",
    body: "Every quote, note, and stage transition stays attached to the lead so you can move faster on the next call.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="grid-rhythm relative overflow-hidden">
        <div className="page-shell min-h-screen py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="fade-up inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white">
                RY
              </div>
              <div>
                <p className="text-lg font-semibold">Relay</p>
                <p className="text-sm text-muted">Lead memory for lean agencies</p>
              </div>
            </Link>
            <div className="fade-up fade-delay-1 flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:bg-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-foreground px-5 py-2 text-sm text-white transition hover:bg-accent"
              >
                Start free
              </Link>
            </div>
          </div>

          <div className="grid items-end gap-12 pb-10 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
            <div className="max-w-3xl">
              <p className="eyebrow fade-up">Manual-first WhatsApp lead manager</p>
              <h1 className="display fade-up fade-delay-1 mt-5 text-5xl leading-[0.96] tracking-tight text-balance md:text-7xl">
                Keep every lead, follow-up, and quote in motion.
              </h1>
              <p className="fade-up fade-delay-2 mt-6 max-w-xl text-lg leading-8 text-muted text-balance">
                Relay is built for agency owners who still receive business through DMs and calls but need a clean
                operating system to close consistently.
              </p>
              <div className="fade-up fade-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/app/dashboard"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
                >
                  Open product preview
                </Link>
                <Link
                  href="/onboarding"
                  className="rounded-full border border-line bg-white/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white"
                >
                  Walk through setup
                </Link>
              </div>
            </div>

            <div className="fade-up fade-delay-2 glass-panel relative overflow-hidden rounded-[36px] p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(17,122,101,0.28),transparent_65%)]" />
              <div className="relative">
                <p className="eyebrow">Today at a glance</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] bg-white p-5">
                    <p className="text-sm text-muted">Follow-ups due today</p>
                    <p className="mt-3 text-4xl font-semibold">3</p>
                    <p className="mt-2 text-sm text-muted">Two warm leads, one overdue callback.</p>
                  </div>
                  <div className="rounded-[28px] bg-foreground p-5 text-white">
                    <p className="text-sm text-white/65">Quotations sent</p>
                    <p className="mt-3 text-4xl font-semibold">12</p>
                    <p className="mt-2 text-sm text-white/70">Active this month across all service lines.</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[28px] border border-line bg-white/90 p-5">
                  <p className="text-sm font-semibold">Why agencies stick with it</p>
                  <ul className="mt-4 space-y-3">
                    {proof.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="border-t border-line pt-6">
              <p className="text-sm text-muted">0{index + 1}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-16 md:pb-24">
        <div className="rounded-[40px] bg-foreground px-6 py-10 text-white md:px-10 md:py-14">
          <p className="eyebrow text-white/65">Start free</p>
          <h2 className="display mt-4 max-w-2xl text-4xl leading-tight text-balance md:text-5xl">
            Built for the founder who still wins business from conversations.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            Launch with a clean dashboard, manual lead intake, and in-app follow-up memory. Add billing, team seats,
            and automation after the workflow proves itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground">
              Create account
            </Link>
            <Link
              href="/app/dashboard"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85"
            >
              View app prototype
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
