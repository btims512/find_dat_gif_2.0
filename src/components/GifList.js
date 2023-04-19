import React from "react";

function GifList({ gifs }) {
  return (
    <div className="gif-list">
      {gifs.map((gif) => (
        <img key={gif.id} src={gif.images.fixed_width.url} alt={gif.title} />
      ))}
    </div>
  );
}

export default GifList;
