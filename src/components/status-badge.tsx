import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  new: "bg-white text-foreground",
  contacted: "bg-stone-200 text-stone-700",
  interested: "bg-emerald-100 text-emerald-800",
  quotation_sent: "bg-amber-100 text-amber-800",
  won: "bg-teal-700 text-white",
  lost: "bg-rose-100 text-rose-700",
  pending: "bg-amber-100 text-amber-900",
  done: "bg-stone-200 text-stone-700",
  sent: "bg-amber-100 text-amber-900",
  accepted: "bg-teal-700 text-white",
  rejected: "bg-rose-100 text-rose-700",
  draft: "bg-stone-100 text-stone-700",
};

export function StatusBadge({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
        styles[value] ?? "bg-stone-200 text-stone-700",
        className,
      )}
    >
      {value.replaceAll("_", " ")}
    </span>
  );
}
