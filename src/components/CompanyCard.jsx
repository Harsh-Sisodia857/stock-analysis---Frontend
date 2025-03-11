import React from "react";

function CompanyCard({company}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">{company.ticker}</h1>
      <h2 className="text-xl font-semibold text-gray-700">{company.name}</h2>
      <p className="text-gray-600 mt-2">
        <span className="font-medium text-gray-800">{company.sector}:</span>{" "}
        <span className="text-blue-600">{company["Sub-Sector"]}</span>
      </p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">PRICE (Rs.)</p>
          <p className="text-lg font-bold text-gray-900">₹{company["Close Price"]}</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">MCAP (Cr.)</p>
          <p className="text-lg font-bold text-gray-900">₹{company["Market Cap"]}</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">P/E</p>
          <p className="text-lg font-bold text-gray-900">{company["PE Ratio"]}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
