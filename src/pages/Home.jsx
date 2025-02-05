import { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState({
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: [],
  });

  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [isSearching, setIsSearching] = useState(false); // To toggle between showing all movies and search results

  const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";

  useEffect(() => {
    const fetchMovies = async (category) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results;
    };

    // Fetching popular, top_rated, upcoming, and now_playing movies
    Promise.all([
      fetchMovies("popular"),
      fetchMovies("top_rated"),
      fetchMovies("upcoming"),
      fetchMovies("now_playing"),
    ]).then(([popular, topRated, upcoming, nowPlaying]) => {
      setMovies({ popular, top_rated: topRated, upcoming, now_playing: nowPlaying });
    });
  }, []);

  // Add movie to a list in local storage
  const addToList = (listName, movie) => {
    let list = JSON.parse(localStorage.getItem(listName)) || [];
    if (!list.some((m) => m.id === movie.id)) {
      list.push(movie);
      localStorage.setItem(listName, JSON.stringify(list));
      setMovies({ ...movies }); // Update state to reflect changes
    }
  };

  // Handle search query change
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

  // Render movie categories and buttons
  const renderMovies = (category, title) => (
    <div>
      <h2 className="section-title">{title}</h2>
      <div className="movie-row">
        {(isSearching ? searchResults : movies[category]).map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className="movie-buttons">
              <button onClick={() => addToList("favorites", movie)} className="fav-btn">Favourite</button>
              <button onClick={() => addToList("watchlist", movie)} className="watchlist-btn">Watchlist</button>
              <button onClick={() => addToList("watched", movie)} className="watched-btn">Watched</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Render movie categories */}
      {renderMovies("popular", "Popular Movies")}
      {renderMovies("top_rated", "Top Rated Movies")}
      {renderMovies("upcoming", "Upcoming Movies")}
      {renderMovies("now_playing", "Now Playing")}
    </div>
  );
};

export default Home;
