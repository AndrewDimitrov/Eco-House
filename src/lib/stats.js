import { getDb } from "@/lib/mongodb";

// Stats are written by the game; the site only reads them. A player who has
// never synced gets zeroes rather than an error.
const EMPTY = {
  kwhSaved: 0,
  coins: 0,
  housesCompleted: 0,
  upgradesOwned: 0,
  tier: "Starter",
  playTimeMinutes: 0,
  lastSync: null,
};

export async function getPlayerStats(username) {
  const db = await getDb();
  const doc = await db
    .collection("stats")
    .findOne({ username }, { projection: { _id: 0, username: 0 } });

  return { ...EMPTY, ...doc };
}

export async function getPlayerRank(username) {
  const db = await getDb();
  const me = await db.collection("savings").findOne({ username });
  if (!me) return null;

  const ahead = await db
    .collection("savings")
    .countDocuments({ kwhSaved: { $gt: me.kwhSaved } });

  return ahead + 1;
}

export async function addCoins(username, amount, reason) {
  const db = await getDb();
  await db.collection("stats").updateOne(
    { username },
    {
      $inc: { coins: amount },
      $setOnInsert: { username },
      $set: { lastReward: { amount, reason, at: new Date() } },
    },
    { upsert: true },
  );
}
