import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import signup from "../assets/signup-bg.jpg";  
import { toast } from 'react-toastify';
import { signUpApi } from "../apiManager/stockApiManager";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.name) {
      toast.error('Name is required');
      return;
    }
    if (!userDetails.email) {
      toast.error('Email is required');
      return;
    }
    if (!userDetails.password) {
      toast.error('Password is required');
      return;
    }
    const response = await signUpApi(userDetails);

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      dispatch(setUser(json.userData));
      toast("Logged In Successfully");
      navigate('/');
    } else {
      toast.error('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${signup})` }}>
      <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={onChange}
              required
              className="w-full p-3 mt-1 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={onChange}
              required
              className="w-full p-3 mt-1 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              onChange={onChange}
              required
              className="w-full p-3 mt-1 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
