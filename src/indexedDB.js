import { openDB } from "idb";

// Increase version number to trigger an upgrade
const dbPromise = openDB("stocksDB", 2, {
  upgrade(db, oldVersion, newVersion) {
    // Delete the old store if it exists
    if (oldVersion < 2 && db.objectStoreNames.contains("stocks")) {
      db.deleteObjectStore("stocks");
    }
    
    // Create a new store with ticker as the keyPath
    db.createObjectStore("stocks", { keyPath: "ticker" });
    console.log("Upgraded database to use ticker as keyPath");
  },
});

// Function to save stocks to IndexedDB
export const saveStocks = async (stocks) => {
  try {
    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
      console.error("Invalid stocks data:", stocks);
      return false;
    }
    
    console.log(`Preparing to save ${stocks.length} stocks`);
    const db = await dbPromise;
    
    // Use a single transaction for all operations
    const tx = db.transaction("stocks", "readwrite");
    const store = tx.objectStore("stocks");
    
    let successCount = 0;
    
    // Process each stock
    for (const stock of stocks) {
      if (!stock || !stock.ticker) {
        console.error("Stock missing ticker:", stock);
        continue;
      }
      
      try {
        await store.put(stock);
        successCount++;
        if (successCount % 500 === 0 || successCount === 1) {
          console.log(`Saved ${successCount} stocks so far`);
        }
      } catch (e) {
        console.error(`Failed to save stock ${stock.ticker}:`, e);
      }
    }
    
    await tx.done;
    console.log(`Successfully saved ${successCount} out of ${stocks.length} stocks`);
    
    return successCount > 0;
  } catch (error) {
    console.error("Error in saveStocks:", error);
    return false;
  }
};

// Keep getStocks function the same
export const getStocks = async () => {
  try {
    const db = await dbPromise;
    const stocks = await db.getAll("stocks");
    console.log(`Retrieved ${stocks.length} stocks from IndexedDB`);
    console.log("Stocks : ", stocks)
    return stocks;
  } catch (error) {
    console.error("Error retrieving stocks:", error);
    return [];
  }
};