import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/Stock Analysis.png";
import { Menu, X, Plus, List, Moon, Sun, Download } from "lucide-react";
import {
  handleDownloadMutualFund,
  handleDownloadStock,
} from "../apiManager/stockApiManager";

function Navbar({ theme, handleTheme }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mutualFundsMenuOpen, setMutualFundsMenuOpen] = useState(false);
  const [stocksMenuOpen, setStocksMenuOpen] = useState(false);
  const mutualFundsRef = useRef(null);
  const stocksRef = useRef(null);
  let role = user?.role || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Click outside handler to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mutualFundsRef.current &&
        !mutualFundsRef.current.contains(event.target)
      ) {
        setMutualFundsMenuOpen(false);
      }
      if (stocksRef.current && !stocksRef.current.contains(event.target)) {
        setStocksMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Stock Analysis" className="h-12 w-auto" />
            <p className="logo-heading text-[#d0a933] text-2xl font-bold">
              {" "}
              STOCK ANALYSIS
            </p>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {role === "user" ? (
              <>
                <a
                  href="/"
                  className="text-white hover:text-blue-300 transition"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-blue-300 transition"
                >
                  About Us
                </a>
                <a
                  href="/mutual_funds"
                  className="text-white hover:text-blue-300 transition"
                >
                  Mutual Funds
                </a>
                <a
                  href="/company"
                  className="text-white hover:text-blue-300 transition"
                >
                  All Companies
                </a>
              </>
            ) : (
              <>
                {/* Admin Stocks Dropdown */}
                <div className="relative" ref={stocksRef}>
                  <button
                    onClick={() => {
                      setStocksMenuOpen(!stocksMenuOpen);
                      setMutualFundsMenuOpen(false);
                    }}
                    className="flex items-center  cursor-pointer text-white hover:text-blue-300 transition focus:outline-none"
                  >
                    <span>Stocks</span>
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={stocksMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  </button>

                  {/* Admin Stocks Dropdown Menu */}
                  {stocksMenuOpen && (
                    <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <a
                          href="/company"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                        >
                          <List className="mr-3 h-4 w-4 text-blue-600" />
                          <span>View Stocks</span>
                        </a>
                        <a
                          href="/admin_stock/new"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                        >
                          <Plus className="mr-3 h-4 w-4 text-green-600" />
                          <span>Add New Stock</span>
                        </a>

                        <a
                          onClick={handleDownloadStock}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Download className="mr-3 h-4 w-4 text-purple-600" />
                          <span>Import Stock Data</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Admin Mutual Funds Dropdown */}
                <div className="relative" ref={mutualFundsRef}>
                  <button
                    onClick={() => {
                      setMutualFundsMenuOpen(!mutualFundsMenuOpen);
                      setStocksMenuOpen(false);
                    }}
                    className="flex items-center cursor-pointer text-white hover:text-blue-300 transition focus:outline-none"
                  >
                    <span>Mutual Funds</span>
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          mutualFundsMenuOpen
                            ? "M5 15l7-7 7 7"
                            : "M19 9l-7 7-7-7"
                        }
                      />
                    </svg>
                  </button>

                  {mutualFundsMenuOpen && (
                    <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <a
                          href="/mutual_funds"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                        >
                          <List className="mr-3 h-4 w-4 text-blue-600" />
                          <span>View All Mutual Funds</span>
                        </a>
                        <a
                          href="/admin_mutual_funds/new"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                        >
                          <Plus className="mr-3 h-4 w-4 text-green-600" />
                          <span>Add New Mutual Fund</span>
                        </a>
                        <a
                          onClick={handleDownloadMutualFund}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Download className="mr-3 h-4 w-4 text-purple-600" />
                          <span>Import Fund Analytics</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {localStorage.getItem("token") ? (
              <a
                onClick={handleLogout}
                className="text-white hover:text-blue-300 transition cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white hover:text-blue-300 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className=" text-white hover:text-blue-300 transition"
                >
                  Sign Up
                </a>
              </>
            )}

            <button
              onClick={handleTheme}
              className="text-white dark:text-gray-200 hover:text-blue-300 transition cursor-pointer"
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            {role === "user" ? (
              <>
                <a
                  href="/"
                  className="text-white hover:text-blue-300 transition"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-blue-300 transition"
                >
                  About Us
                </a>
                <a
                  href="/mutual_funds"
                  className="text-white hover:text-blue-300 transition"
                >
                  Mutual Funds
                </a>
                <a
                  href="/company"
                  className="text-white hover:text-blue-300 transition"
                >
                  All Companies
                </a>
              </>
            ) : (
              <>
                {/* Admin Mobile Menu - Stocks Section */}
                <div className="border-t border-blue-500 pt-2 pb-1">
                  <p className="text-blue-300 text-xs uppercase tracking-wide font-semibold mb-2">
                    Stocks Management
                  </p>
                  <a
                    href="/admin/stocks"
                    className="flex items-center text-white hover:text-blue-300 transition py-2 cursor-pointer"
                  >
                    <List className="mr-2 h-4 w-4" />
                    <span>View Stocks</span>
                  </a>
                  <a
                    href="/admin_stock/new"
                    className="flex items-center text-white hover:text-blue-300 transition py-2 cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add New Stock</span>
                  </a>
                  <a
                    onClick={handleDownloadStock}
                    className="flex items-center text-white hover:text-blue-300 cursor-pointer transition py-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>Import Stock Data</span>
                  </a>
                </div>

                {/* Admin Mobile Menu - Mutual Funds Section */}
                <div className="border-t border-blue-500 pt-2 pb-1">
                  <p className="text-blue-300 text-xs uppercase tracking-wide font-semibold mb-2">
                    Mutual Funds Management
                  </p>
                  <a
                    href="/admin_mutual_funds"
                    className="flex items-center text-white hover:text-blue-300 transition py-2"
                  >
                    <List className="mr-2 h-4 w-4" />
                    <span>View All Funds</span>
                  </a>
                  <a
                    href="/admin_mutual_funds/new"
                    className="flex items-center text-white hover:text-blue-300 transition py-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add New Fund</span>
                  </a>
                  <a
                    onClick={handleDownloadMutualFund}
                    className="flex items-center text-white hover:text-blue-300 transition py-2 cursor-pointer"
                  >
                    <Download className="mr-3 h-4 w-4 text-purple-600" />
                    <span>Import Fund Analytics</span>
                  </a>
                </div>
              </>
            )}

            {localStorage.getItem("token") ? (
              <a
                onClick={handleLogout}
                className="text-white hover:text-blue-300 transition cursor-pointer mt-2"
              >
                Logout
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white hover:text-blue-300 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="text-white hover:text-blue-300 transition"
                >
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
