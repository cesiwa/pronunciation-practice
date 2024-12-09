import React from "react";

function SelectionPage() {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const topics = [
    "Daily Life",
    "Work and Business",
    "Travel",
    "Technology",
    "Health and Fitness",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Select a Level and Topic
      </h1>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select a Level:</h2>
          <select className="border border-gray-300 rounded p-2">
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select a Topic:</h2>
          <select className="border border-gray-300 rounded p-2">
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default SelectionPage;
