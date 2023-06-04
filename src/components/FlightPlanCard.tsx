import { AirportSelector } from "./AirportSelector.tsx";
import { SeatRankSelector } from "./SeatRankSelector.tsx";
import { FareTypeSelector } from "./FareTypeSelector.tsx";
import { EditablePrice } from "./EditablePrice.tsx";
import React, { Fragment, useRef, useState } from "react";
import {
  accessibleAirports,
  Airport,
  FareType,
  Flight,
  FlightDetail,
  FlightPlan,
  getFOP,
  SeatRank,
} from "../model.ts";
import { CheckIcon, EditIcon, PlusIcon, TrashIcon } from "./icons.tsx";

const SpaceBetween = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center h-full">
      {props.children}
    </div>
  );
};

const TextInput = (props: {
  text: string;
  onChange?: (text: string) => void;
  onClickCheck?: (text: string) => void;
  onBlur?: (text: string) => void;
}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    props.onChange?.(event.target.value);
  };
  const handleBlur = () => {
    props.onBlur?.(inputEl.current?.value ?? "");
  };
  const handleClickCheck = () => {
    props.onClickCheck?.(inputEl.current?.value ?? "");
  };
  return (
    <div className={`flex flex-wrap justify-center items-center w-max`}>
      <div>
        <input
          autoFocus
          ref={inputEl}
          type="text"
          value={props.text}
          className="input input-accent input-sm w-24 max-w-xs"
          onChange={handleChangeInput}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClickCheck();
            }
          }}
        />
      </div>
      <div className={"ml-2 h-6"}>
        <button
          className="btn btn-primary btn-xs btn-square"
          onClick={handleClickCheck}
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};

export const FlightPlanCard = (props: {
  flightPlan: FlightPlan;
  onChangeFlight: (flight: Flight, index: number) => void;
  onDelete: (flightPlan: FlightPlan) => void;
  onCreateFlight: () => void;
}) => {
  const handleClickEditButton = () => {
    setEditing(true);
  };
  const updateTitle = (text: string) => {
    setTitle(text);
  };
  const completeTitle = (text: string) => {
    setTitle(text);
    setEditing(false);
  };
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("旅程1");
  return (
    <div className="mt-2 mx-2 card card-compact w-max glass">
      <div className="card-body">
        <SpaceBetween>
          {!editing && <h2 className="card-title">{title}</h2>}
          {editing && (
            <TextInput
              text={title}
              onBlur={completeTitle}
              onClickCheck={completeTitle}
              onChange={updateTitle}
            />
          )}
          <div>
            <button
              className={`btn btn-square btn-sm btn-ghost ${
                editing ? "btn-disabled" : ""
              }`}
              onClick={handleClickEditButton}
            >
              <EditIcon />
            </button>
            <button
              className="btn btn-square btn-sm btn-ghost"
              onClick={props.onDelete.bind(null, props.flightPlan)}
            >
              <TrashIcon />
            </button>
          </div>
        </SpaceBetween>
        {props.flightPlan.flights.map((flight, index) => {
          const handleChangeFlight = (flight: Flight) => {
            props.onChangeFlight(flight, index);
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
              />
            </Fragment>
          );
        })}
        <NewFlightCard onClick={props.onCreateFlight} />
      </div>
    </div>
  );
};

export const NewFlightPlanCard = (props: { onClickNewButton: () => void }) => {
  return (
    <div className="mt-2 mx-2 card card-compact w-max glass">
      <div className="card-body">
        <SpaceBetween>
          <button className="btn btn-ghost" onClick={props.onClickNewButton}>
            <h2 className="card-title">新しい旅程を追加</h2>
          </button>
          <div className={"ml-2"}>
            <button
              className="btn btn-square btn-ghost"
              onClick={props.onClickNewButton}
            >
              <PlusIcon />
            </button>
          </div>
        </SpaceBetween>
      </div>
    </div>
  );
};

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

const NewFlightCard = (props: { onClick: () => void }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <SpaceBetween>
          <button className="btn btn-ghost" onClick={props.onClick}>
            <p>フライトを追加</p>
          </button>
          <div className={"ml-1"}>
            <button
              className="btn btn-square btn-ghost"
              onClick={props.onClick}
            >
              <PlusIcon />
            </button>
          </div>
        </SpaceBetween>
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
