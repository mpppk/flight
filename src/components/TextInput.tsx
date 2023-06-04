import React, { useRef } from "react";
import { CheckIcon } from "./icons.tsx";

export const TextInput = (props: {
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
