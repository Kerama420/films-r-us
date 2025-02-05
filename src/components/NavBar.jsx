import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">Films-r-Us</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/watched">Watched</Link>
      </div>
    </nav>
  );
};

export default NavBar;
