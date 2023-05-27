import { SeatRank, seatRanks } from "./const.ts";
import React from "react";
import { AirportSelector } from "./AirportSelector.tsx";
import { AirportGraph } from "./AirportGraph.tsx";

function App() {
  const [seatRank, setSeatRank] = React.useState<SeatRank>("Standard");
  const handleSelectSeatRank = (name: SeatRank) => {
    setSeatRank(name);
    console.log(name);
  };
  return (
    <>
      <AirportSelector
        currentRank={seatRank}
        seatRanks={seatRanks}
        onClick={handleSelectSeatRank}
      />
      <AirportGraph seatRank={seatRank} />
      <button className="px-4 btn btn-primary">Button</button>
    </>
  );
}

export default App;
