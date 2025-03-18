import { createSlice } from "@reduxjs/toolkit";

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


export const { setStock, loadStocks } = stockSlice.actions;
export default stockSlice.reducer;
