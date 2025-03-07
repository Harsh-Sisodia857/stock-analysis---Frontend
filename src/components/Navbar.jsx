import { useNavigate } from "react-router-dom";
import logo from "../assets/Stock Analysis.svg";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  let role = user?.role || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  console.log("ROLE : ", role);
  console.log("USER : ", user);
  return (
    <div className="flex justify-around items-center bg-blue-600">
      <div className="text-white font-bold text-lg">
        <img src={logo} alt="Stock Analysis" className="h-[72px] w-[112px]" />
      </div>
      <div>
        <ul className="flex space-x-6">
          {role === "user" ? (
            <>
              <li>
                <a href="/" className="text-white hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/mutual_funds" className="text-white hover:text-blue-300">
                  Mutual Funds
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/" className="text-white hover:text-blue-300">
                  Stocks
                </a>
              </li>
              <li>
                <a href="/admin_mutual_funds" className="text-white hover:text-blue-300">
                  Mutual Funds
                </a>
              </li>
            </>
          )}

          {localStorage.getItem("token") ? (
            <li>
              <a
                href="/login"
                onClick={handleLogout}
                className="text-white hover:text-blue-300"
              >
                Logout
              </a>
            </li>
          ) : (
            <>
              <li>
                <a href="/login" className="text-white hover:text-blue-300">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white hover:text-blue-300">
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
