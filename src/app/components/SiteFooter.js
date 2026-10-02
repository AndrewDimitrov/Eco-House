import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Eco-House</p>
        <div className="flex gap-5">
          <Link href="/#leaderboard" className="transition hover:text-neutral-300">
            Leaderboard
          </Link>
          <Link href="/learn" className="transition hover:text-neutral-300">
            Learn
          </Link>
          <Link href="/#download" className="transition hover:text-neutral-300">
            Download
          </Link>
        </div>
      </div>
    </footer>
  );
}
