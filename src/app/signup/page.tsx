import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { getAuthContext } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const auth = await getAuthContext();

  if (auth?.workspace) {
    redirect("/app/dashboard");
  }

  return (
    <main className="page-shell flex min-h-screen items-center justify-center py-10">
      <div className="glass-panel w-full max-w-2xl rounded-[32px] p-8 md:p-10">
        <p className="eyebrow">Start free</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Create your agency workspace in one flow.
        </h1>
        <SignupForm />
        <div className="mt-6 rounded-[24px] bg-[rgba(17,122,101,0.08)] p-5">
          <p className="text-sm font-semibold">Free-first launch model</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            V1 keeps all core workflow features available while the product validates fit. Usage limits and billing can
            be introduced later without changing the data model.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-line px-6 py-3 text-sm font-semibold">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
