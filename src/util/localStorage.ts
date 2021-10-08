export interface searchResultProps {
  result: string;
  date: Date;
}

export const saveSearchData = (result: string) => {
  const newData = localStorage.getItem("searchResults");
  if (newData) {
    const parsedSearchData = JSON.parse(newData);
    const isResultExit = parsedSearchData.find(
      (item: searchResultProps) => item.result === result
    );
    if (!isResultExit) {
      parsedSearchData.push({ result, date: new Date() });
      localStorage.setItem("searchResults", JSON.stringify(parsedSearchData));
    }
  } else {
    localStorage.setItem(
      "searchResults",
      JSON.stringify([{ result, date: new Date() }])
    );
  }
};

export const getSavedSearchData = () => {
  const newData = localStorage.getItem("searchResults");
  if (newData) {
    const parsedSearchData = JSON.parse(newData);
    return parsedSearchData;
  }
  return [];
};
