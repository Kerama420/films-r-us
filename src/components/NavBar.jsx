import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavBar = ({ setSearchQuery }) => {
  const location = useLocation();

  const resetHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    if (setSearchQuery) setSearchQuery(""); // Reset search if provided
  };

  useEffect(() => {
    if (location.pathname === "/") resetHome(); // Reset when navigating to Home
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={resetHome}>
        Films-r-us
      </Link>
      <div className="nav-links">
        <Link to="/" onClick={resetHome}>Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/watched">Watched</Link>
      </div>
    </nav>
  );
};

export default NavBar;
