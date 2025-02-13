import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePost";
import Loader from "../components/Loader";

function MyBlogs() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  // ✅ Use useCallback to prevent function recreation
  const fetchPosts = useCallback(async () => {
    if (!user) return; // Prevent API call if user is null

    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }, [user]); // ✅ Now, fetchPosts only changes when user changes

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, search]); // ✅ No ESLint warning now!

  return (
    <div>
      <Navbar />
      <div className="flex">
        {loader ? (
          <div className="flex">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <div key={post._id}>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            </div>
          ))
        ) : (
          <h3 className="text-center">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyBlogs;
