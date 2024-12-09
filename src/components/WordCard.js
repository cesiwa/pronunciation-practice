import React from "react";

const WordCard = ({ word, onNext }) => {
  const handleRecord = () => {
    // Ses kaydetme işlemi
    console.log("Recording...");
  };

  const handleCheckPronunciation = () => {
    // MFCC algoritmasıyla kontrol
    console.log("Checking pronunciation...");
  };

  return (
    <div className="word-card">
      <h2>{word.text}</h2>
      <audio controls src={word.audio}></audio>
      <button onClick={handleRecord}>Kayda Başla</button>
      <button onClick={handleCheckPronunciation}>Telaffuzu Kontrol Et</button>
      <button onClick={onNext}>Sonraki</button>
    </div>
  );
};

export default WordCard;
