import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { getAuthContext } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const auth = await getAuthContext();

  if (auth?.workspace) {
    redirect("/app/dashboard");
  }

  return (
    <main className="page-shell flex min-h-screen items-center justify-center py-10">
      <div className="glass-panel w-full max-w-md rounded-[32px] p-8">
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Log in to Relay</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          This prototype uses static routes. Use the CTA below to enter the app experience directly.
        </p>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-foreground">
            Create an account
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-muted">Demo login: owner@northstargrowth.com / demo12345</p>
      </div>
    </main>
  );
}
