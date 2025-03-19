import { FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

// Utility function to round a number to a specific number of decimal places
const roundToDecimal = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

function CompanyCard({ company, onSelectTicker, onDelete, onEdit }) {
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
  const { user } = useSelector((state) => state.user);
  let role = user?.role || "";

  return (
    <div className="bg-white px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 rounded-lg shadow-md border border-gray-200 w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="mb-2 sm:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{company.ticker}</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 truncate max-w-full">
            {company.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            <span className="font-medium text-gray-800">{company.sector}</span>{" "}
            {company["Sub-Sector"]?.length > 0 && (
              <>
                <span className="font-medium text-gray-800">: </span>
                <span className="text-blue-600">{company["Sub-Sector"]}</span>
              </>
            )}
          </p>
        </div>
        {role === "admin" && (
          <div className="flex text-gray-900 mb-2 sm:mb-0">
            <div className="mr-2">
              <button
                className="cursor-pointer p-1"
                onClick={() => onDelete(company.ticker)}
                aria-label="Delete stock"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div>
              <button
                className="cursor-pointer p-1"
                onClick={() => onEdit(company.ticker)}
                aria-label="Edit stock"
              >
                <FilePenLine size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
        <div className="text-center p-1 sm:p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-xs sm:text-sm font-semibold">PRICE (Rs.)</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900">₹{closePrice}</p>
        </div>
        <div className="text-center p-1 sm:p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-xs sm:text-sm font-semibold">MCAP (Cr.)</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900">₹{marketCap}</p>
        </div>
        <div className="text-center p-1 sm:p-2 bg-gray-100 rounded-md">
          <p className="text-gray-700 text-xs sm:text-sm font-semibold">P/E</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900">{peRatio}</p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-3">
        <button
          onClick={handleDetailsClick}
          className="px-4 sm:px-6 py-1 cursor-pointer w-full sm:w-2/5 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-indigo-500 hover:to-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;