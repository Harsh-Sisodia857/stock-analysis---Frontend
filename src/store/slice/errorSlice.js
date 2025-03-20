import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errors : {}
}

const errorSlice = createSlice({
    name: 'errorQuery',
    initialState,
    reducers: {
        setErrors : (state, action) => {
            state.errors = action.payload;
        }
    }
});

export const { setErrors } = errorSlice.actions;
export default errorSlice.reducer;