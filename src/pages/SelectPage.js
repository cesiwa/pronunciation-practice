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

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*   const handleStartLearning = () => {
    if (selectedLevel && selectedTopic) {
      navigate(`/learning?level=${selectedLevel}&topic=${selectedTopic}`);
    } else {
      alert("Please select both level and topic");
    }
  }; */

  //selectedlevel ve selectedtopic doğru geliyor. kontrol edildi

  const handleStartLearning = async () => {
    if (selectedLevel && selectedTopic) {
      try {
        const response = await fetch(
          `http://localhost:5005/words?level=${selectedLevel}&topic=${selectedTopic}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              level: selectedLevel,
              topicId: selectedTopic,
            }),
          }
        );

        console.log("Response status:", response.status);
        console.log("Response body (raw):", await response.text());

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.words) {
          throw new Error("Invalid response format");
        }

        // Navigate ile fetch edilen veriyi state ile gönderiyoruz
        navigate(`/learning`, {
          state: { words: data, level: selectedLevel, topic: selectedTopic },
        });
      } catch (error) {
        console.error("Error fetching words:", error);

        alert("Failed to load words. Please try again.");
      }
    } else {
      alert("Please select both level and topic");
    }
  };

  return (
    <div className="min-h-screen bg-blue-600	">
      <Header />
      <main className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl font-bold text-white mb-6">
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
              <option key={name.id} value={name.name}>
                {name.name}
              </option>
            ))}
          </select>
        )}

        {/* Start Learning Butonu */}

        <button
          onClick={handleStartLearning}
          className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Start Learning
        </button>
      </main>
    </div>
  );
}

export default SelectPage;
