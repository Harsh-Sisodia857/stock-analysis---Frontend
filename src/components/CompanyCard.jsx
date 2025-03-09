import React from "react";

function CompanyCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">TICKER</h1>
      <h2 className="text-xl font-semibold text-gray-700">COMPANY NAME</h2>
      <p className="text-gray-600 mt-2">
        <span className="font-medium text-gray-800">SECTOR:</span>{" "}
        <span className="text-blue-600">SECTOR NAME</span>
      </p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">PRICE (Rs.)</p>
          <p className="text-lg font-bold text-gray-900">₹5,05,293.34</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">MCAP (Cr.)</p>
          <p className="text-lg font-bold text-gray-900">₹5,05,293.34</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">P/E</p>
          <p className="text-lg font-bold text-gray-900">5</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
