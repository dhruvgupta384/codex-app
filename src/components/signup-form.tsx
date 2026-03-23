"use client";

import { useActionState } from "react";
import { signupAction } from "@/app/auth-actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState = { error: "" };

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="mt-8 grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Name</span>
        <input name="name" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Agency name</span>
        <input name="agencyName" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Work email</span>
        <input name="email" type="email" className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          minLength={8}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none"
        />
      </label>
      {state.error ? (
        <p className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}
      <div className="mt-2 md:col-span-2">
        <AuthSubmitButton label="Continue setup" />
      </div>
    </form>
  );
}
