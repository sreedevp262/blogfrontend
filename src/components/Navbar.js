import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import "../components/Navbar.css"; // Import CSS

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`/?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <h1>
        <Link to="/" className="navbar-logo">
          Blog App
        </Link>
      </h1>

      {path === "/" && (
        <div className="navbar-search">
          <input
            placeholder="Search a post"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <BsSearch onClick={handleSearch} />
        </div>
      )}

      <div className="navbar-menu">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}

        {!user && (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}

        {user && (
          <div onClick={showMenu} className="navbar-hamburger">
            <FaBars  />
            {menu && <Menu />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
