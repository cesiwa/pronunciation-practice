import React from "react";
import { useParams } from "react-router-dom";

function TopicPage() {
  const { level, topic } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Level: {level}, Topic: {topic}
      </h1>
      <p className="text-lg">
        This page is under construction. Content for {topic} at {level} will be
        available soon.
      </p>
    </div>
  );
}

export default TopicPage;
