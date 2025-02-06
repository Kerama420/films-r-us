import { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState({
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: [],
  });
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";

  useEffect(() => {
    const fetchMovies = async (category) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results;
    };

    Promise.all([
      fetchMovies("popular"),
      fetchMovies("top_rated"),
      fetchMovies("upcoming"),
      fetchMovies("now_playing"),
    ]).then(([popular, topRated, upcoming, nowPlaying]) => {
      setMovies({ popular, top_rated: topRated, upcoming, now_playing: nowPlaying });
    });
  }, []);

  const fetchTrailer = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      setShowTrailer(true);
    }
  };

  const getButtonLabel = (listName, movieId) => {
    const list = JSON.parse(localStorage.getItem(listName)) || [];
    return list.some((m) => m.id === movieId);
  };

  const toggleList = (listName, movie) => {
    let list = JSON.parse(localStorage.getItem(listName)) || [];
    if (list.some((m) => m.id === movie.id)) {
      list = list.filter((m) => m.id !== movie.id); // Remove movie
    } else {
      list.push(movie); // Add movie
    }
    localStorage.setItem(listName, JSON.stringify(list));
    setMovies({ ...movies }); // Force re-render
  };

  const renderMovies = (category, title) => {
    const filteredMovies = movies[category].filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <h2 className="section-title">{title}</h2>
        <div className="movie-row">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => fetchTrailer(movie.id)}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <div className="movie-buttons">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleList("favorites", movie); }}
                  className="fav-btn"
                >
                  {getButtonLabel("favorites", movie.id) ? "Favorited" : "Favourite"}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleList("watchlist", movie); }}
                  className="watchlist-btn"
                >
                  {getButtonLabel("watchlist", movie.id) ? "✅" : "Watchlist"}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleList("watched", movie); }}
                  className="watched-btn"
                >
                  {getButtonLabel("watched", movie.id) ? "Watched ✅" : "Watched"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {renderMovies("popular", "Popular Movies")}
      {renderMovies("top_rated", "Top Rated Movies")}
      {renderMovies("upcoming", "Upcoming Movies")}
      {renderMovies("now_playing", "Now Playing")}

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

export default Home;
