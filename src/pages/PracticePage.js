import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getWordDetails from "../services/api";

const PracticePage = () => {
  const { level, topic } = useParams();
  const words = ["example", "practice", "learning"]; // Şimdilik örnek kelimeler
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordDetails, setWordDetails] = useState(null);

  useEffect(() => {
    const fetchWordDetails = async () => {
      const details = await getWordDetails(words[currentIndex]);
      setWordDetails(details);
    };
    fetchWordDetails();
  }, [currentIndex]);

  const nextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };
  console.error();

  return (
    <div>
      <h2>
        Practice {topic} (Level: {level})
      </h2>
      {wordDetails ? (
        <div>
          <h3>Word: {wordDetails.word}</h3>
          <p>Pronunciation: {wordDetails?.pronunciations?.[0]?.audioFile}</p>
          <button
            onClick={() =>
              new Audio(wordDetails.pronunciations[0].audioFile).play()
            }
          >
            Play Pronunciation
          </button>
          <button onClick={nextWord}>Next Word</button>
        </div>
      ) : (
        <p>Loading word details...</p>
      )}
    </div>
  );
};

export default PracticePage;
