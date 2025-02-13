import React, { useState, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../url"; // Ensure URL is imported

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("Big data");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      setCats([...cats, cat]);
      setCat(""); // Clear the selection
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Description before submit:", desc);

    const post = {
      title,
      desc,
      username: user?.username,
      author: user?.username,
      userId: user?._id, // FIXED: Changed _Id to _id
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data); // FIXED: Added URL
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("http://localhost:8000/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id); // FIXED: Changed _Id to _id
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h1 className="font-bold text-2xl">Create a Post</h1>
        <form className="flex flex-col w-full max-w-md mt-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 border rounded-md outline-none mb-2"
            required
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 py-2 border rounded-md mb-2"
          />
          <div className="flex flex-col mb-2">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Big data">Big Data</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Business Management">Business Management</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Database">Database</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="DevOps">DevOps</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <button
              type="button"
              onClick={addCategory}
              className="bg-black text-white px-4 py-2 rounded-md mt-2"
            >
              Add Category
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
          value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            className="px-4 py-2 border rounded-md mb-2"
            placeholder="Enter Post Description"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
