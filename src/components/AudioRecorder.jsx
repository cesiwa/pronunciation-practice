import React from "react";
import useRecorder from "./useRecorder";
import { FiMic, FiStopCircle } from "react-icons/fi";

function AudioRecorder() {
  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  return (
    <div className="flex flex-col items-center justify-center text-gray-900">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isRecording ? (
          <>
            <FiStopCircle size={20} />
            Kaydı Durdur
          </>
        ) : (
          <>
            <FiMic size={20} />
            Kayda Başla
          </>
        )}
      </button>
      {audioURL && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Kaydedilen Ses</h3>
          <audio controls src={audioURL} className="mt-2">
            <source src={audioURL} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
