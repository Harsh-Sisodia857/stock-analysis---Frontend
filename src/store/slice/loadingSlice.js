import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading : false
}

const loadingQuerySlice = createSlice({
    name: 'loadingQuery',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoading } = loadingQuerySlice.actions;
export default loadingQuerySlice.reducer;