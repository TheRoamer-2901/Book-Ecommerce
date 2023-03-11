import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import productOptionReducer from './slices/productOption'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        productOption: productOptionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch