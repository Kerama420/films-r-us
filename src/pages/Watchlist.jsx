import { useEffect, useState } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9"; // Your TMDB API key

  useEffect(() => {
    const loadWatchlist = () => {
      const storedWatchlist = localStorage.getItem("watchlist");
      setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    };

    loadWatchlist();

    const handleStorageChange = (e) => {
      if (e.key === "watchlist") {
        loadWatchlist();
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

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div>
      <h2 className="section-title">Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="movie-row">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => fetchTrailer(movie.id)}
              />
              <h3>{movie.title}</h3>
              <button className="remove-btn" onClick={() => removeFromWatchlist(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watchlist yet! Add some to watch later.</p>
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

export default Watchlist;
