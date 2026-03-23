"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/auth-actions";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/leads", label: "Leads" },
  { href: "/app/follow-ups", label: "Follow-ups" },
  { href: "/app/quotes", label: "Quotes" },
  { href: "/app/templates", label: "Templates" },
  { href: "/app/settings", label: "Settings" },
];

export function AppShell({
  children,
  currentUser,
  workspace,
}: {
  children: React.ReactNode;
  currentUser: {
    name: string;
    email: string;
  };
  workspace: {
    name: string;
  };
}) {
  const currentPath = usePathname();

  return (
    <div className="min-h-screen bg-transparent">
      <div className="page-shell py-5 md:py-8">
        <div className="glass-panel rounded-[32px]">
          <div className="grid min-h-[calc(100vh-4rem)] gap-0 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="border-b border-line p-6 lg:border-r lg:border-b-0">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white">
                  RY
                </div>
                <div>
                  <p className="text-lg font-semibold">Relay</p>
                  <p className="text-sm text-muted">{workspace.name}</p>
                </div>
              </Link>
              <nav className="mt-8 space-y-1">
                {nav.map((item) => {
                  const active = currentPath.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition",
                        active
                          ? "bg-accent text-white"
                          : "text-muted hover:bg-white hover:text-foreground",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className={cn("text-xs", active ? "text-white/60" : "text-muted")}>
                        /
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8 rounded-[24px] bg-[rgba(17,122,101,0.08)] p-4">
                <p className="text-sm font-semibold">V1 reminder system</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  In-app reminders only for now. Email, calendar, and billing are left ready for V2.
                </p>
              </div>
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-sm text-muted">{currentUser.email}</p>
                <form action={logoutAction} className="mt-4">
                  <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition hover:bg-white hover:text-foreground">
                    Log out
                  </button>
                </form>
              </div>
            </aside>
            <main className="p-5 md:p-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
