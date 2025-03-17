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
import { useEffect } from "react";
import { loadStocksThunk } from "./store/slice/stockSlice";
import { getStocks } from "./indexedDB";
import { useDispatch } from "react-redux";
import NotFound from "./components/NotFound";
import MutualFundAdminForm from "./pages/admin/CreateMutualFund";
import UpdateMutualFundPage from "./pages/admin/UpdateMutualFund";
import StockAdminPage from "./pages/admin/CreateStock";
import StockUpdatePage from "./pages/admin/UpdateStock";
import AdminRoute from "./components/AdminRoutes";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
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
      dispatch(loadStocksThunk(stocks));
    };

    fetchStocks();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="pt-6">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mutual_funds" element={<ProtectedRoute><MutualFund /></ProtectedRoute>} />
          <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
          <Route path="/signup" element={<AuthRedirect><SignUp /></AuthRedirect>} />
          <Route path="/company" element={<ProtectedRoute><Company /></ProtectedRoute>} />
          <Route path="/company/:ticker" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
          {/* admin Routes  */}
          <Route path="/admin_mutual_funds/new" element={<AdminRoute><MutualFundAdminForm /></AdminRoute>} />
          <Route path="/admin_mutual_funds/update" element={<AdminRoute><UpdateMutualFundPage /></AdminRoute>} />
          <Route path="/admin_stock/new" element={<AdminRoute><StockAdminPage/></AdminRoute>} />
          <Route path="/admin_stock/update" element={<AdminRoute><StockUpdatePage/></AdminRoute>} />
          
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
