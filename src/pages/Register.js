import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { URL } from '../url';
import Footer from '../components/Footer';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  // const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      
      const res = await axios.post( "http://localhost:8000/api/auth/register", { username, email, password });
      setError(false);
      alert(res.data)
      // navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between px-5 py-3 border-b'>
        <h1 className='text-lg font-bold'>
          <Link to="/"> Blog App </Link>
        </h1>
        <h3 className='text-blue-500'>
          <Link to="/login">Login</Link>
        </h3>
      </div>

      <div className='w-full flex justify-center items-center min-h-screen'>
        <div className='flex flex-col p-6 shadow-lg rounded-lg w-80 bg-white'>
          <h1 className='text-xl font-semibold text-center mb-4'>Create an Account</h1>

          <form onSubmit={handleRegister}>

          <input 
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 mb-2 border rounded'
            type='text'
            placeholder='Enter your name'
          />

          <input 
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 mb-2 border rounded'
            type='email'
            placeholder='Enter your Email'
          />

          <input 
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 mb-3 border rounded'
            type='password'
            placeholder='Enter your Password'
          />

          <button 
            className='w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            type="submit"
          >
            Register
          </button>

          </form>
          {error && <h3 className='text-red-500 text-sm text-center mt-2'> Something went wrong</h3>}

          <div className='flex justify-center items-center mt-3 text-sm'>
            <p>Already have an account?</p>
            <p className='ml-1 text-blue-500'>
              <Link to='/login'>Login</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
