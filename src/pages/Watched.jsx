import { useEffect, useState } from "react";

const Watched = () => {
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    setWatched(JSON.parse(localStorage.getItem("watched")) || []);
  }, []);

  return (
    <div>
      <h2 className="section-title">Watched Movies</h2>
      <div className="movie-row">
        {watched.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watched;
