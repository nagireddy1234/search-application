import axios from "axios";

export const searchAPIcall = async (query: string) => {
  try {
    const result = await axios(
      `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
    );
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
