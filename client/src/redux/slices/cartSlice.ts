import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/Product";

const initialState : {items: CartItem[]} = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        productAdded: (state, action) => {
            let newItem = true
            state.items = state.items.map(item => {
                if(item.id !== action.payload.id ) {
                    return item
                } else{ // found added item as old item
                    newItem = false
                    return {...item, quantity: item.quantity + action.payload.quantity}
                }
            })
            if(newItem) {
                state.items = [action.payload, ...state.items]
            }
        },
        productReduced: (state, action) => {
            state.items.forEach((item, index) => {
                if(item.id === action.payload.id && item.quantity > 1) {
                    item.quantity = item.quantity-1;
                }
                if(item.id === action.payload.id && item.quantity == 1) {
                    state.items.splice(index, 1)
                }

            })          
        },
        productRemoved: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
})

export const { 
    productAdded,
    productReduced,
    productRemoved
} = cartSlice.actions

export default cartSlice.reducer