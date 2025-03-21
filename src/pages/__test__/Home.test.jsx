import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Home from "@/pages/Home";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import * as apiManager from "@/apiManager/stockApiManager"; 

const mockStore = configureStore([]);

vi.mock("@/apiManager/stockApiManager", () => ({
  getStocks: vi.fn().mockResolvedValue([{
    "name": "dfsafdsdfdsfdsffddfsd",
    "ticker": "dfsf",
    "sector": "sdasd",
    "Sub-Sector": "dfsdf",
    "Close Price": 2,
    "MF Holding -6M(%)": 1,
    "Promoter Holding-6M(%)": 1,
    "DII Holding(%)": 2,
    "FII Holding(%)": 1,
    "MF Holding(%)": 2,
    "Promoter Pledges(%)": 1,
    "Promoter Holding(%)": 2124,
    "Market Cap": 0,
    "Quick Ratio": 0,
    "ROI": 0,
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
    "EPS": -2,
    "Payout Ratio": 0,
    "Long Term Debt To Equity(%)": 0,
    "Profit Margin": 0,
    "Current Ratio": 0,
    "ROE": 0,
    "ROA": 0,
    "PE Ratio": 0,
    "Div. Yield(%)": "",
    "PB Ratio": 0
  }]), // Mock response
  fetchWithAuth: vi.fn().mockResolvedValue([
    { id: 1, name: "Stock A", price: 100 },
    { id: 2, name: "Stock B", price: 200 }
  ]),
}));

describe("Home Page", () => {
  it("renders Home page", () => {
    const store = mockStore({
      stocks: [],
      theme: { theme: "light" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Analyse your stock with all the data in one place/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Data will help you to pick better stocks for better return/i)).toBeInTheDocument();
  });
});
