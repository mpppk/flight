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

export const Airport = z.union([
  z.literal("羽田・成田"),
  z.literal("那覇"),
  z.literal("新千歳"),
  z.literal("伊丹・関空"),
  z.literal("名古屋"),
  z.literal("福岡"),
]);
export const airports = Airport.options.map((x) => x.value);
export type Airport = z.infer<typeof Airport>;

export const airportRoutes: [Airport, Airport, number][] = [
  ["羽田・成田", "新千歳", 510],
  ["羽田・成田", "名古屋", 139],
  ["羽田・成田", "伊丹・関空", 280],
  ["羽田・成田", "福岡", 567],
  ["羽田・成田", "那覇", 984], // airport1, airport2, mile
  ["伊丹・関空", "新千歳", 666],
  ["伊丹・関空", "福岡", 287],
  ["伊丹・関空", "那覇", 739],
  ["名古屋", "新千歳", 614],
  ["名古屋", "福岡", 374],
  ["名古屋", "那覇", 809],
  ["福岡", "那覇", 537],
];

const FOPs = (() => {
  const m = new Map<`${Airport}-${Airport}`, number>();
  const set = (a1: Airport, a2: Airport, mile: number) => {
    m.set(`${a1}-${a2}`, mile * 2);
    m.set(`${a2}-${a1}`, mile * 2);
  };
  airportRoutes.forEach(([a1, a2, mile]) => set(a1, a2, mile));
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
