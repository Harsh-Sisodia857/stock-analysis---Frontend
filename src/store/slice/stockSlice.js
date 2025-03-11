import { createSlice } from "@reduxjs/toolkit";
import { getStocks, saveStocks } from '../../indexedDB'; 

const initialState = {
    stocks: []
}

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setStock: (state, action) => {
            const stocks = action.payload;
            console.log("STOCKS : ", stocks);
            state.stocks = stocks;
        },
        loadStocks: (state, action) => {
            console.log("Loading stocks: ", action.payload);
            state.stocks = action.payload;
        }
    }
})

// Create a thunk for saving stocks
export const saveStocksThunk = (stocks) => async (dispatch) => {
    dispatch(setStock(stocks)); // Update the Redux store
    await saveStocks(stocks);   // Save to IndexedDB
};

// Create a thunk for loading stocks
export const loadStocksThunk = () => async (dispatch) => {
    const stocks = await getStocks();
    dispatch(loadStocks(stocks));
};

export const { setStock, loadStocks } = stockSlice.actions;
export default stockSlice.reducer;
