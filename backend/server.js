const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" }); // Ses dosyalarını 'uploads/' klasörüne sakla

app.post("/upload", upload.single("audio"), (req, res) => {
  const file = req.file;
  if (file) {
    res.status(200).send("Ses dosyası başarıyla yüklendi!");
  } else {
    res.status(400).send("Ses dosyası yüklenemedi.");
  }
});

app.listen(5001, () => console.log("Backend server 5001 portunda çalışıyor!"));
