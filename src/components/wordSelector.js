import React, { useState } from "react";

const WordSelector = ({ onWordSelect }) => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const topics = [
    "Daily Life",
    "Work and Business",
    "Travel",
    "Technology",
    "Health and Fitness",
  ];
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleSubmit = () => {
    if (selectedLevel && selectedTopic) {
      onWordSelect({ level: selectedLevel, topic: selectedTopic });
    } else {
      alert("Lütfen bir seviye ve konu seçin.");
    }
  };

  return (
    <div>
      <h3>Konu ve Seviye Seçimi</h3>
      <label>Seviye: </label>
      <select
        onChange={(e) => setSelectedLevel(e.target.value)}
        value={selectedLevel}
      >
        <option value="">Seçiniz</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <br />
      <label>Konu: </label>
      <select
        onChange={(e) => setSelectedTopic(e.target.value)}
        value={selectedTopic}
      >
        <option value="">Seçiniz</option>
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleSubmit}>Kelime Getir</button>
    </div>
  );
};

export default WordSelector;
