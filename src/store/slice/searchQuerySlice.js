import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '',
    searchCompanyBox : ''
}

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSearchCompany: (state, action) => {
            state.searchCompanyBox = action.payload;
        }
    }
});

export const { setSearchQuery,setSearchCompany } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;