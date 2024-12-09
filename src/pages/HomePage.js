import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to the Pronunciation App
        </h1>
        <p className="text-gray-600 mb-4">
          Improve your English pronunciation step by step.
        </p>
        <Link to="/select">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Select a Level and Topic
          </button>
        </Link>
      </main>
    </div>
  );
}

export default HomePage;
