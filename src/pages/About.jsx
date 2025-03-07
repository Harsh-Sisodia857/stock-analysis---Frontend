const AboutUs = () => {
  return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
          <p className="mb-4 text-gray-700">
              Welcome to our Stock Analysis Hub!
          </p>
          <p className="mb-4 text-gray-700">
              At Stock Analysis Hub, we are passionate about empowering investors with the information they need to make informed financial decisions. Our mission is to provide a comprehensive platform that simplifies stock analysis and mutual fund information, making it accessible to both novice and experienced investors.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Our Vision</h2>
          <p className="mb-4 text-gray-700">
              In today&apos;s fast-paced financial landscape, having the right data at your fingertips is crucial. We envision a platform where users can easily analyze stocks and explore mutual funds, all in one place. Our goal is to demystify the complexities of stock market investing by providing clear, concise, and actionable insights.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">What We Offer</h2>
          <p className="mb-4 text-gray-700">
              Our website features a robust stock analysis section that highlights essential metrics including:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
              <li><strong>Ticker Symbol</strong>: The unique identifier for each stock.</li>
              <li><strong>Closing Price</strong>: The final price of a stock at the end of the trading day.</li>
              <li><strong>Holdings</strong>: Information on the assets held by mutual funds.</li>
              <li><strong>Market Capitalization</strong>: A measure of a company&apos;s total market value.</li>
              <li><strong>Quick Ratio</strong>: An indicator of a company&apos;s short-term liquidity.</li>
              <li><strong>Return on Investment (ROI)</strong>: A performance measure used to evaluate the efficiency of an investment.</li>
              <li><strong>Reserve Surplus</strong>: Insights into a company&apos;s retained earnings.</li>
              <li><strong>Debt and Financial Ratios</strong>: Essential data to assess a company&apos;s financial health.</li>
          </ul>
          <p className="mb-4 text-gray-700">
              With a dataset of approximately 4,500 stocks, we are committed to delivering accurate and timely information to our users.
          </p>
    
          <h2 className="text-2xl font-semibold mt-6 mb-2">Join Us on This Journey</h2>
          <p className="mb-4 text-gray-700">
              We invite you to explore our platform and take advantage of the tools we provide to enhance your investment journey. Whether you&apos;re looking to analyze stocks or learn more about mutual funds, Stock Analysis Hub is here to support you every step of the way.
          </p>
          <p className="mb-4 text-gray-700">
              Thank you for visiting, and we look forward to helping you navigate the world of finance!
          </p>
      </div>
  );
};

export default AboutUs;
