// __mocks__/stockApiManager.js

// Mock the API URL that would come from Vite's import.meta.env.VITE_API_URL
const MOCK_API_URL = "http://localhost:5000";

// Mock the fetch with auth function
const fetchWithAuth = jest.fn().mockImplementation(() => 
  Promise.resolve({
    json: () => Promise.resolve({ success: true })
  })
);

// Mock API functions
export const loginApi = jest.fn().mockImplementation((email, password) => {
    return Promise.resolve({
      json: () => Promise.resolve({
        success: true,
        authToken: "fake-token",
        userData: {
          id: "1",
          name: "Test User",
          email: email
        }
      })
    });
  });

export const signUpApi = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
);

export const getStocks = jest.fn().mockImplementation(() => 
  Promise.resolve([
    { ticker: "AAPL", name: "Apple Inc.", price: 150 },
    { ticker: "MSFT", name: "Microsoft Corporation", price: 250 }
  ])
);

export const fetchStock = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 150
  })
);

export const createStock = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const updateStock = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const deleteStock = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const getMutualFunds = jest.fn().mockImplementation(() => 
  Promise.resolve([
    { schemeName: "Fund A", nav: 25.5 },
    { schemeName: "Fund B", nav: 30.2 }
  ])
);

export const fetchMutualFund = jest.fn().mockImplementation(() => 
  Promise.resolve({
    schemeName: "Fund A",
    nav: 25.5
  })
);

export const createMutualFund = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const updateMutualFund = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const deleteMutualFund = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true })
);

export const handleDownloadStock = jest.fn().mockImplementation(() => 
  Promise.resolve()
);

export const handleDownloadMutualFund = jest.fn().mockImplementation(() => 
  Promise.resolve()
);

export const refreshAuthToken = jest.fn().mockImplementation(() => 
  Promise.resolve({ success: true, authToken: "mock-token" })
);