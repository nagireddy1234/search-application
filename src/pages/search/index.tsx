import React, { useState } from "react";
import debounce from "lodash.debounce";
import { searchAPIcall } from "../../api";
import AutoSuggestion from "../../components/autoSuggestion";
import "./style.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

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
      <input type="text" onChange={handleAPIcall} />
      <AutoSuggestion data={searchResults} query={query} />
    </div>
  );
};

export default Search;
