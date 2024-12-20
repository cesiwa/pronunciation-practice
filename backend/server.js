const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors());

// Oxford Dictionaries API credentials
const apiKey = "77b1949c33090aa1e7aadf68b6b7ea96";
const appId = "f7411cb1";

// Load JSON data
const jsonData = require("../src/data/levels.json");

// API endpoint - Fetch words and definitions
app.all("*", async (req, res) => {
  const { topicId, level, topicNumber } = req.body;
  console.log("Received data:", topicId, level, topicNumber); //bunlar doğru
  console.log("JSON data structure:", jsonData);

  // Filter JSON data
  /*   const selectedTopic = jsonData.find(
    (data) =>
      data.topics.find((id) => id.id) === topicNumber && data.level === level
  ); */
  // Filter JSON data
  const selectedTopic = jsonData.find((data) => {
    const topicExists = data.topics.some((topic) => topic.id === topicNumber);
    console.log("Checking data:", {
      levelMatch: data.level === level,
      topicExists,
    });

    return topicExists && data.level === level;
  });

  if (!selectedTopic) {
    return res.status(404).json({ error: "Topic or level not found" });
  }

  console.log("Selected Topic:", selectedTopic);

  res.json({ topic: selectedTopic });
  if (!selectedTopic) {
    return res.status(404).json({ error: "Topic or level not found" });
  }

  const selectedLevel = jsonData.find((item) => item.level === level);
  if (!selectedLevel) {
    return res.status(404).json({ error: "Level not found" });
  }

  /*  const words = selectedTopic.words.slice(0, 10); // Limit to first 10 words */
  const words =
    selectedTopic?.topics?.flatMap((topic) =>
      topic.words.map((wordObj) => wordObj.word)
    ) || [];

  try {
    const results = await Promise.all(
      words.map(async (wordObj) => {
        try {
          const response = await axios.get(
            //burayı bir sor belki post olması geekiyodur
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${wordObj.word}`,
            {
              headers: {
                app_id: appId,
                app_key: apiKey,
              },
            }
          );

          const wordData = response.data;
          const definitions = [];
          const audioFiles = [];

          wordData.results[0]?.lexicalEntries.forEach((entry) => {
            entry.entries.forEach((e) => {
              e.senses.forEach((sense) => {
                if (sense.definitions) {
                  definitions.push(...sense.definitions);
                }
              });
            });

            entry.pronunciations?.forEach((pronunciation) => {
              if (pronunciation.audioFile) {
                audioFiles.push(pronunciation.audioFile);
              }
            });
          });

          return { word: wordObj.word, definitions, audioFiles };
        } catch (error) {
          console.error(
            `Error fetching data for word: ${wordObj.word}`,
            error.message
          );
          return { word: wordObj.word, definitions: [], audioFiles: [] };
        }
      })
    );
    /* ddmkds */
    res.json(results);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
