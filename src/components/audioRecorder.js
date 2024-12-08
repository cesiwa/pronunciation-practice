import React from "react";
import useRecorder from "./useRecorder";

function AudioRecorder() {
  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ses Kaydedici</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Kaydı Durdur" : "Kayda Başla"}
      </button>
      {audioURL && (
        <div>
          <h3>Kaydedilen Ses</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
