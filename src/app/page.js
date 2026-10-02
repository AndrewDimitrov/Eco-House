import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Your house makes money while you sleep
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
          Eco-House is an idle game about cutting a house&apos;s energy bill to nothing. Bank
          every watt, upgrade the wiring, and watch the numbers climb — even when the game is
          closed.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/download"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-neutral-950 transition hover:bg-emerald-400"
          >
            Download
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-lg border border-neutral-700 px-5 py-2.5 font-semibold transition hover:border-neutral-500"
            >
              Your house
            </Link>
          ) : (
            <Link
              href="/signup"
              className="rounded-lg border border-neutral-700 px-5 py-2.5 font-semibold transition hover:border-neutral-500"
            >
              Create an account
            </Link>
          )}
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {[
            ["Earn while away", "The meter keeps spinning after you close the game."],
            ["Upgrade the grid", "LEDs, solar, batteries. Each tier compounds the last."],
            ["Cut the draw", "Every upgrade lowers consumption as it raises output."],
            ["Chase net zero", "Push output past draw and the house pays you back."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-medium text-emerald-400">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
