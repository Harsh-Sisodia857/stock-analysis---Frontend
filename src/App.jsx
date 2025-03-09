import "./App.css";
import MutualFund from "./pages/MutualFund";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import Stocks from "./pages/Stocks";
import Company from "./pages/Company";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mutual_funds" element={<MutualFund />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company/stock" element={<Stocks />} />
      </Routes>
    </>
  );
}

export default App;
