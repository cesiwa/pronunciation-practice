import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import PracticePage from "./pages/PracticePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level/:level" element={<LevelPage />} />
        <Route path="/practice/:level/:topic" element={<PracticePage />} />
      </Routes>
    </Router>
  );
};

export default App;
