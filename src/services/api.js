import axios from "axios";

const API_BASE_URL =
  "https://od-api.oxforddictionaries.com/api/v2/entries/en-us";
const APP_ID = process.env.REACT_APP_OXFORD_APP_ID;
const APP_KEY = process.env.REACT_APP_OXFORD_APP_KEY;

const getWordDetails = async (word) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${word}`, {
      headers: {
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching word details:", error);
    return null;
  }
};

export default getWordDetails;
