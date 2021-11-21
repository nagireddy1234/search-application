import axios from "axios";

export const searchAPIcall = async (query: string) => {
  try {
    const result = await axios(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
    );
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
