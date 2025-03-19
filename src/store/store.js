import { configureStore } from '@reduxjs/toolkit'
import searchQueryReducer from './slice/searchQuerySlice';
import userSliceReducer from './slice/userSlice';
import stockReducer from './slice/stockSlice';
import toggleThemeReducer from './slice/themeSlice'

const store = configureStore({
    reducer: {
        searchQuery: searchQueryReducer,
        user: userSliceReducer,
        stocks : stockReducer,
        theme: toggleThemeReducer,
    },
})

export default store;