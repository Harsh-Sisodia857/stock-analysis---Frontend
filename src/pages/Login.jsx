import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import loginBg from "../assets/login-bgm.jpg";
import { toast } from "react-toastify";
import { loginApi } from "../apiManager/stockApiManager";

export default function Login() {
  const appUrl = import.meta.env.VITE_API_URL;
  console.log("URL : ", appUrl);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      toast.error("Email is required");
      return;
    }

    if (!credentials.password) {
      toast.error("Password is required");
      return;
    }

    const response = await loginApi(credentials.email, credentials.password);
    const json = await response.json();
    console.log("JSON DATA : ", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      dispatch(setUser(json.userData));
      toast("Logged In Successfully");
      navigate("/");
    } else {
      toast.error("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-medium">Email address</label>
            <input
              id="email"
              type="email"
              className="w-full p-3 mt-1 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
            <input
              id = "password"
              type="password"
              className="w-full p-3 mt-1 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={credentials.password}
              onChange={onChange}
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">Login</button>
          </div>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-400 hover:underline">New User? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
