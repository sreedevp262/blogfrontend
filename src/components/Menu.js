import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-black text-white p-1 w-48">
      {!user && (
        <h3>
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </h3>
      )}
      {!user && (
        <h3>
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </h3>
      )}
      {user && (
        <h3>
          <Link to={`/profile/${user._id}`} className="text-blue-400 hover:underline">
            Profile
          </Link>
        </h3>
      )}
      {/* {user && (
        <h3>
          <Link to="/write" className="text-blue-400 hover:underline">
            Write
          </Link>
        </h3>
      )} */}
      {user && (
        <h3>
          <Link to={`/myblogs/${user._id}`} className="text-blue-400 hover:underline">
            My Blogs
          </Link>
        </h3>
      )}
      {user && (
        <h3 onClick={handleLogout} className="cursor-pointer hover:text-red-500 text-red">
          Logout
        </h3>
      )}
    </div>
  );
}

export default Menu;
