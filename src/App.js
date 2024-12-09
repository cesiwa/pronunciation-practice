import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectPage from "./pages/SelectPage";
import LearningPage from "./pages/LearningPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </Router>
  );
};

export default App;
