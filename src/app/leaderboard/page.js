import { getTopSavers, getTotalSaved, impactFromKwh } from "@/lib/leaderboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leaderboard · Eco-House",
  description: "The biggest energy savers in Eco-House, and what it adds up to.",
};

function fmt(n, digits = 0) {
  return n.toLocaleString("en-GB", { maximumFractionDigits: digits });
}

export default async function LeaderboardPage() {
  let savers = [];
  let totals = { total: 0, players: 0 };
  let error = null;

  try {
    [savers, totals] = await Promise.all([getTopSavers(20), getTotalSaved()]);
  } catch (e) {
    error = e.message;
  }

  const impact = impactFromKwh(totals.total);

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-neutral-400">
          Ranked by energy saved in-game. Every kilowatt-hour here mirrors a real one.
        </p>

        {/* Collective impact */}
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

        {/* Why it matters */}
        <section className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
          <h2 className="font-semibold">Where the energy goes</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            Roughly a quarter of household electricity is wasted — standby draw, poor insulation,
            and old appliances running harder than they need to. The upgrades in Eco-House mirror
            the ones that work in a real house, in roughly the order they pay for themselves.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            {[
              ["Standby power", "Devices left plugged in draw 5-10% of a typical bill."],
              ["Lighting", "Swapping halogen for LED cuts that load by about 80%."],
              ["Heating and cooling", "The largest single draw in most homes, and the most sensitive to insulation."],
            ].map(([term, detail]) => (
              <li key={term} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <span className="text-neutral-200">{term}.</span> {detail}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
