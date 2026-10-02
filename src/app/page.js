import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Eco-House</h1>

        {session ? (
          <p className="mt-3 text-neutral-400">
            Logged in as <span className="text-neutral-100">{session.username}</span>. The
            rest of the site is still being built.
          </p>
        ) : (
          <>
            <p className="mt-3 text-neutral-400">
              Companion site for the Eco-House game. Accounts are live — the rest is still
              being built.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-neutral-950 transition hover:bg-emerald-400"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-neutral-700 px-4 py-2 font-semibold transition hover:border-neutral-500"
              >
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
