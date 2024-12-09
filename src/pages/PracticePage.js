import React, { useState, useEffect } from "react";
import WordCard from "../components/WordCard";
import { useParams } from "react-router-dom";
import fetchWords from "../components/wordSelector";

const Practice = () => {
  const { topic, level } = useParams();
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Kelimeleri API'den al
    fetchWords(topic, level).then(setWords);
  }, [topic, level]);

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <div className="practice-container">
      {words.length > 0 && (
        <WordCard word={words[currentWordIndex]} onNext={nextWord} />
      )}
    </div>
  );
};

export default Practice;
