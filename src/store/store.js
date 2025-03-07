import { configureStore } from '@reduxjs/toolkit'
import searchQueryReducer from './slice/searchQuerySlice';
import userSliceReducer from './slice/userSlice';


const store = configureStore({
    reducer: {
        searchQuery: searchQueryReducer,
        user: userSliceReducer,
    },
})

export default store;