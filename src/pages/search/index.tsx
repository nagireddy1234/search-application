import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { searchAPIcall } from "../../api";
import AutoSuggestion from "../../components/autoSuggestion";
import "./style.css";
import { getSavedSearchData, saveSearchData } from "../../util/localStorage";
import History from "./history";

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(-1);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [savedSearchedData, setSavedSearchedData] = useState(
    getSavedSearchData()
  );

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

  const handleItemSelection = async (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (showSuggestion) {
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
        saveSearchData(searchResults[selected]);
        setSavedSearchedData(getSavedSearchData());
      }
    }
  };

  const handleSuggestionClick = (i: number) => {
    const input: HTMLInputElement | null =
      document.querySelector(".search-input");
    if (input && i !== searchResults.length) {
      input.value = searchResults[i];
      saveSearchData(searchResults[i]);
    }
    setShowSuggestion(false);
    setSavedSearchedData(getSavedSearchData());
  };

  const handleDeleteHistory = (i: number) => {
    const data = [...savedSearchedData];
    data.splice(i, 1);
    localStorage.setItem("searchResults", JSON.stringify(data));
    setSavedSearchedData(data);
  };

  const handleClearSearchHistory = () => {
    localStorage.setItem("searchResults", JSON.stringify([]));
    setSavedSearchedData([]);
    setQuery("");
  };

  return (
    <>
      <div className="search-wrapper">
        <h2>Search Anything Here</h2>
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
            onSuggestItemClick={handleSuggestionClick}
          />
        )}
        <History
          data={savedSearchedData}
          onDeleteIconClick={handleDeleteHistory}
          onClearSeachHistory={handleClearSearchHistory}
        />
      </div>
    </>
  );
};

export default Search;
