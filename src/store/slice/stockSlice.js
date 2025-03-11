import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stocks : []
}

export const stockSlice = createSlice({
    name : 'stock',
    initialState,
    reducers : {
        setStock : (state, action) => {
            const stocks = action.payload;
            console.log("STOCKS : ", stocks);
            state.stocks = stocks;
        }
    }
})

export const {setStock} = stockSlice.actions;
export default stockSlice.reducer;


