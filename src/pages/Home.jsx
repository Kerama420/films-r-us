import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState({
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: [],
  });
  const [searchResults, setSearchResults] = useState([]); // Store searched movies
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track pagination

  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";

  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const fetchMovies = async (category, pageNum = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${pageNum}`
    );
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchMovies("popular", page),
      fetchMovies("top_rated", page),
      fetchMovies("upcoming", page),
      fetchMovies("now_playing", page),
    ]).then(([popular, topRated, upcoming, nowPlaying]) => {
      setMovies((prevMovies) => ({
        popular: [...prevMovies.popular, ...popular],
        top_rated: [...prevMovies.top_rated, ...topRated],
        upcoming: [...prevMovies.upcoming, ...upcoming],
        now_playing: [...prevMovies.now_playing, ...nowPlaying],
      }));
      setLoading(false);
    });
  }, [page]); // Fetch movies whenever `page` increases

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

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

  const toggleList = (listName, movie) => {
    let list = JSON.parse(localStorage.getItem(listName)) || [];
    if (list.some((m) => m.id === movie.id)) {
      list = list.filter((m) => m.id !== movie.id);
    } else {
      list.push(movie);
    }
    localStorage.setItem(listName, JSON.stringify(list));
    setMovies({ ...movies }); // Force re-render
  };

  const renderMovies = (moviesList, title) => (
    <div>
      <h2 className="section-title">{title}</h2>
      <div className="movie-row">
        {moviesList.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => fetchTrailer(movie.id)}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className="movie-buttons">
              <button onClick={(e) => { e.stopPropagation(); toggleList("favorites", movie); }}>
                {JSON.parse(localStorage.getItem("favorites") || "[]").some((m) => m.id === movie.id) ? "Favorited" : "Favourite"}
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleList("watchlist", movie); }}>
                {JSON.parse(localStorage.getItem("watchlist") || "[]").some((m) => m.id === movie.id) ? "✅" : "Watchlist"}
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleList("watched", movie); }}>
                {JSON.parse(localStorage.getItem("watched") || "[]").some((m) => m.id === movie.id) ? "Watched ✅" : "Watched"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Infinite Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {loading && <p className="loading-text">Loading movies...</p>}

      {searchResults.length > 0 ? (
        renderMovies(searchResults, "Search Results")
      ) : (
        <>
          {renderMovies(movies.popular, "Popular Movies")}
          {renderMovies(movies.top_rated, "Top Rated Movies")}
          {renderMovies(movies.upcoming, "Upcoming Movies")}
          {renderMovies(movies.now_playing, "Now Playing")}
        </>
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

export default Home;
