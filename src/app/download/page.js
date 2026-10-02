import Link from "next/link";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Download · Eco-House",
  description: "Get the Eco-House game for Windows, macOS, or Linux.",
};

const BUILDS = [
  { os: "Windows", meta: "Windows 10+ · 64-bit" },
  { os: "macOS", meta: "Apple Silicon & Intel" },
  { os: "Linux", meta: "AppImage · x86_64" },
];

export default async function DownloadPage() {
  const session = await getSession();

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Download Eco-House</h1>
        <p className="mt-2 text-neutral-400">
          Built in Unity. Free while in development.
        </p>

        <div className="mt-8 space-y-3">
          {BUILDS.map((b) => (
            <div
              key={b.os}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 p-4"
            >
              <div>
                <p className="font-medium">{b.os}</p>
                <p className="text-sm text-neutral-500">{b.meta}</p>
              </div>
              <span className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-500">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Builds are not published yet. This page will link them when the first release ships.
        </p>

        {!session && (
          <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
            <p className="font-medium">Make an account first</p>
            <p className="mt-1 text-sm text-neutral-400">
              Your account links the game to the leaderboard and keeps your progress tied to a
              name.
            </p>
            <Link
              href="/signup"
              className="mt-3 inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
