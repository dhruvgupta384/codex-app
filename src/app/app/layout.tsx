import { AppShell } from "@/components/app-shell";
import { requireAuth } from "@/lib/auth";

export default async function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, workspace } = await requireAuth();

  return (
    <AppShell
      currentUser={{ name: user.name, email: user.email }}
      workspace={{ name: workspace.name }}
    >
      {children}
    </AppShell>
  );
}
