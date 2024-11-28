import React, { useState } from "react";

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.ondataavailable = (e) => {
      const audioBlob = new Blob([e.data], { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);

      // Opsiyonel: Dosyayı backend'e gönder
      // uploadToServer(audioBlob);
    };
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Kaydet</button>
      <button onClick={stopRecording}>Durdur</button>
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default AudioRecorder;
