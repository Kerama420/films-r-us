import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };

    loadFavorites(); // Load on mount

    // Listen for updates from other parts of the app
    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        loadFavorites();
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

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div>
      <h2 className="section-title">Favourite Movies</h2>
      {favorites.length > 0 ? (
        <div className="movie-row">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => fetchTrailer(movie.id)}
              />
              <h3>{movie.title}</h3>
              <button className="remove-btn" onClick={() => removeFromFavorites(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite movies yet! Try adding some.</p>
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

export default Favorites;
