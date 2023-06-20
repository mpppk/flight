import { SpaceBetween } from "./layout.tsx";
import { EditIcon, TrashIcon } from "./icons.tsx";

export const FlightPlanCardSkeleton = () => {
  return (
    <div className="mt-2 mx-2 card card-compact card-bordered bg-base-100 shadow-lg w-full">
      <div className="card-body animate-pulse">
        <SpaceBetween>
          <div className={"flex flex-wrap justify-start items-center h-full"}>
            <h2 className="card-title bg-gray-200 rounded-full">{"　　　"}</h2>
            <button className="btn btn-ghost btn-square btn-disabled btn-sm ml-2">
              <EditIcon />
            </button>
          </div>
          <button className="btn btn-ghost btn-square btn-disabled btn-sm">
            <TrashIcon />
          </button>
        </SpaceBetween>
        合計 - FOP( - 円/FOP)
      </div>
    </div>
  );
};
