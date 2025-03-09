import InfoButton from "../components/InfoButton";
import { PieChart } from "../components/PieChart";

function Stocks() {
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
          href="/companies"
        >
          Company
        </a>
        <span className="text-xl font-medium"> {">"} </span>
        <a
          className="text-blue-600 hover:underline text-xl font-medium"
          href="/:company"
        >
          Company Name
        </a>
      </div>

      <h1 className="font-bold text-3xl text-gray-900 mb-4">Company Name</h1>

      <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">Sector</h2>
          <p>Energy</p>
          <h2 className="font-semibold text-lg mt-2">Sub-Sector</h2>
          <p>Oil</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">NSE/BSE</h2>
          <p>TICKER</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-xl mb-4">Price Summary</h2>
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-gray-500">CURRENT PRICE</p>
            <p className="font-semibold text-lg">₹405.3</p>
          </div>
          <div>
            <p className="text-gray-500">52 WEEK HIGH</p>
            <p className="font-semibold text-lg">₹538.1</p>
          </div>
          <div>
            <p className="text-gray-500">52 WEEK LOW</p>
            <p className="font-semibold text-lg">₹332.9</p>
          </div>
        </div>
      </div>

      <div className="flex items-stretch gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-[50%]">
          <h2 className="font-semibold text-xl mb-4">Company Essential</h2>
          <div className="grid grid-cols-3 gap-6 text-gray-700 text-center">
            <div>
              <p className="font-semibold">
                Market Cap <InfoButton text={tooltips.marketCap} />
              </p>
              <p className="text-lg">₹5,05,293.34 Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                Enterprise Value <InfoButton text={tooltips.enterpriseValue} />
              </p>
              <p className="text-lg">₹4,99,078.93 Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                No. of Shares <InfoButton text={tooltips.noOfShares} />
              </p>
              <p className="text-lg">1,251.35 Cr.</p>
            </div>
            <div>
              <p className="font-semibold">
                P/E <InfoButton text={tooltips.peRatio} />
              </p>
              <p className="text-lg">24.72</p>
            </div>
            <div>
              <p className="font-semibold">
                P/B <InfoButton text={tooltips.pbRatio} />
              </p>
              <p className="text-lg">6.45</p>
            </div>
            <div>
              <p className="font-semibold">
                Face Value <InfoButton text={tooltips.faceValue} />
              </p>
              <p className="text-lg">₹1</p>
            </div>
            <div>
              <p className="font-semibold">
                Div. Yield <InfoButton text={tooltips.divYield} />
              </p>
              <p className="text-lg">3.41%</p>
            </div>
            <div>
              <p className="font-semibold">
                Book Value (TTM) <InfoButton text={tooltips.bookValue} />
              </p>
              <p className="text-lg">₹62.63</p>
            </div>
            <div>
              <p className="font-semibold">Cash</p>
              <p className="text-lg">₹6,217.69 Cr.</p>
            </div>
            <div>
              <p className="font-semibold">Debt</p>
              <p className="text-lg">₹3.28 Cr.</p>
            </div>
            <div>
              <p className="font-semibold">Promoter Holding</p>
              <p className="text-lg">0%</p>
            </div>
            <div>
              <p className="font-semibold">
                EPS (TTM) <InfoButton text={tooltips.enterpriseValue} />
              </p>
              <p className="text-lg">₹16.33</p>
            </div>
            <div>
              <p className="font-semibold">
                Sales Growth <InfoButton text={tooltips.salesGrowth} />
              </p>
              <p className="text-lg">-0.91%</p>
            </div>
            <div>
              <p className="font-semibold">
                ROE <InfoButton text={tooltips.roe} />
              </p>
              <p className="text-lg">29.47%</p>
            </div>
            <div>
              <p className="font-semibold">
                ROCE <InfoButton text={tooltips.roce} />
              </p>
              <p className="text-lg">37.75%</p>
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
