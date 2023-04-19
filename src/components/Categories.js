import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../components/styles/_categories.scss";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const CATEGORIES_API_ENDPOINT = "https://api.giphy.com/v1/gifs/categories";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_API_ENDPOINT, {
          params: {
            api_key: API_KEY,
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <Link to={`/category/${encodeURIComponent(category.name)}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
