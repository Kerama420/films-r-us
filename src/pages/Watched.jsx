import { useEffect, useState } from "react";

const Watched = () => {
  const [watched, setWatched] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";

  useEffect(() => {
    const loadWatched = () => {
      const storedWatched = localStorage.getItem("watched");
      setWatched(storedWatched ? JSON.parse(storedWatched) : []);
    };

    loadWatched();

    const handleStorageChange = (e) => {
      if (e.key === "watched") {
        loadWatched();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchTrailer = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      setShowTrailer(true);
    }
  };

  const removeFromWatched = (movieId) => {
    const updatedWatched = watched.filter((movie) => movie.id !== movieId);
    setWatched(updatedWatched);
    localStorage.setItem("watched", JSON.stringify(updatedWatched)); // Update localStorage
  };

  return (
    <div>
      <h2 className="section-title">Watched Movies</h2>
      {watched.length > 0 ? (
        <div className="movie-row">
          {watched.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => fetchTrailer(movie.id)}
              />
              <h3>{movie.title}</h3>
              <button className="remove-btn" onClick={() => removeFromWatched(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No watched movies yet! Try adding some.</p>
      )}

      {showTrailer && (
        <div className="trailer-modal">
          <iframe
            width="800"
            height="450"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <button className="close-btn" onClick={() => setShowTrailer(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Watched;
