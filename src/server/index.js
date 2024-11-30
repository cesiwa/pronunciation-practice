const express = require("express");
const app = express(); // app değişkenini burada tanımlıyoruz

const words = {
  dailyLife: {
    A1: ["hello", "goodbye", "thanks"],
    B1: ["conversation", "routine", "meeting"],
    C1: ["opportunity", "perspective", "strategy"],
  },
  workAndBusiness: {
    A1: ["manager", "team", "office"],
    B1: ["project", "client", "deadline"],
    C1: ["negotiation", "leadership", "entrepreneur"],
  },
};

app.get("/fetchWords/:level/:topic", (req, res) => {
  const { level, topic } = req.params;

  // Seçilen seviye ve konuya göre kelimeleri döndür
  const selectedWords = words[topic] && words[topic][level];

  if (selectedWords) {
    res.json(selectedWords);
  } else {
    res.status(404).send("Kelime listesi bulunamadı.");
  }
});

const PORT = 3001; // Port numarasını belirle
app.listen(PORT, () => {
  console.log(`Backend sunucusu ${PORT} portunda çalışıyor`);
});
