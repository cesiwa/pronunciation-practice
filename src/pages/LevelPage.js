import React from "react";
import { Link, useParams } from "react-router-dom";

const LevelPage = () => {
  const { level } = useParams();
  const topics = [
    "Daily Life",
    "Work and Business",
    "Travel",
    "Technology",
    "Health and Fitness",
  ];

  return (
    <div>
      <h2>Level: {level}</h2>
      <p>Select a topic to practice:</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              to={`/practice/${level}/${topic.toLowerCase().replace(" ", "-")}`}
            >
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelPage;
