import { getDb } from "@/lib/mongodb";

// Grams of CO2 avoided per kWh saved, roughly the EU grid average.
const CO2_G_PER_KWH = 250;
// A mature tree absorbs about 21kg of CO2 a year.
const CO2_KG_PER_TREE_YEAR = 21;

export function impactFromKwh(kwh) {
  const co2Kg = (kwh * CO2_G_PER_KWH) / 1000;
  return {
    co2Kg,
    trees: co2Kg / CO2_KG_PER_TREE_YEAR,
    // Average EU household uses ~3500 kWh a year.
    homeDays: (kwh / 3500) * 365,
  };
}

export async function getTopSavers(limit = 20) {
  const db = await getDb();
  // Players who have never synced have no kwhSaved; they don't belong on a
  // board ranked by it.
  const docs = await db
    .collection("stats")
    .find({ kwhSaved: { $gt: 0 } }, { projection: { _id: 0 } })
    .sort({ kwhSaved: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc, i) => ({ ...doc, rank: i + 1 }));
}

// One call for the landing page, returning which of the three states to render
// so the section never has to guess from empty arrays.
export async function getLeaderboard(limit = 10) {
  try {
    const [entries, totals] = await Promise.all([getTopSavers(limit), getTotalSaved()]);
    const impact = impactFromKwh(totals.total);
    const stats = {
      totalKwh: Math.round(totals.total),
      co2Kg: Math.round(impact.co2Kg),
      trees: Math.round(impact.trees),
    };

    if (!entries.length) return { status: "empty", stats };

    return {
      status: "ok",
      stats,
      entries: entries.map((e) => ({
        rank: e.rank,
        username: e.username,
        kwhSaved: Math.round(e.kwhSaved),
        co2Kg: Math.round(impactFromKwh(e.kwhSaved).co2Kg),
      })),
    };
  } catch {
    return { status: "error" };
  }
}

export async function getTotalSaved() {
  const db = await getDb();
  const [result] = await db
    .collection("stats")
    .aggregate([{ $group: { _id: null, total: { $sum: "$kwhSaved" }, players: { $sum: 1 } } }])
    .toArray();

  return { total: result?.total ?? 0, players: result?.players ?? 0 };
}
