import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBonusState } from "@/lib/bonus";
import { getPlayerStats, getPlayerRank } from "@/lib/stats";
import { impactFromKwh } from "@/lib/leaderboard";
import { SPONSORS } from "@/lib/sponsors";
import { ARTICLES } from "@/lib/articles";
import { logOutAction } from "@/app/actions/auth";
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
    { label: "Energy saved", value: fmt(stats.kwhSaved), unit: "kWh" },
    { label: "Coins", value: fmt(stats.coins), unit: "" },
    { label: "Rank", value: rank ? `#${rank}` : "—", unit: "" },
    { label: "Upgrades", value: fmt(stats.upgradesOwned), unit: "owned" },
    { label: "Houses", value: fmt(stats.housesCompleted), unit: "completed" },
    { label: "Tier", value: stats.tier, unit: "" },
  ];

  return (
    <main className="flex-1">
      {/* Banner — the only thing at the top, links out to the public site */}
      <div className="border-b border-neutral-800 bg-emerald-950/30">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm">
          <p className="text-neutral-300">
            Want to cut your real bill?{" "}
            <Link href="/learn" className="font-medium text-emerald-400 hover:underline">
              Read the energy guides →
            </Link>
          </p>
          <form action={logOutAction}>
            <button
              type="submit"
              className="text-neutral-500 transition hover:text-neutral-300"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.username}
        </h1>
        <p className="mt-1.5 text-neutral-400">
          {neverSynced
            ? "Your stats fill in once the game syncs your save."
            : `Last synced ${new Date(stats.lastSync).toLocaleDateString("en-GB")}.`}
        </p>

        {/* Stats cards */}
        <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5"
            >
              <p className="text-xs uppercase tracking-wider text-neutral-500">{s.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-400">{s.value}</p>
              {s.unit && <p className="mt-0.5 text-xs text-neutral-500">{s.unit}</p>}
            </div>
          ))}
        </section>

        {stats.kwhSaved > 0 && (
          <p className="mt-4 text-sm text-neutral-400">
            That is roughly <span className="text-neutral-200">{fmt(impact.co2Kg)} kg</span> of
            CO₂ avoided — about {fmt(impact.trees, 1)} trees working for a year.
          </p>
        )}

        {/* Daily coins */}
        <section className="mt-8">
          <BonusCard streak={bonus.streak} claimedToday={bonus.claimedToday} />
        </section>

        {/* Promo cards */}
        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">Cut your real bill</h2>
          <p className="mt-1 text-sm text-neutral-400">
            The real-world versions of the upgrades in the game.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPONSORS.map((s) => (
              <div
                key={s.name}
                className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition hover:border-neutral-600"
              >
                <span className="self-start rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-400">
                  {s.category}
                </span>
                <p className="mt-3 font-semibold">{s.name}</p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-neutral-400">
                  {s.blurb}
                </p>
                <p className="mt-4 border-t border-neutral-800 pt-3 text-sm font-medium text-emerald-400">
                  {s.saving}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Listed as examples of what works. Eco-House is not affiliated with these brands and
            earns nothing from them. If that changes, it will say so here.
          </p>
        </section>

        {/* Learn cards */}
        <section className="mt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold tracking-tight">Read up</h2>
            <Link href="/learn" className="text-sm text-emerald-400 hover:underline">
              All articles
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}`}
                className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition hover:border-neutral-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{a.title}</p>
                  <span className="shrink-0 text-xs text-neutral-500">{a.readTime}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{a.summary}</p>
                <span className="mt-4 text-sm font-medium text-emerald-400">Read →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
