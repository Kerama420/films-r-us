import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MovieProvider from "./context/MovieContext";
import "./index.css"; // Ensure this is included for styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider> {/* Wrap App inside MovieProvider */}
      <App />
    </MovieProvider>
  </React.StrictMode>
);
