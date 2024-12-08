import axios from "axios";

const API_URL = "http://localhost:5005"; // Backend URL

// Kelime verisini almak için API çağrısı
export const getWordData = async (word) => {
  try {
    const response = await axios.get(`${API_URL}/word/${word}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching word data:", error);
    throw error;
  }
};
