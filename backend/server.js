const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const { exec } = require("child_process");

const compareAudioFiles = (file1, file2) => {
  return new Promise((resolve, reject) => {
    exec(
      `python3 compare_audio.py ${file1} ${file2}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Hata: ${error.message}`);
        } else if (stderr) {
          reject(`Python Hatası: ${stderr}`);
        } else {
          resolve(stdout.trim());
        }
      }
    );
  });
};

const file1 = "/uploads/audio_2025-01-12T15-17-23-610Z_99arkn.mp3"; // Kullanıcıdan alınan ses
const file2 = "/uploads/hello__gb_1.mp3"; // Projedeki referans ses

compareAudioFiles(file1, file2)
  .then((result) => {
    console.log(result); // "Ses benzerlik oranı: 85.23%"
  })
  .catch((err) => {
    console.error(err);
  });

// Multer için depolama ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dosyanın kaydedileceği klasör
  },
  filename: (req, file, cb) => {
    // Daha düzgün bir dosya ismi oluştur
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Tarih ve saat damgası
    const uniqueSuffix = Math.random().toString(36).substring(2, 8); // Rastgele bir benzersiz kısım
    const newFileName = `audio_${timestamp}_${uniqueSuffix}.mp3`; // İsim formatı
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("audio"), (req, res) => {
  res.send({
    message: "Ses dosyası başarıyla yüklendi!",
    fileName: req.file.filename,
  });
});

app.listen(5001, () => {
  console.log("Sunucu 5001 portunda çalışıyor.");
});
