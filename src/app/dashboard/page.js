import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBonusState } from "@/lib/bonus";
import BonusCard from "@/app/components/BonusCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Your house · Eco-House" };

const TIPS = [
  {
    title: "Kill standby draw",
    body: "A TV, console, and charger left plugged in can cost more over a year than a month of cooking. A switched power strip solves most of it.",
  },
  {
    title: "Wash cold",
    body: "Around 90% of a washing machine's energy heats the water. Modern detergents work fine at 30°C.",
  },
  {
    title: "Seal before you heat",
    body: "Draught-proofing a door costs little and pays back faster than almost any appliance upgrade.",
  },
  {
    title: "Shift the heavy loads",
    body: "Running the dishwasher off-peak uses the same energy but a cleaner, cheaper slice of the grid.",
  },
];

const SPONSORS = [
  { name: "Smart power strips", blurb: "Cuts standby draw automatically." },
  { name: "LED lighting", blurb: "80% less draw than halogen, same light." },
  { name: "Home energy monitors", blurb: "See which appliance is the problem." },
];

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const bonus = await getBonusState(session.username);

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.username}
        </h1>
        <p className="mt-2 text-neutral-400">
          Your account is live. Game stats appear here once the Unity build starts syncing.
        </p>

        <div className="mt-8">
          <BonusCard streak={bonus.streak} claimedToday={bonus.claimedToday} />
        </div>

        {/* Eco tips */}
        <section className="mt-10">
          <h2 className="font-semibold">Save more, outside the game</h2>
          <p className="mt-1 text-sm text-neutral-400">
            The same upgrades, in the house you actually live in.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TIPS.map((t) => (
              <div key={t.title} className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
                <p className="font-medium text-emerald-400">{t.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section className="mt-10">
          <h2 className="font-semibold">Energy-saving products</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Partner slots. Nothing is linked yet — these are placeholders.
          </p>
          <div className="mt-4 space-y-2">
            {SPONSORS.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-xl border border-dashed border-neutral-800 p-4"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-neutral-500">{s.blurb}</p>
                </div>
                <span className="text-xs text-neutral-600">Slot open</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            When partners are added, links here may earn a commission. That will be disclosed
            on the link itself.
          </p>
        </section>
      </div>
    </main>
  );
}
