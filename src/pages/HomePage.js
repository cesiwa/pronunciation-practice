import React, { useState } from "react";
import WordSelector from "../components/wordSelector";
import AudioRecorder from "../components/audioRecorder";

const HomePage = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  const fetchPronunciation = async ({ level, topic }) => {
    // Burada Oxford API çağrısı yapılacak
    const exampleWords = ["hello", "world", "travel"]; // Örnek veri
    setSelectedWord(exampleWords[0]); // İlk kelimeyi seç
  };

  return (
    <div>
      <h1>English Pronunciation Practice</h1>
      {!selectedWord ? (
        <WordSelector onWordSelect={fetchPronunciation} />
      ) : (
        <>
          <h2>Seçilen Kelime: {selectedWord}</h2>
          <AudioRecorder />
        </>
      )}
    </div>
  );
};

export default HomePage;
