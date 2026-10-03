import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBonusState } from "@/lib/bonus";
import { getPlayerStats, getPlayerRank } from "@/lib/stats";
import { getTotalSaved } from "@/lib/leaderboard";
import { ARTICLES } from "@/lib/articles";
import SponsorRow from "@/app/components/dashboard/SponsorRow";
import ProgressStats from "@/app/components/dashboard/ProgressStats";
import PlayPrompt from "@/app/components/dashboard/PlayPrompt";
import DailyBonus from "@/app/components/dashboard/DailyBonus";
import BlogBanner from "@/app/components/dashboard/BlogBanner";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard · Eco-House" };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [bonus, stats, rank, totals] = await Promise.all([
    getBonusState(session.username),
    getPlayerStats(session.username),
    getPlayerRank(session.username),
    getTotalSaved(),
  ]);

  // No sync yet means there's nothing to show but an invitation to play.
  const hasPlayed = Boolean(stats.lastSync);

  return (
    <main className="mx-auto max-w-[1320px] space-y-16 px-5 py-12 sm:px-8 sm:py-16">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[.18em] text-ink-soft">Dashboard</p>
        <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-.03em] text-ink sm:text-[44px]">
          Hi, {session.username}.
        </h1>
      </header>

      <SponsorRow />

      <section aria-labelledby="prog-title">
        <h2 id="prog-title" className="text-2xl font-semibold tracking-tight text-ink">
          Your game
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {hasPlayed ? (
            <ProgressStats stats={stats} rank={rank} totalPlayers={totals.players} />
          ) : (
            <PlayPrompt />
          )}
          <DailyBonus streak={bonus.streak} claimedToday={bonus.claimedToday} />
        </div>
      </section>

      <BlogBanner guide={ARTICLES[1]} />
    </main>
  );
}
