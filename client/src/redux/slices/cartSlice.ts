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
                    return {...item, quantity: item.quantity + action.payload.quantity, selected: action.payload.selected}
                }
            })
            if(newItem) {
                state.items = [action.payload, ...state.items]
            }
        },
        productReduced: (state, action) => {
            state.items = state.items
                            .map(item => item.id === action.payload.id ? {...item, quantity: item.quantity-1} : item)
                            .filter(item => item.quantity > 0)
    
        },
        productRemoved: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        itemSelected: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? {...item, selected: !item.selected} : item)
            console.log(state.items);
            
        },
        couponApplied: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? {...item, appliedCouponValue: action.payload.appliedcoupon} : item)
        }
    }
})

export const { 
    productAdded,
    productReduced,
    productRemoved,
    itemSelected,
    couponApplied
} = cartSlice.actions

export default cartSlice.reducer