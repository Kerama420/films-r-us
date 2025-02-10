import { Link } from "react-router-dom";

const NavBar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={scrollToTop}>
        Films-r-us
      </Link>
      <div className="nav-links">
        <Link to="/" onClick={scrollToTop}>Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/watched">Watched</Link>
      </div>
    </nav>
  );
};

export default NavBar;
