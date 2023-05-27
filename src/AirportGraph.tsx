import { attribute as _, Node, Edge, toDot, Graph } from "ts-graphviz";
import {
  Airport,
  airportRoutes,
  airports,
  FareType,
  getFOP,
  SeatRank,
} from "./const.ts";
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
  const G = new Graph();
  const nodes = airports.reduce((m, airport) => {
    m[airport] = new Node(airport);
    return m;
  }, {} as Record<Airport, Node>);
  const newEdge = (
    node1: Node,
    node2: Node,
    seatRank: SeatRank,
    fareType: FareType
  ) => {
    const fop = getFOP(node1.id, node2.id, seatRank, fareType);
    return new Edge([node1, node2], { [_.label]: fop.toString() });
  };
  airportRoutes.forEach((route) => {
    G.addEdge(newEdge(nodes[route[0]], nodes[route[1]], seatRank, fareType));
  });
  return G;
};
