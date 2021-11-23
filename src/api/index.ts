import axios from "axios";


export const searchAPIcall = async (query: string) => {
  try {
    const result = await axios(` https://shielded-chamber-67308.herokuapp.com/google-suggestion?q=${query}`);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
