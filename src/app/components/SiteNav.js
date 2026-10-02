import Link from "next/link";

export default function SiteNav() {
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
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-neutral-400 transition hover:text-neutral-100">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-emerald-500 px-3 py-1.5 font-semibold text-neutral-950 transition hover:bg-emerald-400"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
