import { saveStocksThunk, setStock } from "../store/slice/stockSlice";

export const getStocks = () => {
  return async (dispatch) => {
    // Accept dispatch as an argument
    try {
      const appUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(appUrl + "/stock/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      const stockData =
        typeof json.stockData === "string"
          ? JSON.parse(json.stockData)
          : json.stockData;
      console.log("Stock data : ", stockData);
      dispatch(saveStocksThunk(stockData));
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };
};

export const fetchStock = async () => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(appUrl + "/stock/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      const stockData =
        typeof json.stock === "string" ? JSON.parse(json.stock) : json.stock;
      console.log("Stock data : ", stock);
      return stockData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const createStock = async (stock) => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(appUrl + "/stock/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(stock),
    });
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const deleteStock = async (ticker) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/delete/" + ticker, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();

  return json;
};

export const updateStock = async (ticker, formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/update/" + ticker, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });

  const json = await response.json();

  return json;
};

export const fetchMutualFund = async (schemeName) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/" + schemeName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();
  if (json.success) {
    const mutualFundData =
      typeof json.mutualFund === "string"
        ? JSON.parse(json.mutualFund)
        : json.mutualFund;
    return mutualFundData;
  }
  return null;
};

export const getMutualFunds = async () => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();
  const mutualFundData =
    typeof json.mutualFundData === "string"
      ? JSON.parse(json.mutualFundData)
      : json.mutualFundData;
  return mutualFundData;
};

export const createMutualFund = async (formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });

  const json = await response.json();

  return json.success;
};

export const deleteMutualFund = async (schemeName) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/delete/" + schemeName, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();

  return json;
};

export const updateMutualFund = async (schemeName, formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds/update/" + schemeName, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });

  const json = await response.json();

  return json;
};
