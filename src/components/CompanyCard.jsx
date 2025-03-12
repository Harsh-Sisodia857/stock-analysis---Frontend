import React from "react";

// Utility function to round a number to a specific number of decimal places
const roundToDecimal = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

function CompanyCard({ company, onSelectTicker }) {
  // Handle Close Price (Random if missing)
  const closePrice =
    company["Close Price"] != null ? company["Close Price"].toString() : "N/A";

  // Handle Market Cap (Random if missing or negative)
  const marketCap =
    company["Market Cap"] > 0
      ? roundToDecimal(company["Market Cap"], 2)
      : "N/A";

  // Handle PE Ratio (Random if negative)
  const peRatio =
    company["PE Ratio"] >= 0 ? roundToDecimal(company["PE Ratio"], 2) : "N/A";

  const handleDetailsClick = () => {
    onSelectTicker(company.ticker);
  };

  return (
    <div className="bg-white px-6 pt-5 pb-4 rounded-lg shadow-md border border-gray-200 w-full mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">{company.ticker}</h1>
      <h2 className="text-xl font-semibold text-gray-700">{company.name}</h2>
      <p className="text-gray-600 mt-2">
        <span className="font-medium text-gray-800">{company.sector}</span>{" "}
        {company["Sub-Sector"]?.length > 0 && (
          <>
            <span className="font-medium text-gray-800">: </span>
            <span className="text-blue-600">{company["Sub-Sector"]}</span>
          </>
        )}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">PRICE (Rs.)</p>
          <p className="text-lg font-bold text-gray-900">₹{closePrice}</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">MCAP (Cr.)</p>
          <p className="text-lg font-bold text-gray-900">₹{marketCap}</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-sm font-semibold">P/E</p>
          <p className="text-lg font-bold text-gray-900">{peRatio}</p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-3">
        <button onClick={handleDetailsClick} className="px-6 py-1 cursor-pointer w-[36%] text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-indigo-500 hover:to-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Details
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
