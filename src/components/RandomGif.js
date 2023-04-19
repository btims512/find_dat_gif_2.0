import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const RANDOM_API_ENDPOINT = "https://api.giphy.com/v1/gifs/random";

function RandomGif() {
  const [randomGif, setRandomGif] = useState(null);

  const fetchRandomGif = async () => {
    try {
      const response = await axios.get(RANDOM_API_ENDPOINT, {
        params: {
          api_key: API_KEY,
        },
      });
      setRandomGif(response.data.data);
    } catch (error) {
      console.error("Error fetching random gif:", error);
    }
  };

  useEffect(() => {
    fetchRandomGif();
  }, []);

  return (
    <div className="random-gif-container">
      {randomGif && (
        <img src={randomGif.images.fixed_width.url} alt={randomGif.title} />
      )}
      <button onClick={fetchRandomGif}>Get another random GIF</button>
    </div>
  );
}

export default RandomGif;
