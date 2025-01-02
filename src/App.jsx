import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectPage from "./pages/SelectPage";
import LearningPage from "./pages/LearningPage";
import WordsPage from "./pages/WordsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/select" element={<SelectPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/words" element={<WordsPage />} />
    </Routes>
  );
};

export default App;
