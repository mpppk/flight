import { Airport, airports } from "../const.ts";

const AirportItem = (props: {
  name: Airport;
  onClick: (name: Airport) => void;
}) => {
  const handleClick = props.onClick.bind(null, props.name);
  return (
    <li>
      <a className={"text-sm"} onClick={handleClick}>
        {props.name}
      </a>
    </li>
  );
};

const AirportList = (props: {
  airports: readonly Airport[];
  onClick: (name: Airport) => void;
}) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max"
    >
      {props.airports.map((name) => (
        <AirportItem key={name} name={name} onClick={props.onClick} />
      ))}
    </ul>
  );
};

export const AirportSelector = (props: {
  current: Airport;
  onClick: (airport: Airport) => void;
  size?: "sm" | "xs";
  color?: "primary" | "secondary" | "accent";
  airports?: Airport[];
}) => {
  const size = props.size ? `btn-${props.size}` : "";
  const color = props.color ? `btn-${props.color}` : "";
  return (
    <div className="dropdown dropdown-right">
      <label tabIndex={0} className={`btn ${size} ${color} m-1`}>
        {props.current}
      </label>
      <AirportList
        airports={props.airports ?? airports}
        onClick={props.onClick}
      />
    </div>
  );
};
