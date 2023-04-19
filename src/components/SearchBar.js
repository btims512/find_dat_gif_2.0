import React, { useState } from "react";

function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    handleClear();
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for GIFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for GIFs"
        />

        {searchTerm && (
          <span className="clear-icon" onClick={handleClear}>
            &times;
          </span>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
