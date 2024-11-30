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
  const fetchWords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/fetchWords/${level}/${topic}`
      );
      setWords(response.data);
    } catch (error) {
      setError("Kelime listesi alınamadı: " + error.message);
    }
  };

  // Telaffuz bilgisini almak için fonksiyon
  const fetchPronunciation = async (word) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/fetchPronunciation/${word}`
      );
      const audioUrl =
        response.data.results[0].lexicalEntries[0].entries[0].pronunciations[0]
          .audioFile;
      setPronunciation(audioUrl);
      setError("");
    } catch (error) {
      setPronunciation(null);
      setError("Kelime telaffuz bilgisi alınamadı: " + error.message);
    }
  };

  // İlk başta kelimeleri alacak şekilde useEffect kullanıyoruz
  useEffect(() => {
    fetchWords();
  }, [level, topic]);

  return (
    <div>
      <h1>Kelime Telaffuzunu Öğren</h1>

      {/* Seviye seçimi */}
      <div>
        <label>Seviye:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="A1">A1</option>
          <option value="B1">B1</option>
          <option value="C1">C1</option>
        </select>
      </div>

      {/* Konu seçimi */}
      <div>
        <label>Konu:</label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
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
        <select
          onChange={(e) => setSelectedWord(e.target.value)}
          value={selectedWord}
        >
          <option value="">Kelime Seçin</option>
          {words.map((word) => (
            <option key={word} value={word}>
              {word}
            </option>
          ))}
        </select>
        <button onClick={() => fetchPronunciation(selectedWord)}>
          Telaffuz Al
        </button>
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
