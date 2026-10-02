import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBonusState } from "@/lib/bonus";
import { getPlayerStats, getPlayerRank } from "@/lib/stats";
import { impactFromKwh } from "@/lib/leaderboard";
import { SPONSORS } from "@/lib/sponsors";
import { ARTICLES } from "@/lib/articles";
import BonusCard from "@/app/components/BonusCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Your house · Eco-House" };

function fmt(n, digits = 0) {
  return n.toLocaleString("en-GB", { maximumFractionDigits: digits });
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [bonus, stats, rank] = await Promise.all([
    getBonusState(session.username),
    getPlayerStats(session.username),
    getPlayerRank(session.username),
  ]);

  const impact = impactFromKwh(stats.kwhSaved);
  const neverSynced = !stats.lastSync;

  const STATS = [
    { label: "Energy saved", value: `${fmt(stats.kwhSaved)} kWh` },
    { label: "Coins", value: fmt(stats.coins) },
    { label: "Leaderboard rank", value: rank ? `#${rank}` : "—" },
    { label: "Upgrades owned", value: fmt(stats.upgradesOwned) },
    { label: "Houses completed", value: fmt(stats.housesCompleted) },
    { label: "Current tier", value: stats.tier },
  ];

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.username}
        </h1>
        <p className="mt-2 text-neutral-400">
          Your progress, your rewards, and a few ways to save outside the game.
        </p>

        {/* In-game stats */}
        <section className="mt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Your stats</h2>
            <span className="text-xs text-neutral-500">
              {neverSynced
                ? "Not synced yet"
                : `Last sync ${new Date(stats.lastSync).toLocaleDateString("en-GB")}`}
            </span>
          </div>

          {neverSynced && (
            <p className="mt-3 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-neutral-400">
              Nothing here yet. Stats fill in once the game syncs your save — coins you claim
              below are stored and applied then.
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <p className="text-xs uppercase tracking-wider text-neutral-500">{s.label}</p>
                <p className="mt-1 text-xl font-bold text-emerald-400">{s.value}</p>
              </div>
            ))}
          </div>

          {stats.kwhSaved > 0 && (
            <p className="mt-3 text-sm text-neutral-400">
              That is roughly <span className="text-neutral-200">{fmt(impact.co2Kg)} kg</span> of
              CO₂ avoided — about {fmt(impact.trees, 1)} trees working for a year.
            </p>
          )}
        </section>

        {/* Daily coins */}
        <section className="mt-10">
          <BonusCard streak={bonus.streak} claimedToday={bonus.claimedToday} />
        </section>

        {/* Sponsors */}
        <section className="mt-10">
          <h2 className="font-semibold">Products that cut real bills</h2>
          <p className="mt-1 text-sm text-neutral-400">
            The real-world versions of the upgrades in the game.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SPONSORS.map((s) => (
              <div key={s.name} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{s.name}</p>
                  <span className="shrink-0 rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400">
                    {s.category}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{s.blurb}</p>
                <p className="mt-2 text-xs text-emerald-400">{s.saving}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Listed as examples of what works. Eco-House is not affiliated with any of these
            brands and earns nothing from them. If that changes, it will say so here.
          </p>
        </section>

        {/* Learn */}
        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Read up</h2>
            <Link href="/learn" className="text-sm text-emerald-400 hover:underline">
              All articles
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {ARTICLES.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition hover:border-neutral-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{a.title}</p>
                  <span className="shrink-0 text-xs text-neutral-500">{a.readTime}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-400">{a.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
