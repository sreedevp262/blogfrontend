import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

function PostDetails() {
  const { id: PostID } = useParams(); // ✅ Correct key for useParams
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch post data
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + PostID); // ✅ Correct URL
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete post function
  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + PostID, { withCredentials: true }); // ✅ Correct URL
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [PostID]);

  // ✅ Fetch comments
  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + PostID);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

 useEffect(() => {
  if (PostID) {
    fetchPostComments();
  }
}, [PostID]);


  // ✅ Post a new comment
  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create/",
        {
          comment: comment,
          author: user.username,
          postId: PostID,
          userID: user._id,
        },
        { withCredentials: true }
      );
      setComment(""); // ✅ Clear input after submitting
      fetchPostComments(); // ✅ Refresh comments dynamically
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="flex">
          <Loader />
        </div>
      ) : (
        <div className="px-8">
          <div className="border p-3 shadow">
            <div className="flex justify-between">
              <h1 className="text-3xl">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="flex space-x-2">
                  <p className="cursor-pointer" onClick={() => navigate("/edit/" + PostID)}>
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {post.photo && <img src={IF + post.photo} className="object-cover w-full max-h-[400px]" alt="" />}
              <p className="mt-4">{post.desc}</p>

              <div className="flex mt-3 space-x-2">
                <p>Categories:</p>
                {post.categories?.map((c, i) => (
                  <div key={i} className="px-3 py-1 bg-gray-200 rounded">
                    {c}
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-lg font-semibold">Comments:</h3>
              <div className="mt-2">
                {comments.length > 0 ? (
                  comments.map((c) => <Comment key={c._id} c={c} post={post} />)
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="Write your comment"
                  className="w-full px-3 py-2 border rounded"
                />
                <button onClick={postComment} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Add comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostDetails;
