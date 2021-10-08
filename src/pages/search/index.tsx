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

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && selected < searchResults.length) {
          const newSelected = selected + 1;
          setSelected(newSelected);
        }
        if (e.key === "ArrowDown" && selected > 0) {
          const newSelected = selected - 1;
          setSelected(newSelected);
        }
      });
    }
  }, [inputRef, selected, searchResults]);

  const handleAPIcall = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        setQuery(value);
        const result = await searchAPIcall(value);
        if (result) {
          setSearchResults(result?.data[1]);
        }
      } else {
        setSearchResults([]);
      }
    },
    500
  );

  return (
    <div className="search-wrapper">
      <input
        ref={inputRef}
        type="text"
        placeholder="search your query"
        onChange={handleAPIcall}
      />
      <AutoSuggestion data={searchResults} query={query} selected={selected} />
    </div>
  );
};

export default Search;
