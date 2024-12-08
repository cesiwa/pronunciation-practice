const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API endpoint - Kelime verisini al
app.get("/word/:word", async (req, res) => {
  const word = req.params.word;
  console.log(`Request received for word: ${word}`);

  // Oxford Dictionaries API anahtarlarınız
  const apiKey = "77b1949c33090aa1e7aadf68b6b7ea96";
  const appId = "f7411cb1";

  try {
    // API'ye istek gönderiyoruz
    const response = await axios.get(
      `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
      {
        headers: {
          app_id: appId,
          app_key: apiKey,
        },
      }
    );

    // Başarılı ise kelime verisini döndürüyoruz
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    ); // Hata mesajını logla
    res.status(500).send("Error fetching word data");
  }
});

// Sunucuyu başlat
app.listen(5005, () => {
  console.log("Server is running on http://localhost:5005");
});
