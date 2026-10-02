import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Learn · Eco-House",
  description:
    "Where household energy actually goes, and which changes are worth making first.",
};

export default function LearnPage() {
  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
        <p className="mt-2 max-w-xl text-neutral-400">
          The game compresses years into an afternoon. These are the same ideas at real scale —
          what actually uses the power, and which fixes are worth doing first.
        </p>

        <div className="mt-8 space-y-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className="block rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition hover:border-neutral-600"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold">{a.title}</h2>
                <span className="shrink-0 text-xs text-neutral-500">{a.readTime}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{a.summary}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-neutral-500">
          Figures are typical European household averages and vary by home, climate, and tariff.
          They are here to show the order of magnitude, not to price your specific bill.
        </p>
      </div>
    </main>
  );
}
