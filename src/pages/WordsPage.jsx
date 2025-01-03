import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import AudioRecorder from "../components/AudioRecorder";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function WordsPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const topic = searchParams.get("topic");
  const words = searchParams.get("words");
  const definition = searchParams.get("definition");

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [filteredWords, setFilteredWords] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const words2 = JSON.parse(queryParams.get("words2"));

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex < words2.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  const currentWord = words2[currentWordIndex];

  return (
    <div>
      <div className="min-h-screen bg-blue-600	 text-white">
        <Header />
        <main className="flex flex-col items-center justify-center py-10">
          <h1 className="text-4xl font-extrabold mb-6">Learning Session</h1>

          {words2.length > 0 ? (
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">
                Word: {currentWord.word}
              </h2>
              <p className="text-lg italic mb-6">
                Definition:{" "}
                {currentWord.definition || "No definition available"}
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
    </div>
  );
}

export default WordsPage;
