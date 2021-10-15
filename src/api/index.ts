import axios from "axios";

const PROXY = "https://cors-anywhere.herokuapp.com";

export const searchAPIcall = async (query: string) => {
  try {
    const result = await axios(
      `${PROXY}/https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
    );
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
