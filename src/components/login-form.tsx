"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/auth-actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState = { error: "" };

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          defaultValue="owner@northstargrowth.com"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          defaultValue="demo12345"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none"
        />
      </label>
      {state.error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}
      <AuthSubmitButton label="Continue to dashboard" />
    </form>
  );
}
