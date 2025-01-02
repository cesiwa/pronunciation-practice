const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors());

// Oxford Dictionaries API credentials
const apiKey = "dc3e67194813a43217e764030024d472";
const appId = "f7411cb1";

// Load JSON data
const jsonData = require("../src/data/levels.json");

app.get("/", (req, res) => {
  res.send("API is running...");
});
2;

// API endpoint - Fetch words and definitions
app.post("/words", async (req, res) => {
  const { topicId, level, topicNumber } = req.body;
  console.log("Received data:", topicId, level, topicNumber); //bunlar doğru
  console.log("JSON data structure:", jsonData);

  // Filter JSON data
  /*   const selectedTopic = jsonData.find(
    (data) =>
      data.topics.find((id) => id.id) === topicNumber && data.level === level
  ); */
  // Filter JSON data
  /*  const selectedTopic = jsonData.find((data) => {
    const topicExists = data.topics.some((topic) => topic.id === topicNumber);
    console.log("Checking data:", {
      levelMatch: data.level === level,
      topicExists,
    });

    return topicExists && data.level === level;
  }); */
  const selectedTopic = jsonData.find(
    (data) =>
      data.level === level &&
      data.topics.some((topic) => topic.id === topicNumber)
  );

  if (!selectedTopic) {
    return res.status(404).json({ error: "Topic or level not found" });
  }

  console.log("Selected Topic:", selectedTopic);

  /*  
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
      words.map(async (word) => {
        try {
          const response = await axios.get(
            //burayı bir sor belki post olması geekiyodur
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word.lower()}`,
            {
              headers: {
                app_id: appId,
                app_key: apiKey,
              },
            }
          );
          return response.data;
          return { word: wordObj.word, definitions, audioFiles };

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
        } catch (error) {
          if (error.response) {
            console.error(
              `Error for word "${word}": Status ${error.response.status}, Message: ${error.response.statusText}`
            );
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error(
              `No response received for word "${word}". Request:`,
              error.request
            );
          } else {
            console.error(
              `Error in setting up request for word "${word}":`,
              error.message
            );
          }
          return null;
        }
      })
    );
    /* ddmkds */
    res.json(results.filter((result) => result !== null));
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
