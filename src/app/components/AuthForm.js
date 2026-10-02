"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

function PasswordField({ id, label, autoComplete, hint }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 pr-11 outline-none focus:border-neutral-500"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center text-neutral-500 transition hover:text-neutral-200"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            {!visible && <path d="m4 20 16-16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default function AuthForm({ mode, action }) {
  const [state, formAction, pending] = useActionState(action, null);
  const isSignUp = mode === "signup";

  return (
    <form action={formAction} className="w-full max-w-sm">
      <h1 className="text-2xl font-bold tracking-tight">
        {isSignUp ? "Create an account" : "Log in"}
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        {isSignUp
          ? "Pick a username — it's the name shown on the leaderboard."
          : "Welcome back to Eco-House."}
      </p>

      {state?.error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            maxLength={20}
            className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
          {isSignUp && (
            <p className="mt-1.5 text-xs text-neutral-500">
              3–20 characters. Letters, numbers, and underscores.
            </p>
          )}
        </div>

        <PasswordField
          id="password"
          label="Password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          hint={isSignUp ? "At least 8 characters." : null}
        />

        {isSignUp && (
          <PasswordField
            id="confirm"
            label="Confirm password"
            autoComplete="new-password"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {pending ? "Please wait…" : isSignUp ? "Create account" : "Log in"}
      </button>

      <p className="mt-5 text-center text-sm text-neutral-400">
        {isSignUp ? "Already have an account? " : "No account yet? "}
        <Link
          href={isSignUp ? "/login" : "/signup"}
          className="font-medium text-emerald-400 hover:underline"
        >
          {isSignUp ? "Log in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
