import React, { FC } from "react";
import "./style.css";

interface Props {
  data: string[];
  query: string;
}

const AutoSuggestion: FC<Props> = ({ data, query }): JSX.Element => {
  const getSuggestion = (suggestion: string) => {
    const words = suggestion.split(query);
    console.log(words);
    return (
      <li key={suggestion}>
        <strong>{query}</strong>
        {words[1]}
      </li>
    );
  };

  return (
    <div className="auto-suggestion-wrapper">
      <ul>{data.map((item: string) => getSuggestion(item))}</ul>
    </div>
  );
};

export default AutoSuggestion;
