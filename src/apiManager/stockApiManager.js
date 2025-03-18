import { toast } from "react-toastify";

export const getStocks = async () => {
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
    console.log("Stock data received : ", stockData);
    return stockData;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchStock = async (ticker) => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    console.log("TICKER : ", ticker);
    const response = await fetch(appUrl + "/stock/?ticker=" + ticker, {
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
      console.log("Stock data : ", stockData);
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
  const response = await fetch(appUrl + "/stock/delete/" + ticker, {
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
  const response = await fetch(appUrl + "/stock/update/" + ticker, {
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

const downloadFile = async (endpoint, filename) => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${appUrl}/${endpoint}/download`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    toast.error(`Failed to download ${filename}. Please try again.`);
  }
};

export const handleDownloadStock = () => downloadFile("stock", "stock.json");
export const handleDownloadMutualFund = () => downloadFile("mutual_funds", "mutual_fund.json");


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
