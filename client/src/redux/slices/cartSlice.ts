import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../../types/Product";
import { 
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    syncCart
} from "../../lib/axios/cart";
import {
    saveOrder
} from "../../lib/axios/order"

const initialState : {items: CartItem[]} = {
    items: []
}

export const addCartItemToDB = createAsyncThunk(
    'cart/cartItemAddedToDB',
    async (newItem : object, { dispatch }) => {        
        const res = await addCartItem(newItem)
        dispatch(productAdded({
            product: res.product, 
            quantity: res.quantity, 
            itemId: res.id
        }))
        return res
    }
)

export const updateCartItemQuantityToDB = createAsyncThunk(
    'cart/cartItemQuantityUpdated',
    async ({body, option} : {body: any, option: 'increase' | 'decrease' }, {dispatch}) => {
        const res = await updateCartItemQuantity(body, option)
        
        dispatch(productAdded({
            product: res.product, 
            quantity: res.quantity, 
            itemId: res.id
        }))
        return res    
    }
)

export const deleteCartItemFromDB = createAsyncThunk(
    'cart/cartItemDelted',
    async (data : object, { dispatch }) => {
        const res = await deleteCartItem(data)
        dispatch(productRemoved({
            product: res.product
        }))
    }
)
export const syncCartWithDB = createAsyncThunk(
    'cart/cartSynced',
    async (data: {items: object, token: string}, { dispatch } ) => {
        const res = await syncCart(data.items, data.token)
        dispatch(cartInited(
            {items: res
        }))
    }
)

export const createNewOrderFromCartItem = createAsyncThunk(
    'cart/orderCreated',
    async (data: object, {dispatch}) => {
        const res = await saveOrder(data)
        dispatch(itemOrdered({idList: res}))
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        cartInited: (state, action) => {
            const newItems = action.payload.items.map((item : any)=> {
                return {
                    id: item.id,
                    selected: false,
                    quantity: item.quantity,
                    product: {...item.product},
                    appliedCouponValue: 0
                }
            })
            state.items = newItems
        },
        itemOrdered: (state, action) => {
          state.items = state.items.filter(item => !action.payload.idList.includes(item.id))  
          
        },
        productAdded: (state, action) => {
            const itemId = state.items.findIndex(item => item.product.id === action.payload.product.id)
            if(itemId >= 0) {                                
                state.items[itemId].quantity += action.payload.quantity
            } else{                
                
                const newItem = {
                    id: action.payload.itemId ? action.payload.itemId : "default id", 
                    product: action.payload.product, 
                    quantity: action.payload.quantity, 
                    selected: false,
                    appliedCouponValue: 0,
                    orderInfo: {
                        location: "",
                        note: ""
                    }
                }
                state.items = [newItem, ...state.items]
            }

        },
        productReduced: (state, action) => {
            state.items = state.items
                            .map(item => item.product.id === action.payload.product.id ? {...item, quantity: item.quantity-1} : item)
    
        },
        productRemoved: (state, action) => {
            state.items = state.items.filter(item => item.product.id !== action.payload.product.id)
        },
        itemSelected: (state, action) => {
            state.items = state.items.map(item => item.product.id === action.payload.product.id ? {...item, selected: !item.selected} : item)
            console.log(state.items);  
        },
        couponApplied: (state, action) => {
            state.items = state.items.map(item => item.product.id === action.payload.product.id ? {...item, appliedCouponValue: action.payload.appliedCoupon} : item)
        },
        orderInfoUpdated: (state, action) => {
            state.items = state.items.map(item => {
                return item.product.id === action.payload.product.id ? {...item, orderInfo: action.payload.orderInfo } : item
            })
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCartItemToDB.fulfilled, () => {
        })
        .addCase(updateCartItemQuantityToDB.fulfilled, () => {
        })
        .addCase(deleteCartItemFromDB.fulfilled, () => {
        })
        .addCase(syncCartWithDB.fulfilled, () => {
        })
    }
})

export const { 
    productAdded,
    productReduced,
    productRemoved,
    itemSelected,
    couponApplied,
    orderInfoUpdated,
    cartInited,
    itemOrdered
} = cartSlice.actions

export default cartSlice.reducer
