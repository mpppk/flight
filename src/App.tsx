import { FareType, fareTypes, SeatRank, seatRanks } from "./const.ts";
import React from "react";
import { AirportSelector } from "./AirportSelector.tsx";
import { AirportGraph } from "./AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";

const FareRateItem = (props: {
  fareType: FareType;
  onClick: (name: FareType) => void;
}) => {
  const handleClick = props.onClick.bind(null, props.fareType);
  return (
    <li>
      <a onClick={handleClick}>{props.fareType}</a>
    </li>
  );
};

const FareRateList = (props: {
  fareTypes: readonly FareType[];
  onClick: (name: FareType) => void;
}) => {
  return (
    <ul>
      {props.fareTypes.map((rate) => (
        <FareRateItem key={rate} fareType={rate} onClick={props.onClick} />
      ))}
    </ul>
  );
};

const FareTypeSelector = (props: {
  currentType: FareType;
  onClick: (rate: FareType) => void;
}) => {
  return (
    <div className="dropdown dropdown-right">
      <label tabIndex={0} className="btn m-1">
        {props.currentType}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
      >
        <FareRateList fareTypes={fareTypes} onClick={props.onClick} />
      </ul>
    </div>
  );
};

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
