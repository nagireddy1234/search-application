export interface searchHistoryProps {
  result: string;
  date: Date;
}

export const saveSearchData = (result: string) => {
  const newData = localStorage.getItem("searchResults");
  if (newData) {
    const parsedSearchData = JSON.parse(newData);
    let index = -1;
    let isResultExit = false;
    parsedSearchData.forEach((item: searchHistoryProps, i: number) => {
      if (item.result === result) {
        isResultExit = true;
        index = i;
      }
    });
    if (!isResultExit) {
      parsedSearchData.push({ result, date: new Date() });
      localStorage.setItem("searchResults", JSON.stringify(parsedSearchData));
    } else {
      parsedSearchData[index].date = new Date();
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
