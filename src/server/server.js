const express = require("express");
const axios = require("axios");
const app = express();

// Oxford API'ye erişim için gerekli olan APP_ID ve APP_KEY
const APP_ID = "f7411cb1"; // Oxford API'den aldığınız APP ID
const APP_KEY = "77b1949c33090aa1e7aadf68b6b7ea96"; // Oxford API'den aldığınız APP Key

app.get("/fetchPronunciation/:word", async (req, res) => {
  const word = req.params.word;
  try {
    // Oxford API'ye istek gönderme
    const response = await axios.get(
      `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
      {
        headers: {
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      }
    );
    // API'den gelen yanıtı frontend'e gönder
    res.json(response.data);
  } catch (error) {
    // Hata durumunda frontend'e hata mesajı döner
    res.status(500).send("API hatası: " + error.message);
  }
});

// Sunucu 3001 portunda çalışacak
app.listen(3001, () => {
  console.log("Backend sunucusu 3001 portunda çalışıyor");
});
