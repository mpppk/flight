"use client";

import { AirportSelector } from "./AirportSelector";
import { SeatRankSelector } from "./SeatRankSelector";
import { FareTypeSelector } from "./FareTypeSelector";
import { EditablePrice } from "./EditablePrice";
import { Fragment, useState } from "react";
import {
  accessibleAirports,
  Airport,
  FareType,
  Flight,
  FlightDetail,
  FlightPlan,
  getFOPFromFlight,
  SeatRank,
  sumFlightPlanFOP,
} from "../model";
import { EditIcon, PlusIcon, TrashIcon } from "./icons";
import { EditableText } from "./Editable";
import { SpaceBetween } from "./layout";

export const FlightPlanCard = (props: {
  flightPlan: FlightPlan;
  onChangeFlight: (flight: Flight, index: number) => void;
  onDelete: (flightPlan: FlightPlan) => void;
  onCreateFlight: () => void;
  onDeleteFlight: (flight: Flight, index: number) => void;
}) => {
  const handleClickEditButton = () => {
    setEditing(true);
  };
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("新しい旅程");
  const handleChangeTitle = (title: string, editing: boolean) => {
    setTitle(title);
    setEditing(editing);
  };
  const flightPlanFOPSum = sumFlightPlanFOP(props.flightPlan.flights);
  const priceSum = props.flightPlan.flights.reduce(
    (sum, flight) => flight.price + sum,
    0,
  );
  return (
    <div className="mt-2 mx-2 card card-compact card-bordered bg-base-100 shadow-lg w-max">
      <div className="card-body">
        <SpaceBetween>
          <div className={"flex flex-wrap justify-start items-center h-full"}>
            <EditableText
              text={title}
              editing={editing}
              onChange={handleChangeTitle}
            >
              <h2 className="card-title">{title}</h2>
            </EditableText>
            <button
              className={`btn btn-ghost btn-square btn-sm ${
                editing ? "invisible" : ""
              } ml-2`}
              onClick={handleClickEditButton}
            >
              <EditIcon />
            </button>
          </div>
          <div>
            <button
              className="btn btn-ghost btn-square btn-sm"
              onClick={props.onDelete.bind(null, props.flightPlan)}
            >
              <TrashIcon />
            </button>
          </div>
        </SpaceBetween>
        合計{flightPlanFOPSum}FOP({(priceSum / flightPlanFOPSum).toFixed(2)}
        円/FOP)
        {props.flightPlan.flights.map((flight, index) => {
          const handleChangeFlight = (flight: Flight) => {
            props.onChangeFlight(flight, index);
          };
          const handleDeleteFlight = () => {
            props.onDeleteFlight(flight, index);
          };
          const key =
            props.flightPlan.title +
            index +
            flight.from +
            flight.to +
            flight.fareType +
            flight.fareType +
            flight.price;
          return (
            <Fragment key={key}>
              <FlightCard
                flightDetail={toFlightDetail(flight)}
                onChange={handleChangeFlight}
                onDelete={handleDeleteFlight}
              />
            </Fragment>
          );
        })}
        <div className="flex flex-wrap justify-center items-start h-full mt-2">
          <NewFlightButton onClick={props.onCreateFlight} />
        </div>
      </div>
    </div>
  );
};

export const NewFlightPlanCard = (props: { onClickNewButton: () => void }) => {
  return (
    <div className="mt-2 mx-2 card card-compact card-bordered bg-base-100 shadow-lg w-max">
      <div className="card-body">
        <button className="btn btn-wide" onClick={props.onClickNewButton}>
          新しい旅程を追加
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

const FlightCard = (props: {
  flightDetail: FlightDetail;
  onChange: (flight: Flight) => void;
  onDelete: (flight: Flight) => void;
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

  const handleClickTrash = () => {
    props.onDelete(flight);
  };

  return (
    <div className="card card-compact bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">
          <AirportSelector current={flight.from} onClick={handleFromChange} />
          →
          <AirportSelector
            current={flight.to}
            onClick={handleToChange}
            airports={accessibleAirports(flight.from)}
          />
          <button
            className="btn btn-ghost btn-square btn-sm"
            onClick={handleClickTrash}
          >
            <TrashIcon />
          </button>
        </h2>
        <div className="flex flex-wrap justify-start items-center h-full">
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
        </div>
        {flight.fop}FOP({flight.yenPerFop.toFixed(2)}円/FOP)
      </div>
    </div>
  );
};

const NewFlightButton = (props: { onClick: () => void }) => {
  return (
    <button className="btn btn-wide" onClick={props.onClick}>
      フライトを追加
      <PlusIcon />
    </button>
  );
};

const toFlightDetail = (flight: Flight): FlightDetail => {
  const fop = getFOPFromFlight(flight);
  return {
    ...flight,
    fop,
    yenPerFop: flight.price / fop,
  };
};
