"use client";

import { useFormStatus } from "react-dom";

export function AuthSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Please wait..." : label}
    </button>
  );
}
