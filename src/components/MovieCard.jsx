import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, overview } = movie;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{release_date}</p>
        <p className="mt-2 text-gray-800">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
