import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Films-r-us
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/watched">Watched</Link>
      </div>
    </nav>
  );
};

export default NavBar;
