import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { searchAPIcall } from "../../api";
import AutoSuggestion from "../../components/autoSuggestion";
import "./style.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(-1);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleAPIcall = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        setQuery(value);
        const result = await searchAPIcall(value);
        if (result) {
          setSearchResults(result?.data[1]);
          setShowSuggestion(true);
        }
      } else {
        setSearchResults([]);
        setShowSuggestion(false);
      }
    },
    500
  );

  const handleItemSelection = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newSelected = 0;
    if (e.key === "ArrowUp" && selected > 0) {
      newSelected = selected - 1;
      setSelected(newSelected);
    } else if (selected === 0 && e.key === "ArrowUp") {
      setSelected(searchResults.length);
    }
    if (e.key === "ArrowDown" && selected < searchResults.length) {
      newSelected = selected + 1;
      setSelected(newSelected);
    } else if (selected === searchResults.length && e.key === "ArrowDown") {
      setSelected(0);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const input: HTMLInputElement | null =
        document.querySelector(".search-input");
      if (input && newSelected !== searchResults.length) {
        input.value = searchResults[newSelected];
      }
    }

    if (e.key === "Enter") {
      setShowSuggestion(false);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        ref={inputRef}
        type="text"
        placeholder="search your query"
        onChange={handleAPIcall}
        onKeyDown={handleItemSelection}
      />
      {showSuggestion && (
        <AutoSuggestion
          data={searchResults}
          query={query}
          selected={selected}
        />
      )}
    </div>
  );
};

export default Search;
