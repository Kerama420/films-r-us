import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // Clears search results
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-grow p-2 rounded border border-gray-300"
      />
      {query && ( // Show the "Clear" button only when there's text
        <button
          type="button"
          onClick={handleClear}
          className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          ✖
        </button>
      )}
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
