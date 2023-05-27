import { FareType, fareTypes } from "./const.ts";

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

export const FareTypeSelector = (props: {
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
