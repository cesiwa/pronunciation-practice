import React from "react";
import { useNavigate } from "react-router-dom";

function TopicSelector() {
  const navigate = useNavigate();
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const topics = [
    "Daily Life",
    "Work and Business",
    "Travel",
    "Technology",
    "Health and Fitness",
  ];

  const handleSelection = (level, topic) => {
    navigate(`/topic/${level}/${topic}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select a Level and Topic</h2>
      {levels.map((level) => (
        <div key={level} className="mb-4">
          <h3 className="font-semibold text-lg mb-2">{level}</h3>
          <div className="flex gap-2 flex-wrap">
            {topics.map((topic) => (
              <button
                key={topic}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleSelection(level, topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicSelector;
