import { SeatRank } from "./const.ts";

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
    <ul>
      {props.names.map((name) => (
        <SeatRankItem key={name} name={name} onClick={props.onClick} />
      ))}
    </ul>
  );
};

export const AirportSelector = (props: {
  currentRank: SeatRank;
  seatRanks: readonly SeatRank[];
  onClick: (seatName: SeatRank) => void;
}) => {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        {props.currentRank}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <SeatRankList names={props.seatRanks} onClick={props.onClick} />
      </ul>
    </div>
  );
};
