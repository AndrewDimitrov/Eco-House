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
  const docs = await db
    .collection("savings")
    .find({}, { projection: { _id: 0 } })
    .sort({ kwhSaved: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc, i) => ({ ...doc, rank: i + 1 }));
}

export async function getTotalSaved() {
  const db = await getDb();
  const [result] = await db
    .collection("savings")
    .aggregate([{ $group: { _id: null, total: { $sum: "$kwhSaved" }, players: { $sum: 1 } } }])
    .toArray();

  return { total: result?.total ?? 0, players: result?.players ?? 0 };
}
