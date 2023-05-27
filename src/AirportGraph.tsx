import { attribute as _, Digraph, Node, Edge, toDot } from "ts-graphviz";
import { getFOP, SeatRank } from "./const.ts";
import Graphviz from "graphviz-react";

export const AirportGraph = (props: { seatRank: SeatRank }) => {
  const dot = toDot(newAirportGraph(props.seatRank));
  console.log(dot);
  return <Graphviz dot={dot} />;
};

const newAirportGraph = (seatRank: SeatRank) => {
  const G = new Digraph();
  const hnd = new Node("羽田");
  const oka = new Node("那覇");
  const edge = new Edge([hnd, oka], {
    [_.label]: getFOP(hnd.id, oka.id, seatRank).toString(),
  });
  G.addNode(hnd);
  G.addNode(oka);
  G.addEdge(edge);
  return G;
};
