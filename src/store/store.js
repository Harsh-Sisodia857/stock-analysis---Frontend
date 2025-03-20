import { configureStore } from '@reduxjs/toolkit'
import searchQueryReducer from './slice/searchQuerySlice';
import userSliceReducer from './slice/userSlice';
import stockReducer from './slice/stockSlice';
import toggleThemeReducer from './slice/themeSlice'
import loadingReducer from './slice/loadingSlice'
import errorReducer from './slice/errorSlice'
import mutualFundReducer from './slice/mutualFundSlice'

const store = configureStore({
    reducer: {
        searchQuery: searchQueryReducer,
        user: userSliceReducer,
        stocks : stockReducer,
        theme: toggleThemeReducer,
        loading : loadingReducer,
        errors : errorReducer,
        mutualFund : mutualFundReducer,
    },
})

export default store;