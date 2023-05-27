import { attribute as _, Digraph, Node, Edge, toDot } from "ts-graphviz";
import { FareType, getFOP, SeatRank } from "./const.ts";
import Graphviz from "graphviz-react";

export const AirportGraph = (props: {
  seatRank: SeatRank;
  fareType: FareType;
  width: number;
}) => {
  const dot = toDot(newAirportGraph(props.seatRank, props.fareType));
  return <Graphviz dot={dot} options={{ width: props.width }} />;
};

const newAirportGraph = (seatRank: SeatRank, fareType: FareType) => {
  const G = new Digraph();
  const hnd = new Node("羽田");
  const oka = new Node("那覇");
  const edge = new Edge([hnd, oka], {
    [_.label]: getFOP(hnd.id, oka.id, seatRank, fareType).toString(),
  });
  G.addNode(hnd);
  G.addNode(oka);
  G.addEdge(edge);
  return G;
};
