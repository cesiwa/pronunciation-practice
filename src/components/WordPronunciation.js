import React, { useState, useEffect } from "react";
import { getWordData } from "../services/api";
import Recorder from "recorder.js"; // Ses kaydetme için kütüphane

const WordPronunciation = ({ word }) => {
  const [wordData, setWordData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    // Kelime verisini API'den al
    const fetchWordData = async () => {
      const data = await getWordData(word);
      setWordData(data);
    };

    fetchWordData();
  }, [word]);

  const startRecording = async () => {
    setIsRecording(true);
    const recorder = new Recorder(new AudioContext());
    await recorder.start();
    // Kayıt başladığında ses kaydını sakla
    recorder.onStop = (audioData) => {
      setAudioBlob(audioData.blob);
    };
  };

  const stopRecording = async () => {
    setIsRecording(false);
    // Kayıt durduruluyor
    const recorder = new Recorder(new AudioContext());
    await recorder.stop();
  };

  if (!wordData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{word}</h2>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <audio controls>
        <source src={URL.createObjectURL(audioBlob)} />
      </audio>
      <audio controls>
        <source
          src={
            wordData.results[0].lexicalEntries[0].pronunciations[0].audioFile
          }
        />
      </audio>
    </div>
  );
};

export default WordPronunciation;
