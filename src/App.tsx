import { FareType, SeatRank } from "./const.ts";
import React from "react";
import { SeatRankSelector } from "./components/SeatRankSelector.tsx";
import { AirportGraph } from "./components/AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";
import { FareTypeSelector } from "./components/FareTypeSelector.tsx";
import {
  Flight,
  FlightPlanCard,
  NewFlightPlanCard,
} from "./components/FlightPlanCard.tsx";

const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-center items-center h-full">
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

  const [flights, setFlights] = React.useState<Flight[]>([newDefaultFlight()]);
  const handleFlightChange = (index: number, flight: Flight) => {
    flights.splice(index, 1, flight);
    setFlights([...flights]);
  };

  const handleFlightPlanDelete = (index: number) => {
    flights.splice(index, 1);
    setFlights([...flights]);
  };

  const handleClickNewFlightPlanButton = () => {
    setFlights([...flights, newDefaultFlight()]);
  };

  return (
    <div className="container mx-auto px-4">
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
          {flights.map((flight, i) => {
            const handleChange = (newFlight: Flight) => {
              handleFlightChange(i, newFlight);
            };
            const handleDelete = () => {
              handleFlightPlanDelete(i);
            };
            return (
              <FlightPlanCard
                flight={flight}
                onChangeFlight={handleChange}
                onDelete={handleDelete}
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
