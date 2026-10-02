import Link from "next/link";
import { getSession } from "@/lib/session";
import { getTopSavers, getTotalSaved, impactFromKwh } from "@/lib/leaderboard";

export const dynamic = "force-dynamic";

function fmt(n, digits = 0) {
  return n.toLocaleString("en-GB", { maximumFractionDigits: digits });
}

const BUILDS = [
  { os: "Windows", meta: "Windows 10+ · 64-bit" },
  { os: "macOS", meta: "Apple Silicon & Intel" },
  { os: "Linux", meta: "AppImage · x86_64" },
];

export default async function Home() {
  const session = await getSession();

  let savers = [];
  let totals = { total: 0, players: 0 };
  let error = null;

  try {
    [savers, totals] = await Promise.all([getTopSavers(10), getTotalSaved()]);
  } catch (e) {
    error = e.message;
  }

  const impact = impactFromKwh(totals.total);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your house makes money while you sleep
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            Eco-House is an idle game about cutting a house&apos;s energy bill to nothing. Bank
            every watt, upgrade the wiring, and watch the numbers climb — even when the game is
            closed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#download"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-neutral-950 transition hover:bg-emerald-400"
            >
              Download
            </a>
            <a
              href="#leaderboard"
              className="rounded-lg border border-neutral-700 px-5 py-2.5 font-semibold transition hover:border-neutral-500"
            >
              Leaderboard
            </a>
            {!session && (
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
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" className="scroll-mt-20 border-t border-neutral-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Best savers</h2>
          <p className="mt-2 text-neutral-400">
            Ranked by energy saved in-game. Every kilowatt-hour here mirrors a real one.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Energy saved", value: `${fmt(totals.total)} kWh`, hint: "across all players" },
              { label: "CO₂ avoided", value: `${fmt(impact.co2Kg)} kg`, hint: "at 250g per kWh" },
              { label: "Equivalent trees", value: fmt(impact.trees, 1), hint: "working for a year" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <p className="text-xs uppercase tracking-wider text-neutral-500">{s.label}</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{s.value}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{s.hint}</p>
              </div>
            ))}
          </div>

          {error ? (
            <p className="mt-8 rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">
              Leaderboard unavailable: {error}
            </p>
          ) : savers.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-neutral-800 p-10 text-center">
              <p className="font-medium">No runs submitted yet</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-neutral-500">
                Scores appear once the game starts sending them. This table reads live from the
                database.
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-hidden rounded-xl border border-neutral-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-900 text-xs uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Player</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">CO₂ avoided</th>
                    <th className="px-4 py-3 text-right font-medium">Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {savers.map((s) => (
                    <tr key={s.username} className="hover:bg-neutral-900/50">
                      <td className="px-4 py-3 font-mono text-neutral-500">{s.rank}</td>
                      <td className="px-4 py-3 font-medium">{s.username}</td>
                      <td className="hidden px-4 py-3 text-neutral-400 sm:table-cell">
                        {fmt(impactFromKwh(s.kwhSaved).co2Kg)} kg
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-400">
                        {fmt(s.kwhSaved)} kWh
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section id="about" className="scroll-mt-20 border-t border-neutral-800 bg-neutral-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Where the energy goes</h2>
          <p className="mt-4 leading-relaxed text-neutral-400">
            Roughly a quarter of household electricity is wasted — standby draw, poor insulation,
            and old appliances running harder than they need to. The upgrades in Eco-House mirror
            the ones that work in a real house, in roughly the order they pay for themselves.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              ["Standby power", "Devices left plugged in draw 5–10% of a typical bill, doing nothing."],
              ["Lighting", "Swapping halogen for LED cuts that load by about 80% for the same light."],
              ["Heating & cooling", "The largest single draw in most homes, and the most sensitive to insulation."],
            ].map(([term, detail]) => (
              <div key={term} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                <p className="font-medium text-emerald-400">{term}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-neutral-500">
            The game&apos;s numbers are scaled for play, but the ordering is real: the cheapest
            fixes come first, and they are usually the ones people skip.
          </p>

          <Link
            href="/learn"
            className="mt-4 inline-block rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold transition hover:border-neutral-500"
          >
            Read the full guides
          </Link>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="scroll-mt-20 border-t border-neutral-800 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Download</h2>
          <p className="mt-2 text-neutral-400">Built in Unity. Free while in development.</p>

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
            Builds are not published yet. Links appear here when the first release ships.
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
      </section>
    </main>
  );
}
