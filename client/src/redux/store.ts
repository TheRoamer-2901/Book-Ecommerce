import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import filterOptionsReducer from './slices/filterOptionsSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filterOptions: filterOptionsReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch