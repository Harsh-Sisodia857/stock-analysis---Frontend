import "./App.css";
import MutualFund from "./pages/MutualFund";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Stocks from "./pages/Stocks";
import Company from "./pages/Company";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import MutualFundAdminForm from "./pages/admin/CreateMutualFund";
import UpdateMutualFundPage from "./pages/admin/UpdateMutualFund";
import StockAdminPage from "./pages/admin/CreateStock";
import StockUpdatePage from "./pages/admin/UpdateStock";
import AdminRoute from "./components/AdminRoutes";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoutes";
import { getStocks } from "./apiManager/stockApiManager";
import { setStock } from "./store/slice/stockSlice";
import { toggleTheme } from "./store/slice/themeSlice";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Sofia Sans", "Droid Sans", "Droid Serif"],
        // families: ["Roboto", "Open Sans", "Lato"]
      },
    });
  }, []);

  useEffect(() => {
    const fetchStocks = async () => {
      const stocks = await getStocks();
      dispatch(setStock(stocks));
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-black"
      }`}
    >
      <Navbar theme={theme} handleTheme={handleTheme} />

      <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} pt-6`}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <SignUp />
              </AuthRedirect>
            }
          />
          <Route
            path="/mutual_funds"
            element={
              <ProtectedRoute>
                <MutualFund />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRoute>
                <Company />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/:ticker"
            element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            }
          />
          {/* admin Routes  */}
          <Route
            path="/admin_mutual_funds/new"
            element={
              <AdminRoute>
                <MutualFundAdminForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin_mutual_funds/update"
            element={
              <AdminRoute>
                <UpdateMutualFundPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin_stock/new"
            element={
              <AdminRoute>
                <StockAdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin_stock/update"
            element={
              <AdminRoute>
                <StockUpdatePage />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
