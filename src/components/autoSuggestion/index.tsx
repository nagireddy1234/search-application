import React, { FC } from "react";
import "./style.css";

interface Props {
  data: string[];
  query: string;
  selected: number;
}

const AutoSuggestion: FC<Props> = ({ data, query, selected }): JSX.Element => {
  const getSuggestion = (suggestion: string, i: number) => {
    const isExist = suggestion.includes(query);

    if (isExist) {
      const matched = suggestion.slice(0, query.length);
      const notMatched = suggestion.slice(query.length, suggestion.length);
      return (
        <li key={suggestion} className={selected === i ? "query-selected" : ""}>
          <strong>{matched}</strong>
          {notMatched}
        </li>
      );
    }

    return (
      <li key={suggestion} className={selected === i ? "query-selected" : ""}>
        {suggestion}
      </li>
    );
  };

  return (
    <div className="auto-suggestion-wrapper">
      <ul>{data.map((item: string, i: number) => getSuggestion(item, i))}</ul>
    </div>
  );
};

export default AutoSuggestion;
