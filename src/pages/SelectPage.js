import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import topicsLevels from "../data/levels.json";

function SelectPage() {
  const navigate = useNavigate(); // useHistory yerine useNavigate
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const topics = topicsLevels.find((item) => item.level === selectedLevel);
  const topicsLevel = topics ? topics.topics : [];

  const handleStartLearning = () => {
    if (selectedLevel && selectedTopic) {
      navigate(`/learning?level=${selectedLevel}&topic=${selectedTopic}`);
    } else {
      alert("Please select both level and topic");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Choose Your Level
        </h2>

        {/* Level Seçimi */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 border rounded-lg mb-4"
        >
          <option value="">Select Level</option>
          {topicsLevels.map((levelData) => (
            <option key={levelData.id} value={levelData.level}>
              {levelData.level}
            </option>
          ))}
        </select>

        {/* Topic Seçimi */}
        {selectedLevel && (
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            disabled={!selectedLevel}
            className="px-4 py-2 border rounded-lg mb-4"
          >
            <option value="">Select Topic</option>
            {topicsLevel.map((name) => (
              <option>{name.name}</option>
            ))}
          </select>
        )}

        {/* Start Learning Butonu */}
        <button
          onClick={handleStartLearning}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Start Learning
        </button>
      </main>
    </div>
  );
}

export default SelectPage;
