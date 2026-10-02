import Link from "next/link";
import { getSession } from "@/lib/session";
import { logOutAction } from "@/app/actions/auth";

export default async function SiteNav() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-tight">
          Eco<span className="text-emerald-400">House</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {session ? (
            <>
              <span className="text-neutral-400">
                Signed in as <span className="text-neutral-200">{session.username}</span>
              </span>
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
