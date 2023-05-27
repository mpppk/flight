import { SeatRank, seatRanks } from "../const.ts";

const SeatRankItem = (props: {
  name: SeatRank;
  onClick: (name: SeatRank) => void;
}) => {
  const handleClick = props.onClick.bind(null, props.name);
  return (
    <li>
      <a onClick={handleClick}>{props.name}</a>
    </li>
  );
};

const SeatRankList = (props: {
  names: readonly SeatRank[];
  onClick: (name: SeatRank) => void;
}) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max"
    >
      {props.names.map((name) => (
        <SeatRankItem key={name} name={name} onClick={props.onClick} />
      ))}
    </ul>
  );
};

export const SeatRankSelector = (props: {
  currentRank: SeatRank;
  onClick: (seatName: SeatRank) => void;
  size?: "sm" | "xs";
  color?: "primary" | "secondary" | "accent";
}) => {
  const size = props.size ? `btn-${props.size}` : "";
  const color = props.color ? `btn-${props.color}` : "";
  return (
    <div className="dropdown dropdown-right">
      <label tabIndex={0} className={`btn ${size} ${color} m-1`}>
        {props.currentRank}
      </label>
      <SeatRankList names={seatRanks} onClick={props.onClick} />
    </div>
  );
};
