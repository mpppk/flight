import { FareType, SeatRank } from "./const.ts";
import React from "react";
import { SeatRankSelector } from "./SeatRankSelector.tsx";
import { AirportGraph } from "./AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";
import { FareTypeSelector } from "./FareTypeSelector.tsx";
import { AirportSelector } from "./AirportSelector.tsx";
import { EditablePrice } from "./EditablePrice.tsx";

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

const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-center items-center h-full">
      {props.children}
    </div>
  );
};

const SpaceBetween = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center h-full">
      {props.children}
    </div>
  );
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
  console.log("width", width, width - 8);

  const [price, setPrice] = React.useState<number>(10000);
  const handlePriceChange = (price: number) => {
    console.log(price);
    setPrice(price);
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
              <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">
                    <AirportSelector
                      current={"羽田・成田"}
                      onClick={() => console.log()}
                    />
                    →
                    <AirportSelector
                      current={"羽田・成田"}
                      onClick={() => console.log()}
                    />
                  </h2>
                  <SeatRankSelector
                    currentRank={seatRank}
                    onClick={handleSelectSeatRank}
                    size={"sm"}
                  />
                  <FareTypeSelector
                    currentType={fareRate}
                    onClick={handleSelectFareRate}
                    size={"sm"}
                  />
                  <EditablePrice price={price} onChange={handlePriceChange} />
                  <p>{price}円(14円/FOP)</p>
                </div>
              </div>
            </div>
          </div>
        </Center>
      </div>
    </div>
  );
}

export default App;
