import Link from "next/link";
import { getSession } from "@/lib/session";
import { logOutAction } from "@/app/actions/auth";

export default async function SiteNav() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-800">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight">
            Eco<span className="text-emerald-400">House</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <Link href="/#leaderboard" className="transition hover:text-neutral-100">
              Leaderboard
            </Link>
            <Link href="/learn" className="transition hover:text-neutral-100">
              Learn
            </Link>
            <Link href="/#download" className="transition hover:text-neutral-100">
              Download
            </Link>
            {session && (
              <Link href="/dashboard" className="transition hover:text-neutral-100">
                Your house
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {session ? (
            <>
              <span className="hidden text-neutral-400 sm:inline">{session.username}</span>
              <form action={logOutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-neutral-700 px-3 py-1.5 transition hover:border-neutral-500"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-neutral-400 transition hover:text-neutral-100">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-emerald-500 px-3 py-1.5 font-semibold text-neutral-950 transition hover:bg-emerald-400"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
