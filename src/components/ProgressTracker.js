import React from "react";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const topics = [
  "Daily Life",
  "Work and Business",
  "Travel",
  "Technology",
  "Health and Fitness",
];

function ProgressTracker() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Progress</h2>
      {levels.map((level) => (
        <div key={level} className="mb-6">
          <h3 className="font-semibold text-lg mb-2">{level}</h3>
          {topics.map((topic) => (
            <div key={topic} className="flex justify-between mb-2">
              <span>{topic}</span>
              <div className="w-2/3 bg-gray-300 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProgressTracker;
