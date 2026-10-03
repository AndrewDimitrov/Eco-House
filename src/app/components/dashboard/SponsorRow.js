import { SPONSORS } from "@/lib/sponsors";
import SponsorCard from "./SponsorCard";

export default function SponsorRow() {
  return (
    <section aria-labelledby="aff-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[.18em] text-ink-soft">
            For your real home
          </p>
          <h2 id="aff-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            Upgrades that match the game
          </h2>
        </div>
        {/* These are examples, not partnerships. Keep this honest until one exists. */}
        <p className="font-mono text-[11px] text-ink-soft">
          Examples only · no affiliate deals or partnerships
        </p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPONSORS.map((s) => (
          <SponsorCard key={s.name} item={s} />
        ))}
      </ul>
    </section>
  );
}
