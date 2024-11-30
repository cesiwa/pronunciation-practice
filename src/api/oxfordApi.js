import axios from "axios";

const APP_ID = "f7411cb1"; // Oxford API'den aldığınız APP ID
const APP_KEY = "77b1949c33090aa1e7aadf68b6b7ea96"; // Oxford API'den aldığınız APP Key
const BASE_URL =
  "https://od-api.oxforddictionaries.com:443/api/v2/entries/en-us/{kelime}";

export const fetchPronunciation = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}/entries/en-us/${word}`, {
      headers: {
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    });

    const pronunciations =
      response.data.results[0].lexicalEntries[0].entries[0].pronunciations;
    const audioFile = pronunciations.find((p) => p.audioFile).audioFile;

    return audioFile;
  } catch (error) {
    console.error("Oxford API Hatası:", error);
    throw new Error("Kelimenin telaffuz bilgisi alınamadı.");
  }
};
