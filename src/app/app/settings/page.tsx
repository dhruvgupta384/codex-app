import { PageIntro } from "@/components/page-intro";
import { requireAuth } from "@/lib/auth";

const leadStages = ["new", "contacted", "interested", "quotation_sent", "won", "lost"];

export default async function SettingsPage() {
  const { workspace } = await requireAuth();

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Settings"
        title="Workspace rules stay lightweight in V1, but the structure is ready to grow."
        description="Solo-owner access for launch, editable stages later, and room for billing or team seats without changing the shape of the app."
      />

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Workspace profile</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Agency name</dt>
              <dd>{workspace.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Industry</dt>
              <dd>{workspace.industryType}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Timezone</dt>
              <dd>{workspace.timezone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Plan</dt>
              <dd>Free-first launch</dd>
            </div>
          </dl>
        </div>

        <div className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Lead stages</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {leadStages.map((stage) => (
              <span key={stage} className="rounded-full bg-white px-4 py-2 text-sm capitalize">
                {stage.replace("_", " ")}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-white/80 p-4">
              <p className="text-sm font-semibold">Reminder policy</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                In-app follow-ups only in V1. Email and calendar sync are intentionally deferred.
              </p>
            </div>
            <div className="rounded-[24px] bg-white/80 p-4">
              <p className="text-sm font-semibold">Future-ready additions</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Team members, subscriptions, exports, and integrations can be added against the current workspace and
                lead models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
