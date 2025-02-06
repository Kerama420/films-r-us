import React, { useState } from "react";

const MovieCard = ({ movie }) => {
  // States for each button
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  // Toggle favorite state
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Toggle watchlist state
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  // Toggle watched state
  const toggleWatched = () => {
    setIsWatched(!isWatched);
  };

  return (
    <div className="movie-card bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="mt-4 text-xl font-semibold">{movie.title}</h2>
      <p>{movie.release_date}</p>

      <div className="flex justify-between mt-4">
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-700"}`}
        >
          {isFavorite ? "Favorited" : "Favorite"}
        </button>

        {/* Watchlist Button */}
        <button
          onClick={toggleWatchlist}
          className={`px-4 py-2 rounded-lg ${isInWatchlist ? "bg-green-500" : "bg-gray-700"}`}
        >
          {isInWatchlist ? "✓" : "+"}
        </button>

        {/* Watched Button */}
        <button
          onClick={toggleWatched}
          className={`px-4 py-2 rounded-lg ${isWatched ? "bg-blue-500" : "bg-gray-700"}`}
        >
          {isWatched ? "Watched" : "Watch"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
