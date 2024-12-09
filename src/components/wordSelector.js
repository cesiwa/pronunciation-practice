import React, { useState, useEffect } from "react";
import axios from "axios";

const WordSelector = () => {
  const [words, setWords] = useState([]); // Kelimeler burada saklanacak
  const [selectedWord, setSelectedWord] = useState(""); // Kullanıcının seçtiği kelime
  const [pronunciation, setPronunciation] = useState(null); // Telaffuz bilgisi
  const [level, setLevel] = useState("A1"); // Seviye seçimi
  const [topic, setTopic] = useState("dailyLife"); // Konu seçimi
  const [error, setError] = useState("");

  // Backend'den kelimeleri almak için bir fonksiyon

  // Telaffuz bilgisini almak için fonksiyon

  // İlk başta kelimeleri alacak şekilde useEffect kullanıyoruz

  return (
    <div>
      <h1>Kelime Telaffuzunu Öğren</h1>

      {/* Seviye seçimi */}
      <div>
        <label>Seviye:</label>
        <select value={level}>
          <option value="A1">A1</option>
          <option value="B1">B1</option>
          <option value="C1">C1</option>
        </select>
      </div>

      {/* Konu seçimi */}
      <div>
        <label>Konu:</label>
        <select value={topic}>
          <option value="dailyLife">Daily Life</option>
          <option value="workAndBusiness">Work and Business</option>
          <option value="travel">Travel</option>
          <option value="technology">Technology</option>
          <option value="healthAndFitness">Health and Fitness</option>
        </select>
      </div>

      {/* Kelimeler listesi */}
      <div>
        <label>Kelime Seçin:</label>
        <select value={selectedWord}>
          <option value="">Kelime Seçin</option>
          {words.map((word) => (
            <option key={word} value={word}>
              {word}
            </option>
          ))}
        </select>
        <button>Telaffuz Al</button>
      </div>

      {/* Telaffuz bilgisi varsa ses oynat */}
      {pronunciation && (
        <div>
          <audio controls>
            <source src={pronunciation} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Hata mesajı */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WordSelector;
