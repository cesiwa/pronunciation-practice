import React, { useState, useEffect } from "react";
import axios from "axios";

function SimilarityComponent() {
  const [similarity, setSimilarity] = useState(null);

  useEffect(() => {
    const fetchSimilarity = async () => {
      try {
        const response = await axios.get(
          "https://fb81-35-233-161-96.ngrok-free.app/compare",
          {
            timeout: 5000, // 5 saniyelik zaman aşımı
          }
        );
        console.log("API Response:", response.data);
        setSimilarity(response.data.similarity);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          console.error("Network Error:", error);
          // Kullanıcıya hata mesajı göster
        } else {
          console.error("Other Error:", error);
        }
      }
    };

    fetchSimilarity();
  }, []);

  return (
    <div>{similarity !== null ? <p>Benzerlik: {similarity}%</p> : <p></p>}</div>
  );
}

export default SimilarityComponent;
