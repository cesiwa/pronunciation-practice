import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LevelPage from "./pages/LevelPage";
import AudioRecorder from "./components/AudioRecorder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioRecorder />} />
        <Route path="/level/:level" element={<LevelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
