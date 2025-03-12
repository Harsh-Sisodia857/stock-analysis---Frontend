import React, { useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Function to categorize market caps
const getMarketCapCategory = (marketCap) => {
  if (marketCap < 5000) return "Micro";      // Less than ₹5,000 Cr
  if (marketCap < 20000) return "Small";     // ₹5,000 Cr - ₹20,000 Cr
  if (marketCap < 50000) return "Mid";       // ₹20,000 Cr - ₹50,000 Cr
  return "Large";                            // ₹50,000 Cr and above
};


function Company() {
  const [searchTerm, setSearchTerm] = useState("");
  const [marketCapFilter, setMarketCapFilter] = useState("");
  const navigate = useNavigate();
  const {stocks : companies} = useSelector((state) => state.stocks);
  
  const handleTickerSelect = (ticker) => {
    navigate(`/company/${ticker}`);
  };


  const filteredCompanies = companies.filter((company) => {
    const matchesSector = company.sector
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMarketCap = marketCapFilter
      ? getMarketCapCategory(company["Market Cap"]) === marketCapFilter
      : true;

    return matchesSector && matchesMarketCap;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-around">
        <div>
          <div className="text-sm text-gray-600 mb-4">
            <a
              className="text-blue-600 hover:underline text-xl font-medium"
              href="/"
            >
              Stock Analysis
            </a>
            <span className="text-xl font-medium"> {">"} </span>
            <a className="text-black text-xl font-medium">Stock Directory</a>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Stocks List of NSE and BSE Listed Companies
          </h1>
        </div>

        {/* Search Bar & Filter */}
        <div className="mb-6 flex flex-row flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by sector"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            value={marketCapFilter}
            onChange={(e) => setMarketCapFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md px-2 mx-1"
          >
            <option value="">All Market Caps</option>
            <option value="Micro">Micro</option>
            <option value="Small">Small</option>
            <option value="Mid">Mid</option>
            <option value="Large">Large</option>
          </select>
        </div>
      </div>

      {/* Company Cards */}
      <div className="mx-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} onSelectTicker={handleTickerSelect}/>
          ))
        ) : (
          <p className="text-gray-600">No companies match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Company;
