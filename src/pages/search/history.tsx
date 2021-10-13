import React, { FC } from "react";
import { searchHistoryProps } from "../../util/localStorage";

interface Props {
  data: searchHistoryProps[];
  onDeleteIconClick: (i: number) => void;
  onClearSeachHistory:()=>void;
}

const History: FC<Props> = ({ data, onDeleteIconClick, onClearSeachHistory }): JSX.Element => {
  const dateTimeFormat = (stringDate: any) => {
    let date = new Date(stringDate);
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let year = date.getFullYear();
    let month = date.getMonth();
    let newDate = date.getDate();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${year}-${month}-${newDate} ${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  return (
    <div className="history-root-wrapper">
      <div className="history-container">
        <h6>Search history</h6>
        <button className="underline-text-btn" onClick={onClearSeachHistory}>Clear search history</button>
      </div>
      <ul className="search-result-wrapper">
        {data.map((item: searchHistoryProps, i: number) => (
          <li key={item.result}>
            <p>{item.result}</p>
            <div className="btn-date-wrapper">
              <p>{dateTimeFormat(item.date)}</p>
              <div className="close-btn" onClick={() => onDeleteIconClick(i)}>
                ✕
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
