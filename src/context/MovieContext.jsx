import { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);

  const addFavorite = (movie) => setFavorites([...favorites, movie]);

  const addToWatchlist = (movie) => setWatchlist([...watchlist, movie]);

  const markAsWatched = (movie) => {
    setWatched([...watched, movie]);
    setWatchlist(watchlist.filter((m) => m.id !== movie.id)); // Remove from watchlist
  };

  return (
    <MovieContext.Provider value={{ favorites, watchlist, watched, addFavorite, addToWatchlist, markAsWatched }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
