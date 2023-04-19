// components/CategoryGifs.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GifList from "./GifList";

const API_KEY = "F7JnNORAU4KMcG0qo3rqL3QNBUe8nVAJ";
const CATEGORY_GIFS_API_ENDPOINT = "https://api.giphy.com/v1/gifs/search";

function CategoryGifs() {
  const { category } = useParams();
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchCategoryGifs = async () => {
      try {
        const response = await axios.get(CATEGORY_GIFS_API_ENDPOINT, {
          params: {
            api_key: API_KEY,
            q: category,
            limit: 25,
          },
        });
        setGifs(response.data.data);
      } catch (error) {
        console.error("Error fetching category GIFs:", error);
      }
    };

    fetchCategoryGifs();
  }, [category]);

  return (
    <div>
      <h2>{category} GIFs</h2>
      <GifList gifs={gifs} />
    </div>
  );
}

export default CategoryGifs;
