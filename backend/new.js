const url =
  "https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb"; // Oxford API endpoint
const appId = "f7411cb1"; // App ID
const appKey = "77b1949c33090aa1e7aadf68b6b7ea96"; // App Key

async function fetchOxfordAPI(word) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      app_id: appId,
      app_key: appKey,
    },
    body: JSON.stringify({
      word: word, // Gönderilmek istenen kelime
    }),
  };

  try {
    const response = await fetch(`${url}/${word}`, options);
    if (!response.ok) {
      throw new Error(`Oxford API Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data); // Geri dönen veriyi konsola yazdır
  } catch (error) {
    console.error("Error:", error); // Hata durumunda console.log
  }
}

// Örnek kelime gönderimi
fetchOxfordAPI("apple");
