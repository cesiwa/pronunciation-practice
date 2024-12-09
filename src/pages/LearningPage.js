import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import wordsData from "../data/levels.json"; // JSON dosyanızı buraya import edin
import Header from "../components/Header";

function LearningPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const level = params.get("level");
  const topic = params.get("topic");

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    // JSON verisinden, seçilen level ve topic'e göre filtreleme yapılır
    const filtered = wordsData.filter(
      (word) => word.level === level && word.topic === topic
    );
    setFilteredWords(filtered);
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Learning</h1>

        {filteredWords.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold">
              {filteredWords[currentWordIndex].word}
            </h2>
            <div className="flex mt-4">
              <button
                onClick={handlePrevWord}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-2"
              >
                Prev
              </button>
              <button
                onClick={handleNextWord}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No words found for the selected level and topic.</p>
        )}
      </main>
    </div>
  );
}

export default LearningPage;
