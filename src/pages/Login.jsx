import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import loginBg from "../assets/login-bgm.jpg";
import { toast } from "react-toastify";
import { getStocks } from "../apiManager/stockApiManager";

export default function Login() {
  const appUrl = import.meta.env.VITE_API_URL;
  console.log("URL : ",appUrl)
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
  
    const response = await fetch(appUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log("JSON DATA : ", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      dispatch(setUser(json.userData));
      toast("Logged In Successfully");
      navigate("/");
      dispatch(getStocks()); // Correctly dispatch getStocks
    } else {
      toast.error("Enter Valid Credentials");
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[100vh]">
      <div
        style={{
          backgroundImage: `url(${loginBg})`,
          height: "100%",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
        }}
      >
        <div
          className="h-[100%]"
          style={{ paddingTop: "100px", background: "rgba(0, 0, 0, 0.5)" }}
        >
          <form
            className="w-[40%] h-auto m-auto mt-5 rounded p-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-white">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-2 mt-1 border rounded-md text-white"
                name="email"
                value={credentials.email}
                onChange={onChange}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 mt-1 border rounded-md text-white"
                value={credentials.password}
                onChange={onChange}
                name="password"
              />
            </div>
            <button
              className="button-29"
              style={{ marginRight: "20px" }}
              type="submit"
            >
              Login
            </button>
            <Link className="button-29" to="/signup">
              New User
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
