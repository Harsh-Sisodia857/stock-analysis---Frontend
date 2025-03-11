import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import signup from "../assets/signup-bg.jpg";  
import { toast } from 'react-toastify';
import { getStocks } from "../apiManager/stockApiManager";


const SignUp = () => {
  const appUrl = import.meta.env.VITE_API_URL;
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

    const response = await fetch(appUrl + "/user/signup",{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
         name : userDetails.name,
         email : userDetails.email,
         password : userDetails.password
      })
    });

    const json = await response.json();
    console.log("Sign Up JSON : ", json)
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      dispatch(setUser(json.userData));
      toast("Logged In Successfull");
      getStocks(dispatch)
      navigate('/');
    } else {
      toast.error('Enter Valid Credentials');
    }

    navigate("/");  // Navigate to the home page after successful registration
  };

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[100vh]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${signup})`,
          height: "100%",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
        }}
      >
        <div
          className="flex items-center justify-center min-h-screen bg-opacity-50"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="w-full max-w-md p-8 space-y-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={onChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label text-white">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={onChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userDetails.password}
                  onChange={onChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md text-white"
                />
              </div>

              <button
                className="button-29"
                style={{ marginRight: "20px" }}
                type="submit"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
