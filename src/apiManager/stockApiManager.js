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

export const getMutualFunds = async () => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/mutual_funds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    }
  });

  const json = await response.json();
  const mutualFundData =
    typeof json.mutualFundData === "string"
      ? JSON.parse(json.mutualFundData)
      : json.mutualFundData;
  return mutualFundData;
};
