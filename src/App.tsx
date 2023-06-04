import { FareType, Flight, FlightPlan, SeatRank } from "./model.ts";
import React from "react";
import { SeatRankSelector } from "./components/SeatRankSelector.tsx";
import { AirportGraph } from "./components/AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";
import { FareTypeSelector } from "./components/FareTypeSelector.tsx";
import {
  FlightPlanCard,
  NewFlightPlanCard,
} from "./components/FlightPlanCard.tsx";

const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-center items-start h-full">
      {props.children}
    </div>
  );
};

const newDefaultFlight: () => Flight = () => ({
  from: "羽田・成田",
  to: "那覇",
  seatRank: "普通席",
  fareType: "100%",
  price: 20000,
});

const newDefaultFlightPlan = (title: string): FlightPlan => {
  return {
    title,
    flights: [newDefaultFlight()],
  };
};

function App() {
  const [width] = useWindowSize();
  const [seatRank, setSeatRank] = React.useState<SeatRank>("普通席");
  const handleSelectSeatRank = (name: SeatRank) => {
    setSeatRank(name);
    console.log(name);
  };

  const [fareRate, setFareRate] = React.useState<FareType>("75%");
  const handleSelectFareRate = (rate: FareType) => {
    setFareRate(rate);
  };

  const [flightPlans, setFlightPlans] = React.useState<FlightPlan[]>([
    newDefaultFlightPlan("旅程1"),
  ]);
  const handleClickNewFlightPlanButton = () => {
    setFlightPlans([...flightPlans, newDefaultFlightPlan("旅程1")]); // FIXME title
  };

  return (
    <div className="container mx-auto px-4 mt-2 mb-2">
      <SeatRankSelector currentRank={seatRank} onClick={handleSelectSeatRank} />
      <FareTypeSelector currentType={fareRate} onClick={handleSelectFareRate} />
      <div>
        <div className={"mt-2"}>
          <Center>
            <AirportGraph
              seatRank={seatRank}
              fareType={fareRate}
              width={Math.max(width - 32, 0)}
            />
          </Center>
        </div>
        <Center>
          {flightPlans.map((flightPlan, flightPlanIndex) => {
            const handleChange = (newFlight: Flight, flightIndex: number) => {
              const newFlightPlan = { ...flightPlan };
              flightPlan.flights.splice(flightIndex, 1, newFlight);
              flightPlans.splice(flightPlanIndex, 1, newFlightPlan);
              setFlightPlans([...flightPlans]);
            };
            const handleDelete = () => {
              flightPlans.splice(flightPlanIndex, 1);
              setFlightPlans([...flightPlans]);
            };
            const handleCreateFlight = () => {
              flightPlan.flights.push(newDefaultFlight());
              setFlightPlans([...flightPlans]);
            };
            return (
              <FlightPlanCard
                key={flightPlanIndex + flightPlan.title}
                flightPlan={flightPlan}
                onChangeFlight={handleChange}
                onDelete={handleDelete}
                onCreateFlight={handleCreateFlight}
              />
            );
          })}
          <NewFlightPlanCard
            onClickNewButton={handleClickNewFlightPlanButton}
          />
        </Center>
      </div>
    </div>
  );
}

export default App;
