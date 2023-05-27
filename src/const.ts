import { z } from "zod";

export const SeatRank = z.union([
  z.literal("Standard"),
  z.literal("Class J"),
  z.literal("First"),
]);
export const seatRanks = SeatRank.options.map((x) => x.value);
export type SeatRank = z.infer<typeof SeatRank>;

export const FareType = z.union([
  z.literal("100%"),
  z.literal("75%(株主)"),
  z.literal("75%"),
  z.literal("50%"),
]);
export const fareTypes = FareType.options.map((x) => x.value);
export type FareType = z.infer<typeof FareType>;

const seatRankAdditionalRate: Record<SeatRank, number> = {
  Standard: 0,
  "Class J": 0.1,
  First: 0.5,
};

export const Airport = z.union([z.literal("羽田"), z.literal("那覇")]);
export const airports = Airport.options.map((x) => x.value);
export type Airport = z.infer<typeof Airport>;

const FOPs = (() => {
  const m = new Map<`${Airport}-${Airport}`, number>();
  m.set("羽田-那覇", 984 * 2);
  m.set("那覇-羽田", 984 * 2);
  return m;
})();

export const getFOP = (
  from: string,
  to: string,
  seatRank: SeatRank,
  fareType: FareType
) => {
  const fop = FOPs.get(`${Airport.parse(from)}-${Airport.parse(to)}`);
  if (fop === undefined)
    throw new Error(`FOP not found. from=${from}, to=${to}`);
  const [fareRate, bonus] = getFareRateAndBonus(fareType);
  console.log(
    `${fop} * (${seatRankAdditionalRate[seatRank]} + ${fareRate}) + ${bonus}`
  );
  return Math.floor(
    fop * (seatRankAdditionalRate[seatRank] + fareRate) + bonus
  );
};

const getFareRateAndBonus = (fareType: FareType) => {
  switch (fareType) {
    case "100%":
      return [1, 400];
    case "75%(株主)":
      return [0.75, 400];
    case "75%":
      return [0.75, 200];
    case "50%":
      return [0.5, 0];
  }
};
