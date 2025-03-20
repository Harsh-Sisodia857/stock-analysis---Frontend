import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mutualFund : []
}

const mutualFundSlice = createSlice({
    name : 'mutualFund',
    initialState,
    reducers : {
        setMutualFund : (state, action) => {
            state.mutualFund = action.payload
        }
    }
})

export const {setMutualFund} = mutualFundSlice.actions;
export default mutualFundSlice.reducer;