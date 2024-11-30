import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div>
      <h2>Welcome to English Pronunciation Practice</h2>
      <p>Select your level to start practicing:</p>
      <ul>
        {levels.map((level) => (
          <li key={level}>
            <Link to={`/level/${level}`}>{level}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
