import { FareType, Flight, FlightPlan, SeatRank, UserData } from "./model.ts";
import React from "react";
import { SeatRankSelector } from "./components/SeatRankSelector.tsx";
import { AirportGraph } from "./components/AirportGraph.tsx";
import { useWindowSize } from "./hooks.ts";
import { FareTypeSelector } from "./components/FareTypeSelector.tsx";
import {
  FlightPlanCard,
  NewFlightPlanCard,
} from "./components/FlightPlanCard.tsx";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import useSWR from "swr";
import { JALDB } from "./firebase.ts";

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

const useUserData = () => {
  const [user, loading, error] = useAuthState(getAuth());
  const { data: userData, mutate } = useSWR(`/jal/${user?.uid}`, () => {
    return JALDB.userData.get(user?.uid ?? "__unknown_user__");
  });
  const setUserData = async (userData: UserData) => {
    if (!user) {
      throw new Error("user is null");
    }
    mutate(
      () => {
        setDoc(doc(getFirestore(), "jal", user.uid), userData);
        return userData;
      },
      {
        optimisticData: userData,
      }
    );
    console.log("finish mutate");
  };
  return { userData, setUserData, loading, error };
};

function JALApp() {
  const [width] = useWindowSize();
  const [seatRank, setSeatRank] = React.useState<SeatRank>("普通席");
  const handleSelectSeatRank = (name: SeatRank) => {
    setSeatRank(name);
  };

  const [fareRate, setFareRate] = React.useState<FareType>("75%");
  const handleSelectFareRate = (rate: FareType) => {
    setFareRate(rate);
  };

  const { userData, setUserData } = useUserData();
  const flightPlans = userData?.flightPlans ?? [];

  const handleClickNewFlightPlanButton = async () => {
    if (!userData) {
      throw new Error("userData is null in handleClickNewFlightPlanButton");
    }
    const flightPlans = [
      ...userData.flightPlans,
      newDefaultFlightPlan("新しい旅程"),
    ];
    await setUserData({ flightPlans }); // FIXME title
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
          {(userData?.flightPlans ?? []).map((flightPlan, flightPlanIndex) => {
            const handleChange = async (
              newFlight: Flight,
              flightIndex: number
            ) => {
              if (!userData) {
                throw new Error("userData is null in handleChange");
              }
              const newFlightPlan = { ...flightPlan };
              flightPlan.flights.splice(flightIndex, 1, newFlight);
              const newFlightPlans = [...flightPlans];
              newFlightPlans.splice(flightPlanIndex, 1, newFlightPlan);
              await setUserData({ flightPlans: newFlightPlans });
            };
            const handleDelete = async () => {
              const newFlightPlans = [...flightPlans];
              newFlightPlans.splice(flightPlanIndex, 1);
              await setUserData({ flightPlans: newFlightPlans });
            };
            const handleCreateFlight = () => {
              const newFlightPlan = { ...flightPlan };
              newFlightPlan.flights.push(newDefaultFlight());
              setUserData({ flightPlans: [...flightPlans, newFlightPlan] });
            };
            const handleDeleteFlight = async (
              _flight: Flight,
              index: number
            ) => {
              const newFlightPlan = { ...flightPlan };
              newFlightPlan.flights.splice(index, 1);
              const newFlightPlans = [...flightPlans];
              newFlightPlans.splice(flightPlanIndex, 1, newFlightPlan);
              await setUserData({ flightPlans: newFlightPlans });
            };
            return (
              <FlightPlanCard
                key={flightPlanIndex + flightPlan.title}
                flightPlan={flightPlan}
                onChangeFlight={handleChange}
                onDelete={handleDelete}
                onCreateFlight={handleCreateFlight}
                onDeleteFlight={handleDeleteFlight}
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

export default JALApp;
