import { z } from "zod";

export const SeatRank = z.union([
  z.literal("Standard"),
  z.literal("Class J"),
  z.literal("First"),
]);
export const seatRanks = SeatRank.options.map((x) => x.value);
export type SeatRank = z.infer<typeof SeatRank>;

const seatRankRate: Record<SeatRank, number> = {
  Standard: 1,
  "Class J": 1.1,
  First: 1.5,
};

export const Airport = z.union([z.literal("羽田"), z.literal("那覇")]);
export const airports = Airport.options.map((x) => x.value);
export type Airport = z.infer<typeof Airport>;

const FOPs = (() => {
  const m = new Map<`${Airport}-${Airport}`, number>();
  m.set("羽田-那覇", 2368);
  m.set("那覇-羽田", 2368);
  return m;
})();

export const getFOP = (from: string, to: string, seatRank: SeatRank) => {
  const fop = FOPs.get(`${Airport.parse(from)}-${Airport.parse(to)}`);
  if (fop === undefined)
    throw new Error(`FOP not found. from=${from}, to=${to}`);
  return fop * seatRankRate[seatRank];
};
