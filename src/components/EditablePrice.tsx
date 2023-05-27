import React, { Ref, useRef, useState } from "react";

const CheckIcon = () => {
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
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export const EditablePrice = (props: {
  price: number;
  onChange: (price: number) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleClickButton = () => {
    console.log("current", inputEl.current);
    if (inputEl && inputEl.current) {
      console.log("focus");
      inputEl.current.focus();
    }
    toggleEditing();
  };

  if (editing) {
    return (
      <EditPrice
        inputRef={inputEl}
        price={props.price}
        onChangePrice={props.onChange}
        onClickCheck={toggleEditing}
        onBlur={toggleEditing}
      />
    );
  } else {
    return (
      <>
        <button className={`btn btn-sm w-max`} onClick={handleClickButton}>
          {props.price}円
        </button>
      </>
    );
  }
};

const EditPrice = (props: {
  price: number;
  inputRef: Ref<HTMLInputElement>;
  onChangePrice: (price: number) => void;
  onClickCheck: () => void;
  onBlur: () => void;
}) => {
  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const price = parseInt(event.target.value, 10);
    props.onChangePrice(price);
  };
  return (
    <div className={`flex flex-wrap justify-center items-center w-max`}>
      <div>
        <input
          autoFocus
          ref={props.inputRef}
          type="number"
          value={props.price}
          className="input input-accent input-sm w-24 max-w-xs"
          onChange={handleChangeInput}
          onBlur={props.onBlur}
        />
      </div>
      <div className={"ml-2 h-6"}>
        <button
          className="btn btn-primary btn-xs btn-square"
          onClick={props.onClickCheck}
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};