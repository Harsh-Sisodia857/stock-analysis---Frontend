import React, { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { deleteStock } from "../apiManager/stockApiManager";
import { toast } from "react-toastify";
import { setStock } from "../store/slice/stockSlice";

// Function to categorize market caps
const getMarketCapCategory = (marketCap) => {
  if (marketCap < 5000) return "Micro"; // Less than ₹5,000 Cr
  if (marketCap < 20000) return "Small"; // ₹5,000 Cr - ₹20,000 Cr
  if (marketCap < 50000) return "Mid"; // ₹20,000 Cr - ₹50,000 Cr
  return "Large"; // ₹50,000 Cr and above
};

function Company() {
  const [searchTerm, setSearchTerm] = useState("");
  const [marketCapFilter, setMarketCapFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(9);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stocks: companies } = useSelector((state) => state.stocks);
  const { theme } = useSelector((state) => state.theme);
  
  // Responsive grid layout - adjust companies per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCompaniesPerPage(6); // Show fewer cards on mobile
      } else {
        setCompaniesPerPage(9);
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTickerSelect = (ticker) => {
    navigate(`/company/${ticker}`);
  };

  const filteredCompanies = companies.filter((company) => {
    // Check if search term matches ticker, company name, or sector
    const matchesSearch = searchTerm === "" || 
      company.ticker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if market cap filter matches
    const matchesMarketCap = marketCapFilter
      ? getMarketCapCategory(company["Market Cap"]) === marketCapFilter
      : true;

    return matchesSearch && matchesMarketCap;
  });

  // Calculate pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  const handleDelete = async (ticker) => {
    const response = await deleteStock(ticker);
    if (response.success) {
      toast("Stock Delete Successfully");
      dispatch(setStock(response.updatedData));
    } else {
      toast("Failed to Delete!!");
    }
  };

  const handleEdit = (ticker) => {
    navigate("/admin_stock/update", { state: { ticker } });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, marketCapFilter]);

  return (
    <div className={`${theme === "dark" ? "text-white bg-gray-900" : "text-gray-900"} p-3 sm:p-6 min-h-screen`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-sm mb-2 sm:mb-4">
            <a
              className="text-blue-600 hover:underline text-lg sm:text-xl font-medium"
              href="/"
            >
              Stock Analysis
            </a>
            <span className="text-lg sm:text-xl font-medium"> {">"} </span>
            <a className="text-lg sm:text-xl font-medium">Stock Directory</a>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Stocks List of NSE and BSE Listed Companies
          </h1>
        </div>

        {/* Search Bar & Filter */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row text-gray-900 gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Search by ticker, name, or sector"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64 bg-white"
          />
          <select
            value={marketCapFilter}
            onChange={(e) => setMarketCapFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md px-2 bg-white"
          >
            <option value="">All Market Caps</option>
            <option value="Micro">Micro</option>
            <option value="Small">Small</option>
            <option value="Mid">Mid</option>
            <option value="Large">Large</option>
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-3 sm:mb-4 px-1">
        <p className="text-sm sm:text-base">
          Showing {filteredCompanies.length > 0 ? indexOfFirstCompany + 1 : 0}{" "}
          to {Math.min(indexOfLastCompany, filteredCompanies.length)} of{" "}
          {filteredCompanies.length} stocks
        </p>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {currentCompanies.length > 0 ? (
          currentCompanies.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              onSelectTicker={handleTickerSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-6">
            <p className="text-gray-600">No companies match your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredCompanies.length > companiesPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Company;