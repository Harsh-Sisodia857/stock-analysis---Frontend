import React, { useState } from "react";
import CompanyCard from "../components/CompanyCard";

const companies = [
  {
    ticker: "TCS",
    name: "Tata Consultancy Services",
    sector: "IT",
    marketCap: 1200000,
  },
  {
    ticker: "RELIANCE",
    name: "Reliance Industries",
    sector: "Energy",
    marketCap: 1700000,
  },
  { ticker: "INFY", name: "Infosys", sector: "IT", marketCap: 900000 },
  { ticker: "HDFC", name: "HDFC Bank", sector: "Banking", marketCap: 1100000 },
  {
    ticker: "ADANIPORTS",
    name: "Adani Ports",
    sector: "Infrastructure",
    marketCap: 600000,
  },
];

// Function to categorize market caps
const getMarketCapCategory = (marketCap) => {
  if (marketCap < 50000) return "Micro";
  if (marketCap < 250000) return "Small";
  if (marketCap < 1000000) return "Mid";
  return "Large";
};

function Company() {
  const [searchTerm, setSearchTerm] = useState("");
  const [marketCapFilter, setMarketCapFilter] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const matchesSector = company.sector
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMarketCap = marketCapFilter
      ? getMarketCapCategory(company.marketCap) === marketCapFilter
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
            className="p-2 border border-gray-300 rounded-md"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))
        ) : (
          <p className="text-gray-600">No companies match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Company;
