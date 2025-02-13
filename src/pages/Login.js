import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
// import { URL } from "../url"; // Ensure this is correctly imported
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, handleLog } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,password
      },{ withCredentials: true }
      // { 
        // method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({ email, password }),
      // }
    );
      if(res.status===200|| 201){
        alert('login successful')
      }
      handleLog()
      navigate('/');
      const data = res.data;
      console.log("API Response:", data); // Log response for debugging
  
      if (!res.ok) {
        setError(res.message || "Invalid credentials");
        return;
      }
  
      setUser(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };
  

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-lg">
          <Link to="/">Blog App</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>

      <div className="w-full">
        <div className="flex flex-col p-5">
          <h1 className="text-xl font-bold mb-4">Login to your account</h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            type="email"
            placeholder="Enter your Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            type="password"
            placeholder="Enter your Password"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          {error && <h3 className="text-red-500 text-sm mt-2">{error}</h3>}

          <div className="flex justify-center mt-4">
            <p className="mr-2">New here?</p>
            <p className="text-blue-600">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
