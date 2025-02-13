import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import HomePosts from "../components/HomePost";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // Memoize fetchPosts to prevent unnecessary re-renders
  const fetchPosts = useCallback(async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
      setFilterData(res.data);

      // Extract unique categories
      let categoriesSet = new Set();
      res.data.forEach((post) => {
        post.categories?.forEach((category) => categoriesSet.add(category));
      });
      setCat(Array.from(categoriesSet));

      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filtering posts by category
  const filterByCategory = (selectedCategory) => {
    const filteredPosts = posts.filter((post) =>
      post.categories.includes(selectedCategory)
    );
    setFilterData(filteredPosts);
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap justify-center p-5">
        {cat.length > 0 &&
          cat.map((category, index) => (
            <button
              key={index}
              className="p-3 m-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
      </div>

      <div className="flex flex-wrap justify-center">
        {loader ? (
          <div className="h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          filterData.map((post) => (
            <Link
              key={post._id}
              to={user? `/posts/post/${post._id}` : "/login"}
              className="m-2"
            >
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center">No posts available</h3>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
