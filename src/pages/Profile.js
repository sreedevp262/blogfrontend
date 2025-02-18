import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ Will be manually updated, not fetched
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      // ❌ Don't fetch or set password for security reasons
    } catch (err) {
      console.log(err);
    }
  },[user._id]);

  useEffect(() => {
    if (user?._id) {
      fetchProfile();
    }
  }, [fetchProfile,user?._id]); // ✅ Correct dependency

  const handleUserUpdated = async () => {
    setUpdated(false);

    try {
      const res = await axios.put(URL + `/api/users/${user._id}`, {
        username,
        email,
        password, // ✅ Only updated if manually entered
      }, { withCredentials: true });

      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true });
      setUser(null);
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='border flex flex-col p-5'>
        <h1 className='text-xl mb-4'>Profile</h1>

        <input 
          type='text' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className='p-2 mb-2 border rounded' 
          placeholder='Your username' 
        />

        <input 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className='p-2 mb-2 border rounded' 
          placeholder='Your email' 
        />

        <input 
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className='p-2 mb-2 border rounded' 
          placeholder='Enter new password' 
        />

        <div className='flex gap-4 mt-3'>
          <button onClick={handleUserUpdated} className='px-4 py-2 bg-blue-500 text-white rounded'>
            Update
          </button>
          <button onClick={handleUserDelete} className='px-4 py-2 bg-red-500 text-white rounded'>
            Delete
          </button>
        </div>

        {updated && <h3 className='text-green-500 mt-2'>User data updated successfully</h3>}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
