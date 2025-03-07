import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '',
}

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            console.log('====================================');
            console.log(action.payload);
            console.log('====================================');
            state.searchQuery = action.payload;
        }
    }
});

export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;