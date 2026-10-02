"use client";

import { useActionState } from "react";
import { claimBonusAction } from "@/app/actions/bonus";

export default function BonusCard({ streak, claimedToday }) {
  const [state, action, pending] = useActionState(claimBonusAction, null);
  const claimed = claimedToday || (state && !state.error);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Daily bonus</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Check in each day to build a streak. Rewards carry into the game.
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-neutral-800 px-3 py-1.5 text-sm">
          <span className="font-mono font-bold text-emerald-400">
            {state?.streak ?? streak}
          </span>
          <span className="ml-1 text-neutral-400">day streak</span>
        </span>
      </div>

      {state?.error && <p className="mt-3 text-sm text-amber-400">{state.error}</p>}

      <form action={action} className="mt-4">
        <button
          type="submit"
          disabled={pending || claimed}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {pending ? "Claiming…" : claimed ? "Claimed today" : "Claim today's bonus"}
        </button>
      </form>
    </div>
  );
}
