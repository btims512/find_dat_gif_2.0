import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import GifList from "./GifList";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const STICKERS_SEARCH_API_ENDPOINT = "https://api.giphy.com/v1/stickers/search";
const TRENDING_STICKERS_API_ENDPOINT =
  "https://api.giphy.com/v1/stickers/trending";

function StickersSearch() {
  const [stickers, setStickers] = useState([]);
  const [trendingStickers, setTrendingStickers] = useState([]);

  useEffect(() => {
    const fetchTrendingStickers = async () => {
      try {
        const response = await axios.get(TRENDING_STICKERS_API_ENDPOINT, {
          params: {
            api_key: API_KEY,
            limit: 25,
          },
        });
        setTrendingStickers(response.data.data);
      } catch (error) {
        console.error("Error fetching trending stickers:", error);
      }
    };

    fetchTrendingStickers();
  }, []);

  const searchStickers = async (searchTerm) => {
    try {
      const response = await axios.get(STICKERS_SEARCH_API_ENDPOINT, {
        params: {
          api_key: API_KEY,
          q: searchTerm,
          limit: 25,
        },
      });
      setStickers(response.data.data);
    } catch (error) {
      console.error("Error fetching stickers:", error);
    }
  };

  return (
    <div>
      <h2>Sticker Search</h2>
      <SearchBar onSearch={searchStickers} />
      <GifList gifs={stickers} />
      <h2>Trending Stickers</h2>
      <GifList gifs={trendingStickers} />
    </div>
  );
}

export default StickersSearch;
