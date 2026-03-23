import { PageIntro } from "@/components/page-intro";
import { requireAuth } from "@/lib/auth";
import { getTemplates } from "@/lib/data";

export default async function TemplatesPage() {
  const { workspace } = await requireAuth();
  const templates = await getTemplates(workspace.id);
  const quoteTemplates = templates.filter((template) => template.type === "quote");
  const replyTemplates = templates.filter((template) => template.type === "whatsapp_reply");

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Templates"
        title="Keep your best quote structure and first-response copy reusable."
        description="Templates are a good monetization boundary later, but V1 keeps them simple and visible so the workflow feels complete from day one."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Quote templates</p>
          <div className="mt-5 space-y-4">
            {quoteTemplates.map((template) => (
              <div key={template.id} className="rounded-[24px] bg-white/80 p-4">
                <p className="font-semibold">{template.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{template.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="app-surface rounded-[28px] p-6">
          <p className="text-sm font-semibold">Reply templates</p>
          <div className="mt-5 space-y-4">
            {replyTemplates.map((template) => (
              <div key={template.id} className="rounded-[24px] bg-white/80 p-4">
                <p className="font-semibold">{template.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{template.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
