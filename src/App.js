import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GifList from "./components/GifList";
import RandomGif from "./components/RandomGif";
import Categories from "./components/Categories";
import StickersSearch from "./components/StickersSearch";
import CategoryGifs from "./components/CategoryGifs";
import axios from "axios";

import "./App.scss";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const SEARCH_API_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
const TRENDING_API_ENDPOINT = "https://api.giphy.com/v1/gifs/trending";

function App() {
  const [gifs, setGifs] = useState([]);
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [offset, setOffset] = useState(0);

  const loadMoreGifs = async () => {
    try {
      const response = await axios.get(TRENDING_API_ENDPOINT, {
        params: {
          api_key: API_KEY,
          limit: 25,
          offset: offset + 25,
        },
      });
      setTrendingGifs([...trendingGifs, ...response.data.data]);
      setOffset(offset + 25);
    } catch (error) {
      console.error("Error loading more gifs:", error);
    }
  };

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const response = await axios.get(TRENDING_API_ENDPOINT, {
          params: {
            api_key: API_KEY,
            limit: 25,
          },
        });
        setTrendingGifs(response.data.data);
      } catch (error) {
        console.error("Error fetching trending gifs:", error);
      }
    };

    fetchTrendingGifs();
  }, []);

  const searchGifs = async (searchTerm, loadMore = false) => {
    try {
      const response = await axios.get(SEARCH_API_ENDPOINT, {
        params: {
          api_key: API_KEY,
          q: searchTerm,
          limit: 25,
          offset: loadMore ? offset + 25 : 0,
        },
      });
      setGifs(loadMore ? [...gifs, ...response.data.data] : response.data.data);
      setOffset(loadMore ? offset + 25 : 25);
    } catch (error) {
      console.error("Error fetching gifs:", error);
    }
  };

  const clearSearch = () => {
    setGifs([]);
  };

  return (
    <div className="App">
      <Navbar onHomeClick={clearSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={searchGifs} onClear={clearSearch} />
              <GifList gifs={gifs} />
              <h2>Trending GIFs</h2>
              <GifList gifs={trendingGifs} />
              <button onClick={loadMoreGifs} className="show-more">
                Load more trendig
              </button>
            </>
          }
        />
        <Route path="/random" element={<RandomGif />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryGifs />} />
        <Route path="/stickers-search" element={<StickersSearch />} />
      </Routes>
    </div>
  );
}

export default App;
