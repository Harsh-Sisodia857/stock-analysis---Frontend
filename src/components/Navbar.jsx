import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import logo from "../assets/Stock Analysis.png";
import { Menu, X } from "lucide-react"; // used for icon in mobile menu

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  let role = user?.role || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Stock Analysis" className="h-12 w-auto" />
            <p className="logo-heading text-[#d0a933] text-2xl font-bold"> STOCK ANALYSIS</p>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {role === "user" ? (
              <>
                <a href="/" className="text-white hover:text-blue-300 transition">Home</a>
                <a href="/about" className="text-white hover:text-blue-300 transition">About Us</a>
                <a href="/mutual_funds" className="text-white hover:text-blue-300 transition">Mutual Funds</a>
              </>
            ) : (
              <>
                <a href="/" className="text-white hover:text-blue-300 transition">Stocks</a>
                <a href="/admin_mutual_funds" className="text-white hover:text-blue-300 transition">Mutual Funds</a>
              </>
            )}

            {localStorage.getItem("token") ? (
              <button onClick={handleLogout} className="text-white hover:text-blue-300 transition">Logout</button>
            ) : (
              <>
                <a href="/login" className="text-white hover:text-blue-300 transition">Login</a>
                <a href="/signup" className="text-white hover:text-blue-300 transition">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            {role === "user" ? (
              <>
                <a href="/" className="text-white hover:text-blue-300 transition">Home</a>
                <a href="/about" className="text-white hover:text-blue-300 transition">About Us</a>
                <a href="/mutual_funds" className="text-white hover:text-blue-300 transition">Mutual Funds</a>
              </>
            ) : (
              <>
                <a href="/" className="text-white hover:text-blue-300 transition">Stocks</a>
                <a href="/admin_mutual_funds" className="text-white hover:text-blue-300 transition">Mutual Funds</a>
              </>
            )}

            {localStorage.getItem("token") ? (
              <button onClick={handleLogout} className="text-white hover:text-blue-300 transition">Logout</button>
            ) : (
              <>
                <a href="/login" className="text-white hover:text-blue-300 transition">Login</a>
                <a href="/signup" className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition">
                  Sign Up
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
