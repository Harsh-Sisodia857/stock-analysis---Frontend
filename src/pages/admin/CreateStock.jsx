// StockAdminPage.jsx
import React, { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { createStock } from "../../apiManager/stockApiManager";
import { useNavigate } from "react-router-dom";

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

const StockAdminPage = () => {
  const [stock, setStock] = useState({
    name: "",
    ticker: "",
    sector: "",
    "Sub-Sector": "",
    "Close Price": "",
    "MF Holding -6M(%)": 0,
    "Promoter Holding-6M(%)": 0,
    "DII Holding(%)": 0,
    "FII Holding(%)": 0,
    "MF Holding(%)": 0,
    "Promoter Pledges(%)": 0,
    "Promoter Holding(%)": 0,
    "Market Cap": 0,
    "Quick Ratio": 0,
    ROI: 0,
    "Reserve Surplus": 0,
    "Total Current Assets": 0,
    "Common Shares Outstanding": 0,
    "Total Debt": 0,
    "Total Equity": 0,
    "Long Term Debt": 0,
    "Total Assets": 0,
    "Total Liabilities": 0,
    "Capital Expendixtrure": 0,
    "Operating Cash Flow": 0,
    "Free Cash Flow": 0,
    "Debt To Equity(%)": 0,
    EPS: 0,
    "Payout Ratio": 0,
    "Long Term Debt To Equity(%)": 0,
    "Profit Margin": 0,
    "Current Ratio": 0,
    ROE: 0,
    ROA: 0,
    "PE Ratio": 0,
    "Div. Yield(%)": "",
    "PB Ratio": 0,
  });

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert numerical inputs to numbers
    if (
      name !== "name" &&
      name !== "ticker" &&
      name !== "sector" &&
      name !== "Sub-Sector" &&
      name !== "Div. Yield(%)"
    ) {
      processedValue = value === "" ? "" : Number(value);
    }

    setStock((prevStock) => ({
      ...prevStock,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Stock data to submit:", stock);
      
      const response = await createStock(stock);
  
      if (response.success) {
        toast.success("Stock created successfully!");
      } else {
        throw new Error("Failed to create the stock");
      }
    } catch (error) {
      console.error("Error creating stock:", error);
      toast.error(error.message || "Failed to create the stock!");
    } finally {
      navigate('/'); 
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">Create New Stock</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Company Name"
                    name="name"
                    value={stock.name}
                    onChange={handleChange}
                    required={true}
                  />
                  <InputField
                    label="Ticker Symbol"
                    name="ticker"
                    value={stock.ticker}
                    onChange={handleChange}
                    required={true}
                  />
                  <InputField
                    label="Close Price"
                    name="Close Price"
                    value={stock["Close Price"]}
                    onChange={handleChange}
                    type="number"
                    required={true}
                  />
                  <InputField
                    label="Sector"
                    name="sector"
                    value={stock.sector}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Sub-Sector"
                    name="Sub-Sector"
                    value={stock["Sub-Sector"]}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Market Cap (Cr)"
                    name="Market Cap"
                    value={stock["Market Cap"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Ownership Section */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Ownership Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Promoter Holding (%)"
                    name="Promoter Holding(%)"
                    value={stock["Promoter Holding(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Promoter Holding Change - 6M (%)"
                    name="Promoter Holding-6M(%)"
                    value={stock["Promoter Holding-6M(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Promoter Pledges (%)"
                    name="Promoter Pledges(%)"
                    value={stock["Promoter Pledges(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="FII Holding (%)"
                    name="FII Holding(%)"
                    value={stock["FII Holding(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="DII Holding (%)"
                    name="DII Holding(%)"
                    value={stock["DII Holding(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="MF Holding (%)"
                    name="MF Holding(%)"
                    value={stock["MF Holding(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="MF Holding Change - 6M (%)"
                    name="MF Holding -6M(%)"
                    value={stock["MF Holding -6M(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Financial Metrics Section */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Financial Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="EPS"
                    name="EPS"
                    value={stock.EPS}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="PE Ratio"
                    name="PE Ratio"
                    value={stock["PE Ratio"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="PB Ratio"
                    name="PB Ratio"
                    value={stock["PB Ratio"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Div. Yield (%)"
                    name="Div. Yield(%)"
                    value={stock["Div. Yield(%)"]}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Payout Ratio"
                    name="Payout Ratio"
                    value={stock["Payout Ratio"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="ROE"
                    name="ROE"
                    value={stock.ROE}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="ROA"
                    name="ROA"
                    value={stock.ROA}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="ROI"
                    name="ROI"
                    value={stock.ROI}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Profit Margin"
                    name="Profit Margin"
                    value={stock["Profit Margin"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Balance Sheet Section */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Balance Sheet
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Total Assets"
                    name="Total Assets"
                    value={stock["Total Assets"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Total Current Assets"
                    name="Total Current Assets"
                    value={stock["Total Current Assets"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Total Liabilities"
                    name="Total Liabilities"
                    value={stock["Total Liabilities"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Total Equity"
                    name="Total Equity"
                    value={stock["Total Equity"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Total Debt"
                    name="Total Debt"
                    value={stock["Total Debt"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Long Term Debt"
                    name="Long Term Debt"
                    value={stock["Long Term Debt"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Reserve Surplus"
                    name="Reserve Surplus"
                    value={stock["Reserve Surplus"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Common Shares Outstanding"
                    name="Common Shares Outstanding"
                    value={stock["Common Shares Outstanding"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Ratios Section */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Financial Ratios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Current Ratio"
                    name="Current Ratio"
                    value={stock["Current Ratio"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Quick Ratio"
                    name="Quick Ratio"
                    value={stock["Quick Ratio"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Debt To Equity (%)"
                    name="Debt To Equity(%)"
                    value={stock["Debt To Equity(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Long Term Debt To Equity (%)"
                    name="Long Term Debt To Equity(%)"
                    value={stock["Long Term Debt To Equity(%)"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Cash Flow Section */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Cash Flow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Operating Cash Flow"
                    name="Operating Cash Flow"
                    value={stock["Operating Cash Flow"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Capital Expenditure"
                    name="Capital Expendixtrure"
                    value={stock["Capital Expendixtrure"]}
                    onChange={handleChange}
                    type="number"
                  />
                  <InputField
                    label="Free Cash Flow"
                    name="Free Cash Flow"
                    value={stock["Free Cash Flow"]}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockAdminPage;
