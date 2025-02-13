import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { URL } from "../url"; // Ensure URL is imported

function EditPost() {
  const PostId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  // Memoizing fetchPost with useCallback
  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + PostId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  }, [PostId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]); // ✅ Now `fetchPost` is a stable dependency

  const handleUpdate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      desc,
      username: user?.username,
      userId: user?._id,
      categories: cats,
    };

    if (file && typeof file !== "string") {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + PostId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h1 className="font-bold text-2xl">Update Your Post</h1>
        <form className="flex flex-col w-full max-w-md mt-4" onSubmit={handleUpdate}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter Post Title"
            className="px-4 py-2 border rounded-md outline-none mb-2"
            required
          />
          <input
            type="file"
            className="px-4 py-2 border rounded-md mb-2"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex flex-col mb-2">
            <input
              type="text"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="Enter Post Category"
              className="px-4 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={addCategory}
              className="bg-black text-white px-4 py-2 rounded-md mt-2"
            >
              ADD
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {cats.map((c, i) => (
              <div key={i} className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                <p className="mr-2">{c}</p>
                <button onClick={() => deleteCategory(i)} className="text-red-500">
                  <ImCross />
                </button>
              </div>
            ))}
          </div>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={5}
            className="px-4 py-2 border rounded-md mb-2"
            placeholder="Enter Post Description"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Update Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost;
