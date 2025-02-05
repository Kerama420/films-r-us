import axios from "axios";

const API_KEY = "9091f10bd28f4837e82c95833a8d79b9";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
};

const fetchGenres = async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
  };
  

export { fetchMovies, fetchGenres };
