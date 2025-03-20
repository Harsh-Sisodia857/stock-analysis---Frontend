import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import { createMutualFund } from "../../apiManager/stockApiManager";
import { useNavigate } from "react-router-dom";

const MutualFundAdminForm = () => {
  const [formData, setFormData] = useState({
    scheme_name: "",
    min_sip: 1000,
    min_lumpsum: 1000,
    expense_ratio: 0.36,
    fund_size_cr: "",
    fund_age_yr: "",
    fund_manager: "",
    sortino: "",
    alpha: "",
    sd: "",
    beta: "",
    sharpe: "",
    risk_level: 1,
    amc_name: "",
    rating: 3,
    category: "Hybrid",
    sub_category: "",
    returns_1yr: "",
    returns_3yr: "",
    returns_5yr: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate()
  const validateForm = () => {
    const newErrors = {};

    if (!formData.scheme_name)
      newErrors.scheme_name = "Scheme name is required";
    if (!formData.amc_name) newErrors.amc_name = "AMC name is required";
    if (!formData.fund_manager)
      newErrors.fund_manager = "Fund manager is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.sub_category)
      newErrors.sub_category = "Sub-category is required";

    // Validate numeric fields
    const numericFields = [
      "min_sip",
      "min_lumpsum",
      "expense_ratio",
      "fund_size_cr",
      "fund_age_yr",
      "sortino",
      "alpha",
      "sd",
      "beta",
      "sharpe",
      "returns_1yr",
      "returns_3yr",
      "returns_5yr",
    ];

    numericFields.forEach((field) => {
      if (formData[field] === "") {
        newErrors[field] = "This field is required";
      } else if (isNaN(Number(formData[field]))) {
        newErrors[field] = "Must be a number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus("submitting");

      try {
        let success = await createMutualFund(formData);
        if (success) {
          console.log("Submitted data:", formData);
          setSubmitStatus("success");
          toast("Mutual Fund Created Successfully")
        } else {
          setSubmitStatus("error");
          toast.error("Failed to create Mutual Fund")
        }
      } catch (error) {
        console.error("Submission failed:", error);
        setSubmitStatus("error");
        toast.error("Failed to create Mutual Fund")
      }

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const categories = ["Equity", "Debt", "Hybrid", "Solution Oriented", "Other"];

  const subCategories = {
    Equity: [
      "Large Cap",
      "Mid Cap",
      "Small Cap",
      "Multi Cap",
      "ELSS",
      "Sectoral",
    ],
    Debt: [
      "Liquid",
      "Ultra Short",
      "Low Duration",
      "Corporate Bond",
      "Banking & PSU",
      "Gilt",
    ],
    Hybrid: [
      "Aggressive Hybrid",
      "Conservative Hybrid",
      "Balanced Advantage",
      "Arbitrage Mutual Funds",
      "Multi Asset",
    ],
    "Solution Oriented": ["Retirement", "Children's Fund"],
    Other: ["Index Funds", "ETFs", "Fund of Funds", "Overseas Funds"],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Add New Mutual Fund
        </h1>
        <p className="text-gray-600">
          Enter the details of the new mutual fund scheme
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-6 bg-green-50 p-4 rounded-md flex items-center text-green-700">
          <Check className="mr-2" size={20} />
          <span>Mutual fund successfully added!</span>
        </div>
      )}
      <style jsx>{`
        input {
          color: black;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scheme Name *
                </label>
                <input
                  type="text"
                  name="scheme_name"
                  value={formData.scheme_name}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.scheme_name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.scheme_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.scheme_name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  AMC Name *
                </label>
                <input
                  type="text"
                  name="amc_name"
                  value={formData.amc_name}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.amc_name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.amc_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.amc_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fund Manager *
                </label>
                <input
                  type="text"
                  name="fund_manager"
                  value={formData.fund_manager}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.fund_manager ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.fund_manager && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fund_manager}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fund Age (Years) *
                </label>
                <input
                  type="number"
                  name="fund_age_yr"
                  value={formData.fund_age_yr}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.fund_age_yr ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.fund_age_yr && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fund_age_yr}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category & Classification */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Category & Classification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sub-Category *
                </label>
                <select
                  name="sub_category"
                  value={formData.sub_category}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.sub_category ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  disabled={!formData.category}
                >
                  <option value="">Select Sub-Category</option>
                  {formData.category &&
                    subCategories[formData.category].map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                </select>
                {errors.sub_category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sub_category}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Risk Level (1-5) *
                </label>
                <select
                  name="risk_level"
                  value={formData.risk_level}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">1 - Very Low</option>
                  <option value="2">2 - Low</option>
                  <option value="3">3 - Moderate</option>
                  <option value="4">4 - High</option>
                  <option value="5">5 - Very High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5) *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Financial Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum SIP (₹) *
                </label>
                <input
                  type="number"
                  name="min_sip"
                  value={formData.min_sip}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.min_sip ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.min_sip && (
                  <p className="mt-1 text-sm text-red-600">{errors.min_sip}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Lumpsum (₹) *
                </label>
                <input
                  type="number"
                  name="min_lumpsum"
                  value={formData.min_lumpsum}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.min_lumpsum ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.min_lumpsum && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.min_lumpsum}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expense Ratio (%) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="expense_ratio"
                  value={formData.expense_ratio}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.expense_ratio ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.expense_ratio && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expense_ratio}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fund Size (Cr) *
                </label>
                <input
                  type="number"
                  name="fund_size_cr"
                  value={formData.fund_size_cr}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.fund_size_cr ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.fund_size_cr && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fund_size_cr}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sortino Ratio *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="sortino"
                    value={formData.sortino}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.sortino ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Info
                      size={16}
                      className="hover:text-gray-500"
                      title="Measures downside risk-adjusted return"
                    />
                  </div>
                </div>
                {errors.sortino && (
                  <p className="mt-1 text-sm text-red-600">{errors.sortino}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alpha *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="alpha"
                    value={formData.alpha}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.alpha ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Info
                      size={16}
                      className="hover:text-gray-500"
                      title="Excess return relative to benchmark"
                    />
                  </div>
                </div>
                {errors.alpha && (
                  <p className="mt-1 text-sm text-red-600">{errors.alpha}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Standard Deviation (SD) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="sd"
                    value={formData.sd}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.sd ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Info
                      size={16}
                      className="hover:text-gray-500"
                      title="Measure of volatility"
                    />
                  </div>
                </div>
                {errors.sd && (
                  <p className="mt-1 text-sm text-red-600">{errors.sd}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Beta *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="beta"
                    value={formData.beta}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.beta ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Info
                      size={16}
                      className="hover:text-gray-500"
                      title="Measure of market sensitivity"
                    />
                  </div>
                </div>
                {errors.beta && (
                  <p className="mt-1 text-sm text-red-600">{errors.beta}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sharpe Ratio *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="sharpe"
                    value={formData.sharpe}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.sharpe ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Info
                      size={16}
                      className="hover:text-gray-500"
                      title="Risk-adjusted return measure"
                    />
                  </div>
                </div>
                {errors.sharpe && (
                  <p className="mt-1 text-sm text-red-600">{errors.sharpe}</p>
                )}
              </div>
            </div>
          </div>

          {/* Returns */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Historical Returns (%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  1 Year Returns *
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="returns_1yr"
                  value={formData.returns_1yr}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.returns_1yr ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.returns_1yr && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.returns_1yr}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  3 Year Returns *
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="returns_3yr"
                  value={formData.returns_3yr}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.returns_3yr ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.returns_3yr && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.returns_3yr}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  5 Year Returns *
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="returns_5yr"
                  value={formData.returns_5yr}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.returns_5yr ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.returns_5yr && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.returns_5yr}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setFormData({
                scheme_name: "",
                min_sip: 1000,
                min_lumpsum: 1000,
                expense_ratio: 0.36,
                fund_size_cr: "",
                fund_age_yr: "",
                fund_manager: "",
                sortino: "",
                alpha: "",
                sd: "",
                beta: "",
                sharpe: "",
                risk_level: 1,
                amc_name: "",
                rating: 3,
                category: "Hybrid",
                sub_category: "",
                returns_1yr: "",
                returns_3yr: "",
                returns_5yr: "",
              });
              setErrors({});
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Mutual Fund"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MutualFundAdminForm;
