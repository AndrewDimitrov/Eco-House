"use client";

import Link from "next/link";
import { useActionState } from "react";

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
          {isSignUp && (
            <p className="mt-1.5 text-xs text-neutral-500">At least 8 characters.</p>
          )}
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
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
