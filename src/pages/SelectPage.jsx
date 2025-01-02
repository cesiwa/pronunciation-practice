import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import topicsLevels from "../data/levels.json";

function SelectPage() {
  const navigate = useNavigate(); // useHistory yerine useNavigate

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const topics = topicsLevels.find((item) => item.level === selectedLevel); //leveldata
  const topics2 = topics ? topics.topics : [];

  const selectedTopic2 = topics2.find((topic) => topic.id === selectedTopic);
  const words = selectedTopic2 ? selectedTopic2.words : [];

  const topicsLevel = topics ? topics.topics : []; //leveller

  /*   const topicNumber = topicsLevels.find(
    (item) => item.level === selectedLevel
  ).id; */
  const topicNumber =
    topicsLevels.find((item) => item.level === selectedLevel)?.id || null;

  //selectedlevel ve selectedtopic doğru geliyor. kontrol edildi

  const handleStartLearning = async () => {
    if (selectedLevel && selectedTopic) {
      try {
        const response = await fetch(
          `http://localhost:5005/words`, //burası selectedtopic değil de topicNumber olabilir
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              level: selectedLevel,
              topicId: selectedTopic,
              topicNumber: topicNumber,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched words:", data);
      } catch (error) {
        alert("Failed to load words. Please try again");
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
          {topicsLevels.map((level) => (
            <option key={level.id} value={level.level}>
              {level.level}
            </option>
          ))}
        </select>

        {/* Topic Seçimi */}
        {topics2.length > 0 && (
          <label>
            <select
              value={selectedTopic || ""}
              onChange={(e) => setSelectedTopic(Number(e.target.value))}
              className="px-4 py-2 border rounded-lg mb-4"
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topics2.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {/* Words Listesi */}
        {words.length > 0 && (
          <div>
            <h2>Words in {selectedTopic2.name}</h2>
            <ul>
              {words.map((word, index) => (
                <li key={index}>
                  <strong>{word.word}</strong>: {word.definition}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Start Learning Butonu */}

        <Link
          to={`/words?name=${topicNumber}&age=${topicsLevel.map(
            (item) => item.name
          )}&topic=${selectedTopic}&words=${words.map(
            (item) => item.word
          )}&definition=${words.map(
            (item) => item.definition
          )}&words2=${encodeURIComponent(JSON.stringify(words))}`}
        >
          <button className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Start Learning
          </button>
        </Link>
      </main>
    </div>
  );
}

export default SelectPage;
