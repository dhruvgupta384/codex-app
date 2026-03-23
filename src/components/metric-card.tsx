import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  tone = "default",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "accent" | "warning";
}) {
  return (
    <article
      className={cn(
        "app-surface rounded-[28px] p-5",
        tone === "accent" && "bg-accent text-white",
        tone === "warning" && "bg-[rgba(174,109,32,0.12)]",
      )}
    >
      <p className={cn("text-sm", tone === "accent" ? "text-white/70" : "text-muted")}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className={cn("mt-3 text-sm", tone === "accent" ? "text-white/75" : "text-muted")}>
        {detail}
      </p>
    </article>
  );
}
