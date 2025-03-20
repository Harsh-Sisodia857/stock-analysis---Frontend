import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Trash2,
  FilePenLine,
} from "lucide-react";
import {
  deleteMutualFund,
  getMutualFunds,
} from "../apiManager/stockApiManager";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { setLoading } from "../store/slice/loadingSlice";
import InfoButton from "../components/InfoButton";
import { mutualFundInfo } from "../utility/ultils";
import { setMutualFund } from "../store/slice/mutualFundSlice";
import DeleteConfirmationAlert from "../components/Alert";

const MutualFundsPage = () => {
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mutualFundsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "scheme_name",
    direction: "ascending",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [expandedFund, setExpandedFund] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.loading);
  const { mutualFund: funds } = useSelector((state) => state.mutualFund);
  const [selectedFund, setSelectedFund] = useState("")
  let role = user?.role || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMutualFunds = async () => {
      dispatch(setLoading(true));
      try {
        const mutualFunds = await getMutualFunds();
        dispatch(setMutualFund(mutualFunds));
        setFilteredFunds(mutualFunds);
      } catch (error) {
        console.error("Error fetching mutual funds:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMutualFunds();
  }, []);

  const handleDelete = async (schemeName) => {
    dispatch(setLoading(true));
    const response = await deleteMutualFund(schemeName);
    console.log("RESPONSE DELETE : ", response);
    if (response.success) {
      const updatedFunds = response.updatedData;
      dispatch(setMutualFund(updatedFunds));
      toast(`Mutual Fund with ${schemeName} has been deleted successfully`);
    } else {
      toast.error(`Failed to delete Mutual Fund with ${schemeName}`);
    }
    dispatch(setLoading(false));
  };

  const handleEdit = (schemeName) => {
    console.log("Edit " + schemeName);
    navigate("/admin_mutual_funds/update", { state: { schemeName } });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Get unique categories
  const categories = ["All", ...new Set(funds.map((fund) => fund.category))];

  // Filter and sort functions
  useEffect(() => {
    let result = [...funds];

    // Apply search filter
    if (searchTerm) {
      const fieldsToSearch = [
        'scheme_name',
        'min_sip',
        'min_lumpsum',
        'expense_ratio',
        'fund_size_cr',
        'fund_age_yr',
        'fund_manager',
        'sortino',
        'alpha',
        'sd',
        'beta',
        'sharpe',
        'risk_level',
        'amc_name',
        'rating',
        'category',
        'sub_category',
        'returns_1yr',
        'returns_3yr',
        'returns_5yr'
      ];
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      result = result.filter((fund) => 
        fieldsToSearch.some(field => 
          String(fund[field]).toLowerCase().includes(lowercasedSearchTerm)
        )
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((fund) => fund.category === selectedCategory);
    }

    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter((fund) => fund.rating >= selectedRating);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    handlePageChange(1);
    setFilteredFunds(result);
  }, [funds, searchTerm, sortConfig, selectedCategory, selectedRating]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getRiskLevelText = (level) => {
    const levels = ["Very Low", "Low", "Moderate", "High", "Very High"];
    return levels[level - 1] || "Unknown";
  };

  const handleReturnNotAvailable = (returns) => {
    if (returns?.length === 0) return "NA";
    return returns + "%";
  };

  const toggleExpandFund = (index) => {
    if (expandedFund === index) {
      setExpandedFund(null);
    } else {
      setExpandedFund(index);
    }
  };

  const handleDeleteClick = (fundName) => {
    setShowAlert(true);
    setSelectedFund(fundName);
  }

  //This gives the index of the last mutual fund item on the current page.
  const indexOfLastPage = currentPage * mutualFundsPerPage;
  const indexOfFirstPage = indexOfLastPage - mutualFundsPerPage;
  const currentMutualFunds = filteredFunds.slice(
    indexOfFirstPage,
    indexOfLastPage
  );
  
  const totalPages = Math.ceil(filteredFunds.length / mutualFundsPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        theme === "dark" ? "text-white" : "text-gray-900"
      }bg-gray-50 min-h-screen p-6`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold `}>Mutual Funds Explorer</h1>
          <p className="mt-2">
            Discover and compare the best mutual funds for your investment
            portfolio
          </p>
        </div>

        {/* Filters and Search */}
        <div className={`text-gray-900 bg-white rounded-lg shadow-md p-6 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 " />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search Mutual funds"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              >
                <option value="0">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex space-x-2">
              <div className="flex-grow">
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortConfig.key}
                  onChange={(e) => requestSort(e.target.value)}
                >
                  <option value="scheme_name">Fund Name</option>
                  <option value="returns_1yr">1Y Returns</option>
                  <option value="returns_3yr">3Y Returns</option>
                  <option value="returns_5yr">5Y Returns</option>
                  <option value="rating">Rating</option>
                  <option value="risk_level">Risk Level</option>
                  <option value="expense_ratio">Expense Ratio</option>
                </select>
              </div>
              <button
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50"
                onClick={() =>
                  setSortConfig({
                    ...sortConfig,
                    direction:
                      sortConfig.direction === "ascending"
                        ? "descending"
                        : "ascending",
                  })
                }
              >
                {sortConfig.direction === "ascending" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 ">
          Showing {filteredFunds.length > 0 ? indexOfFirstPage + 1 : 0} to{" "}
          {Math.min(indexOfLastPage, funds.length)} of {funds.length} funds
        </div>

        {/* Funds List */}
        <div className="space-y-4">
          {currentMutualFunds.map((fund, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-lg shadow-md overflow-hidden"
            >
              <DeleteConfirmationAlert
                key={index}
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={handleDelete}
                itemName={selectedFund}
              />
              {/* Fund Summary Row */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex flex-wrap md:flex-nowrap justify-between items-center"
                onClick={() => toggleExpandFund(index)}
              >
                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                  <h3 className="font-bold text-lg">{fund.scheme_name}</h3>
                  <p className="text-sm">{fund.amc_name}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm mr-2">
                      {fund.category} | {fund.sub_category}
                    </span>
                    {renderStars(fund.rating)}
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap justify-between md:w-1/2">
                  <div className="flex flex-col items-center px-4 w-1/3">
                    <span className="text-sm text-gray-500">1Y Returns</span>
                    <span
                      className={`font-bold ${
                        fund.returns_1yr >= 8
                          ? "text-green-600"
                          : fund.returns_1yr <= 2
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {handleReturnNotAvailable(fund.returns_1yr)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center px-4 w-1/3">
                    <span className="text-sm text-gray-500">3Y Returns</span>
                    <span
                      className={`font-bold ${
                        fund.returns_3yr >= 10
                          ? "text-green-600"
                          : fund.returns_3yr <= 4
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {handleReturnNotAvailable(fund.returns_3yr)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center px-4 w-1/3">
                    <span className="text-sm text-gray-500">5Y Returns</span>
                    <span
                      className={`font-bold ${
                        fund.returns_5yr >= 12
                          ? "text-green-600"
                          : fund.returns_5yr <= 5
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {handleReturnNotAvailable(fund.returns_5yr)}
                    </span>
                  </div>
                </div>

                {role === "admin" && (
                  <>
                    <div className="ml-2">
                      <button
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(fund.scheme_name)
                        }}
                      >
                        <Trash2 />
                      </button>
                    </div>
                    <div className="ml-2">
                      <button
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(fund.scheme_name);
                        }}
                      >
                        <FilePenLine />
                      </button>
                    </div>
                  </>
                )}

                <div className="ml-2">
                  {expandedFund === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedFund === index && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Fund Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Fund Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Minimum SIP{" "}
                            <InfoButton text={mutualFundInfo.min_sip} />
                          </span>
                          <span className="font-medium">₹{fund.min_sip}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Minimum Lumpsum{" "}
                            <InfoButton text={mutualFundInfo.min_lumpsum} />
                          </span>
                          <span className="font-medium">
                            ₹{fund.min_lumpsum}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Fund Size{" "}
                            <InfoButton text={mutualFundInfo.fund_size_cr} />
                          </span>
                          <span className="font-medium">
                            ₹{fund.fund_size_cr} Cr
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Fund Age{" "}
                            <InfoButton text={mutualFundInfo.fund_age_yr} />
                          </span>
                          <span className="font-medium">
                            {fund.fund_age_yr} Years
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Fund Manager{" "}
                            <InfoButton text={mutualFundInfo.fund_manager} />
                          </span>
                          <span className="font-medium">
                            {fund.fund_manager}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Expense Ratio{" "}
                            <InfoButton text={mutualFundInfo.expense_ratio} />
                          </span>
                          <span className="font-medium">
                            {fund.expense_ratio}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Metrics */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Risk Metrics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Risk Level{" "}
                            <InfoButton text={mutualFundInfo.risk_level} />
                          </span>
                          <span className="font-medium">
                            {getRiskLevelText(fund.risk_level)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Alpha <InfoButton text={mutualFundInfo.alpha} />
                          </span>
                          <span className="font-medium">{fund.alpha}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Beta <InfoButton text={mutualFundInfo.beta} />
                          </span>
                          <span className="font-medium">{fund.beta}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Standard Deviation{" "}
                            <InfoButton text={mutualFundInfo.sd} />
                          </span>
                          <span className="font-medium">{fund.sd}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Sharpe Ratio{" "}
                            <InfoButton text={mutualFundInfo.sharpe} />
                          </span>
                          <span className="font-medium">{fund.sharpe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Sortino Ratio{" "}
                            <InfoButton text={mutualFundInfo.sortino} />
                          </span>
                          <span className="font-medium">{fund.sortino}</span>
                        </div>
                      </div>
                    </div>
                    {/* Performance Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Performance Summary
                      </h4>
                      <div className="space-y-4">
                        {/* Returns Section */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Expected Next Year Returns
                          </h5>
                          <div className="grid grid-cols-1 gap-4">
                            {/* Expected Next Year Return */}
                            <div className="bg-white p-3 rounded shadow-sm">
                              <p className="text-xs text-gray-500">
                                Expected 1 Year Return
                              </p>
                              <p
                                className={`text-lg font-bold ${
                                  fund.returns_1yr * 0.5 +
                                    fund.returns_3yr * 0.3 +
                                    fund.returns_5yr * 0.2 >=
                                  0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {(
                                  fund.returns_1yr * 0.5 +
                                  fund.returns_3yr * 0.3 +
                                  fund.returns_5yr * 0.2
                                ).toFixed(2)}
                                %
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Risk Level Indicator */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Risk Level
                          </h5>
                          <div className="bg-white p-3 rounded shadow-sm">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    fund.risk_level === 1
                                      ? "bg-green-500 w-1/5"
                                      : fund.risk_level === 2
                                      ? "bg-lime-500 w-2/5"
                                      : fund.risk_level === 3
                                      ? "bg-yellow-500 w-3/5"
                                      : fund.risk_level === 4
                                      ? "bg-orange-500 w-4/5"
                                      : "bg-red-500 w-full"
                                  }`}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm font-medium">
                                {fund.risk_level === 1
                                  ? "Very Low"
                                  : fund.risk_level === 2
                                  ? "Low"
                                  : fund.risk_level === 3
                                  ? "Moderate"
                                  : fund.risk_level === 4
                                  ? "High"
                                  : "Very High"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Sortino Ratio */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Additional Metrics
                          </h5>
                          <div className="bg-white p-3 rounded shadow-sm">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-xs text-gray-500">
                                  Sortino Ratio
                                </p>
                                <p className="text-md font-bold text-gray-800">
                                  {fund.sortino}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Fund Size
                                </p>
                                <p className="text-md font-bold text-gray-800">
                                  ₹{fund.fund_size_cr} Cr
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Fund Age
                                </p>
                                <p className="text-md font-bold text-gray-800">
                                  {fund.fund_age_yr} Years
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFunds.length > mutualFundsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default MutualFundsPage;
