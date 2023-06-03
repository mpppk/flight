import { AirportSelector } from "./AirportSelector.tsx";
import { SeatRankSelector } from "./SeatRankSelector.tsx";
import { FareTypeSelector } from "./FareTypeSelector.tsx";
import { EditablePrice } from "./EditablePrice.tsx";
import React from "react";
import {
  accessibleAirports,
  Airport,
  FareType,
  getFOP,
  SeatRank,
} from "../const.ts";

const SpaceBetween = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center h-full">
      {props.children}
    </div>
  );
};

const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

const TrashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};
export const FlightPlanCard = (props: {
  flight: Flight;
  onChangeFlight: (flight: Flight) => void;
}) => {
  // const [flight, setFlight] = React.useState<Flight>({
  //   from: "羽田・成田",
  //   to: "那覇",
  //   seatRank: "普通席",
  //   fareType: "100%",
  //   price: 20000,
  // });
  // const handleFlightChange = (flight: Flight) => {
  //   setFlight(flight);
  // };
  return (
    <div className="mt-2 mx-2 card card-compact w-max glass">
      <div className="card-body">
        <SpaceBetween>
          <h2 className="card-title">旅程1</h2>
          <div>
            <button className="btn btn-square btn-sm btn-ghost">
              <EditIcon />
            </button>
            <button className="btn btn-square btn-sm btn-ghost">
              <TrashIcon />
            </button>
          </div>
        </SpaceBetween>
        <FlightCard
          flightDetail={toFlightDetail(props.flight)}
          onChange={props.onChangeFlight}
        />
      </div>
    </div>
  );
};

export interface Flight {
  from: Airport;
  to: Airport;
  seatRank: SeatRank;
  fareType: FareType;
  price: number;
}

interface FlightDetail extends Flight {
  fop: number;
  yenPerFop: number;
}

const FlightCard = (props: {
  flightDetail: FlightDetail;
  onChange: (flight: Flight) => void;
}) => {
  const flight = props.flightDetail;

  const handleFromChange = (from: Airport) => {
    const airports = accessibleAirports(from);
    const to = airports.includes(flight.to) ? flight.to : airports[0];
    props.onChange({ ...flight, from, to });
  };

  const handleToChange = (to: Airport) => {
    props.onChange({ ...flight, to });
  };

  const handleSelectSeatRank = (name: SeatRank) => {
    props.onChange({ ...flight, seatRank: name });
  };

  const handleSelectFareRate = (rate: FareType) => {
    props.onChange({ ...flight, fareType: rate });
  };

  const handlePriceChange = (price: number) => {
    props.onChange({ ...flight, price: price });
  };

  console.log(
    "accessible airports from",
    flight.from,
    accessibleAirports(flight.from)
  );

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <AirportSelector current={flight.from} onClick={handleFromChange} />
          →
          <AirportSelector
            current={flight.to}
            onClick={handleToChange}
            airports={accessibleAirports(flight.from)}
          />
        </h2>
        <SeatRankSelector
          currentRank={flight.seatRank}
          onClick={handleSelectSeatRank}
          size={"sm"}
        />
        <FareTypeSelector
          currentType={flight.fareType}
          onClick={handleSelectFareRate}
          size={"sm"}
        />
        <EditablePrice price={flight.price} onChange={handlePriceChange} />
        {flight.fop}FOP({flight.yenPerFop.toFixed(2)}円/FOP)
      </div>
    </div>
  );
};

const toFlightDetail = (flight: Flight): FlightDetail => {
  const fop = getFOP(flight.from, flight.to, flight.seatRank, flight.fareType);
  return {
    ...flight,
    fop,
    yenPerFop: flight.price / fop,
  };
};
