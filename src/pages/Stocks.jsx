import { useEffect, useState } from "react";
import InfoButton from "../components/InfoButton";
import { PieChart } from "../components/PieChart";
import { useParams } from "react-router-dom";

function Stocks() {
  const appUrl = import.meta.env.VITE_API_URL;
  const { ticker } = useParams();
  console.log("Company Ticker: ", ticker);
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  const getStockDetail = async (ticker) => {
    console.log("Fetching stock details for ticker:", ticker);
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(appUrl + "/stock/?ticker=" + ticker, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log("Fetched stock data: ", json);
      if (json.success) {
        setStock(json.stock);
      } else {
        console.log("Error fetching User Data");
      }
    } catch (error) {
      console.log("Error fetching User Data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (ticker) {
      // Ensure ticker is defined before calling the function
      getStockDetail(ticker);
    }
  }, [ticker]);

  // Show loading state if stock data is not yet available
  if (loading) {
    return <div>Loading...</div>;
  }

  const formatNumber = (value) => {
    return typeof value === "number" ? value.toFixed(2) : "N/A";
  };

  const tooltips = {
    marketCap: "Total market value of a company's outstanding shares.",
    enterpriseValue:
      "Measure of a company's total value, including debt and excluding cash.",
    noOfShares: "Total number of shares issued by the company.",
    peRatio:
      "Price-to-Earnings ratio, which measures valuation relative to earnings.",
    pbRatio: "Price-to-Book ratio, which compares market price to book value.",
    faceValue: "Nominal value of a share as stated by the company.",
    divYield: "Dividend yield, indicating return from dividends.",
    bookValue: "Book value per share based on trailing twelve months data.",
    eps: "Earnings Per Share over the trailing twelve months.",
    salesGrowth: "Percentage change in sales revenue over a period.",
    roe: "Return on Equity, indicating profitability relative to shareholders' equity.",
    roce: "Return on Capital Employed, measuring profitability and efficiency.",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-600 mb-4">
        <a
          className="text-blue-600 hover:underline text-xl font-medium"
          href="/"
        >
          Stock Analysis
        </a>
        <span className="text-xl font-medium"> {">"} </span>
        <a
          className="text-blue-600 hover:underline text-xl font-medium"
          href="/company"
        >
          Companies
        </a>
        <span className="text-xl font-medium"> {">"} </span>
        <a
          className="text-blue-600 hover:underline text-xl font-medium"
        >
          {stock?.name}
        </a>
      </div>

      <h1 className="font-bold text-3xl text-gray-900 mb-4">{stock?.name}</h1>

      <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">Sector</h2>
          <p>{stock?.sector}</p>
          <h2 className="font-semibold text-lg mt-2">Sub-Sector</h2>
          <p>{stock["Sub-Sector"]}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">NSE/BSE</h2>
          <p>{stock?.ticker}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-xl mb-4">Price Summary</h2>
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-gray-500">CURRENT PRICE</p>
            <p className="font-semibold text-lg">₹{formatNumber(stock["Close Price"])}</p>
          </div>
          <div>
            <p className="text-gray-500">52 WEEK HIGH</p>
            <p className="font-semibold text-lg">₹{formatNumber(stock["Close Price"] * 1.1)}</p>
          </div>
          <div>
            <p className="text-gray-500">52 WEEK LOW</p>
            <p className="font-semibold text-lg">₹{formatNumber(stock["Close Price"] * 0.9)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-stretch gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-[50%]">
          <h2 className="font-semibold text-xl mb-4">Company Essentials</h2>
          <div className="grid grid-cols-3 gap-6 text-gray-700 text-center">
            <div>
              <p className="font-semibold">
                Market Cap <InfoButton text={"Market Cap tooltip"} />
              </p>
              <p className="text-lg">₹{formatNumber(stock["Market Cap"] / 1e5)} Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                Enterprise Value <InfoButton text={"Enterprise Value tooltip"} />
              </p>
              <p className="text-lg">₹{formatNumber(stock["Market Cap"] - stock["Total Debt"])} Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                No. of Shares <InfoButton text={"No. of Shares tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["Common Shares Outstanding"])} Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                P/E <InfoButton text={"P/E tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["PE Ratio"])}</p>
            </div>
            <div>
              <p className="font-semibold">
                P/B <InfoButton text={"P/B tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["PB Ratio"])}</p>
            </div>
            <div>
              <p className="font-semibold">
                Face Value <InfoButton text={"Face Value tooltip"} />
              </p>
              <p className="text-lg">₹1</p>
            </div>
            <div>
              <p className="font-semibold">
                Div. Yield <InfoButton text={"Div. Yield tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["Div. Yield(%)"]) == "N/A" ? "N/A" : formatNumber(stock["Div. Yield(%)"]) + "%"}</p>
            </div>
            <div>
              <p className="font-semibold">
                Book Value (TTM) <InfoButton text={"Book Value tooltip"} />
              </p>
              <p className="text-lg">₹{formatNumber(stock["Total Equity"] / stock["Common Shares Outstanding"])}</p>
            </div>
            <div>
              <p className="font-semibold">Cash</p>
              <p className="text-lg">₹{formatNumber(stock["Reserve Surplus"])} Cr.</p>
            </div>
            <div>
              <p className="font-semibold">Debt</p>
              <p className="text-lg">₹{formatNumber(stock["Total Debt"])} Cr.</p>
            </div>
            <div>
              <p className="font-semibold">Promoter Holding</p>
              <p className="text-lg">{formatNumber(stock["Promoter Holding(%)"])}%</p>
            </div>
            <div>
              <p className="font-semibold">
                EPS (TTM) <InfoButton text={"EPS tooltip"} />
              </p>
              <p className="text-lg">₹{formatNumber(stock["EPS"])}</p>
            </div>
            <div>
              <p className="font-semibold">
                Sales Growth <InfoButton text={"Sales Growth tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["5Y Rev. Growth(%)"])}%</p>
            </div>
            <div>
              <p className="font-semibold">
                ROE <InfoButton text={"ROE tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["ROE"])}%</p>
            </div>
            <div>
              <p className="font-semibold">
                ROCE <InfoButton text={"ROCE tooltip"} />
              </p>
              <p className="text-lg">{formatNumber(stock["5Y Avg ROE"])}%</p>
            </div>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md w-1/2 flex items-center justify-center">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Stocks;
