import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const getStocks = async () => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    const response = await fetchWithAuth(appUrl + "/stock/all", {
      method: "GET",
    });

    const stockData =
      typeof response.stockData === "string"
        ? JSON.parse(response.stockData)
        : response.stockData;
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
    const response = await fetchWithAuth(appUrl + "/stock/?ticker=" + ticker, {
      method: "GET",
    });

    if (response.success) {
      const stockData =
        typeof response.stock === "string"
          ? JSON.parse(response.stock)
          : response.stock;
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
    const response = await fetchWithAuth(appUrl + "/stock/create", {
      method: "POST",
      body: JSON.stringify(stock),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const deleteStock = async (ticker) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(appUrl + "/stock/delete/" + ticker, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateStock = async (ticker, formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(appUrl + "/stock/update/" + ticker, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response;
};

const downloadFile = async (endpoint, filename) => {
  try {
    const appUrl = import.meta.env.VITE_API_URL;
    const response = await fetchWithAuth(`${appUrl}/${endpoint}/download`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ensure the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Download failed. Server response:", errorText);
      toast.error(`Failed to download file: ${errorText}`);
      return;
    }

    // Read response as a blob
    const blob = await response.blob();
    console.log("Blob type:", blob.type); // Debugging

    // Explicitly set the file type to CSV
    const csvBlob = new Blob([blob], { type: "text/csv" });
    const url = window.URL.createObjectURL(csvBlob);

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    console.log("file name : ", filename);
    filename = filename.endsWith(".json") ? filename.slice(0, -5) : filename;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    toast.error(`Failed to download ${filename}. Please try again.`);
  }
};

export const handleDownloadStock = async () => {
  await downloadFile("stock", "stock.json");
  toast("Stock File is Downloaded");
};

export const handleDownloadMutualFund = async () => {
  await downloadFile("mutual_funds", "mutual_fund.json");
  toast("Mutual Fund File is Downloaded");
};

export const fetchMutualFund = async (schemeName) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(appUrl + "/mutual_funds/" + schemeName, {
    method: "GET",
  });

  if (response.success) {
    const mutualFundData =
      typeof response.mutualFund === "string"
        ? JSON.parse(response.mutualFund)
        : response.mutualFund;
    return mutualFundData;
  }
  return null;
};

export const getMutualFunds = async () => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(appUrl + "/mutual_funds", {
    method: "GET",
  });

  const mutualFundData =
    typeof response.mutualFundData === "string"
      ? JSON.parse(response.mutualFundData)
      : response.mutualFundData;
  return mutualFundData;
};

export const createMutualFund = async (formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(appUrl + "/mutual_funds/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const deleteMutualFund = async (schemeName) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(
    appUrl + "/mutual_funds/delete/" + schemeName,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateMutualFund = async (schemeName, formData) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetchWithAuth(
    appUrl + "/mutual_funds/update/" + schemeName,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  return response;
};

export const loginApi = async (email, password) => {
  const appUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(appUrl + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};

export const signUpApi = async (userDetails) => {
  const response = await fetch(appUrl + "/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  return response;
};

export const refreshAuthToken = async () => {
  try {
    const response = await fetch(`${API_URL}/user/refreshToken`, {
      method: "POST",
      credentials: "include", // Important: This sends the cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If refresh fails, clear auth token
      localStorage.removeItem("token");
      return { success: false, error: "Refresh failed" };
    }

    const data = await response.json();

    if (data.success) {
      // Update only the auth token
      const token = data.authToken;
      localStorage.setItem("token", token);
      return { success: true };
    } else {
      localStorage.removeItem("token");
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    localStorage.removeItem("token");
    return { success: false, error: "Network error" };
  }
};

const fetchWithAuth = async (url, options = {}) => {
  // Get the current access token from your app's state or memory
  const accessToken = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  // Set the Authorization header with the access token
  if (accessToken) {
    options.headers = {
      ...options.headers,
      credentials: "include",
      "auth-token": accessToken,
    };
  }

  // Make the API request
  try {
    const response = await fetch(`${url}`, options);

    // If the response is successful, return the response
    if (response.ok) {
      return response.json(); // Assuming the API returns JSON
    }

    // If the response is 401 Unauthorized, attempt to refresh the access token
    if (response.status === 401) {
      const refreshResponse = await fetch(`${apiUrl}/user/refreshToken`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      // If the refresh token call is successful, we get a new access token
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        console.log("REFRESH AUTH TOKEN : ", data);
        const newAccessToken = data.authToken;

        // Store the new access token
        localStorage.setItem("token", newAccessToken);

        // Retry the original request with the new access token
        options.headers["auth-token"] = newAccessToken;
        const retryResponse = await fetch(`${url}`, options);

        // If the retry is successful, return the response
        if (retryResponse.ok) {
          return retryResponse.json();
        }
      }
      const navigate = useNavigate();
      navigate("/login");
    }

    // If the request failed for another reason (not 401), throw an error
    throw new Error("Something went wrong");
  } catch (error) {
    console.error("API call failed", error);
    throw error; // Rethrow the error to be handled by calling code
  }
};
