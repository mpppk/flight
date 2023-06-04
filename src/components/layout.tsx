import React from "react";

export const SpaceBetween = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center h-full">
      {props.children}
    </div>
  );
};
