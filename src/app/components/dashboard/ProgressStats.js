import PixelIcon from "@/app/components/ui/PixelIcon";

const fmt = (n) => n.toLocaleString("en-US");

function Stat({ icon, label, value, unit, note }) {
  return (
    <div className="py-6 sm:px-7 sm:first:pl-0">
      <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] text-ink-soft">
        <PixelIcon name={icon} className="h-3.5 w-3.5 text-brand" />
        {label}
      </dt>
      <dd className="mt-3">
        <span className="font-pixel text-[36px] leading-none text-ink">{value}</span>
        {unit && <span className="ml-2 font-mono text-xs text-ink-soft">{unit}</span>}
        {note && <p className="mt-2 text-[13px] text-ink-soft">{note}</p>}
      </dd>
    </div>
  );
}

export default function ProgressStats({ stats, rank, totalPlayers }) {
  const synced = stats.lastSync
    ? new Date(stats.lastSync).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div>
      <dl className="grid grid-cols-2 divide-line border-y border-line lg:grid-cols-4 lg:divide-x">
        <Stat icon="coin" label="Coins" value={fmt(stats.coins)} />
        <Stat
          icon="leaf"
          label="Eco points"
          value={fmt(stats.ecoPoints)}
          note="Earned in game + from the blog"
        />
        <Stat icon="bolt" label="Energy saved" value={fmt(stats.kwhSaved)} unit="kWh" />
        <Stat
          icon="trophy"
          label="Rank"
          value={rank ? `#${rank}` : "—"}
          note={rank ? `of ${fmt(totalPlayers)} players` : "Not on the board yet"}
        />
      </dl>

      {synced && (
        <p className="mt-3 font-mono text-[11px] text-ink-soft">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
          Last synced from the game · {synced}
        </p>
      )}
    </div>
  );
}
