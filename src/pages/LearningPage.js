import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
/* import wordsData from "../data/levels.json"; // JSON dosyanızı buraya import edin */
import topicsLevels from "../data/levels.json";
import Header from "../components/Header";
import AudioRecorder from "../components/AudioRecorder";

function LearningPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const level = params.get("level");
  const topic = params.get("topic");

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    // JSON verisinden seçilen level ve topic'e göre filtreleme
    const selectedLevel = topicsLevels.find((item) => item.level === level);
    if (selectedLevel) {
      const selectedTopic = selectedLevel.topics.find((t) => t.name === topic);
      if (selectedTopic) {
        setFilteredWords(selectedTopic.words || []); // Eğer words varsa ayarla, yoksa boş bir array
      }
    }
  }, [level, topic]);

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex < filteredWords.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="min-h-screen bg-blue-600	 text-white">
      <Header />
      <main className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-extrabold mb-6">Learning Session</h1>

        {filteredWords.length > 0 ? (
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Word: {filteredWords[currentWordIndex].word}
            </h2>
            <p className="text-lg italic mb-6">
              Definition: {filteredWords[currentWordIndex].definition}
            </p>
            <AudioRecorder />
            <div className="flex justify-between">
              <button
                onClick={handlePrevWord}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Prev
              </button>
              <button
                onClick={handleNextWord}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xl font-semibold">
            No words found for the selected level and topic.
          </p>
        )}
      </main>
    </div>
  );
}

export default LearningPage;
