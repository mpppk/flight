import { FareType, SeatRank, seatRanks } from "./const.ts";
import React from "react";
import { AirportSelector } from "./AirportSelector.tsx";
import { AirportGraph } from "./AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";
import { FareTypeSelector } from "./FareTypeSelector.tsx";

function App() {
  const [width] = useWindowSize();
  const [seatRank, setSeatRank] = React.useState<SeatRank>("Standard");
  const handleSelectSeatRank = (name: SeatRank) => {
    setSeatRank(name);
    console.log(name);
  };

  const [fareRate, setFareRate] = React.useState<FareType>("75%");
  const handleSelectFareRate = (rate: FareType) => {
    setFareRate(rate);
  };
  return (
    <>
      <AirportSelector
        currentRank={seatRank}
        seatRanks={seatRanks}
        onClick={handleSelectSeatRank}
      />
      <FareTypeSelector currentType={fareRate} onClick={handleSelectFareRate} />
      <div className={"mt-2"}>
        <AirportGraph seatRank={seatRank} fareType={fareRate} width={width} />
      </div>
    </>
  );
}

export default App;
