import { useState } from "react";
import { 
    AiOutlineShoppingCart,  
    AiOutlinePlus, 
    AiOutlineMinus, 
    AiOutlineClose  
} from "react-icons/ai";
import {
    productAdded,
    productReduced,
    productRemoved,
    deleteCartItemFromDB,
    updateCartItemQuantityToDB
} from "../redux/slices/cartSlice"
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hook";
import { CartItem } from "../types/Product";
import { getDiscountPrice } from "../utils/product";

type cartProps = {
    cartItems: CartItem[]
    closeCart: () => void
}

const Item = (props : CartItem) => {
    const authUser = useAppSelector(state => state.user.authUser)
    const dispatch = useAppDispatch()
    return(
        <div className="flex items-center justify-between w-[300px]">
            <div className="flex items-center gap-3">   
                <div className="w-[40px] h-[50px] rounded-md overflow-hidden">
                    <img 
                        className="w-full h-full object-cover"
                        src={props.product?.img}
                    />
                </div>
                <div>
                    <p>{props.product?.name}</p>
                    <div className="flex items-center gap-2">
                        <p>x {props.quantity}</p>
                        <div className="flex items-center gap-1">
                            <AiOutlinePlus 
                                onClick={() => {
                                    if(authUser.name !== "") {
                                        dispatch(updateCartItemQuantityToDB({
                                            option: 'increase',
                                            body: {
                                                itemId: props.id,
                                                quantity: 1
                                            }
                                        }))                                    
                                    } else{
                                        dispatch(productAdded({...props.product, quantity: 1}))
                                    }
                                }}
                                className="hover:bg-gray-200 p-[2px] rounded-full text-sm text-sky-600"
                            /> 
                            <AiOutlineMinus 
                                onClick={() => {
                                    if(props.quantity > 1) {
                                        if (authUser.name !== "") {
                                            dispatch(updateCartItemQuantityToDB({
                                                option: 'decrease',
                                                body: {
                                                    itemId: props.id,
                                                    quantity: 1
                                                }
                                            }))
                                        } else{
                                            dispatch(productReduced({product: props}))
                                        }
                                    } else {
                                        if (authUser.name !== "") {
                                            dispatch(deleteCartItemFromDB({itemId: props.id}))
                                        } else{
                                            dispatch(productRemoved({product: props}))
                                        }
                                    }
                                }}
                                className="hover:bg-gray-200 p-[2px] rounded-full text-sm text-sky-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <span className="mr-2 text-sky-600 font-semibold ">
                    {getDiscountPrice(props.product?.price, props.product?.discountRate)*props.quantity}đ
                </span>
                <BsTrashFill 
                    onClick={() => {
                        if(authUser.name !== "") {
                            dispatch(deleteCartItemFromDB({itemId: props.id}))
                        } else {
                            dispatch(productRemoved(props.id))}
                        }
                    }
                    className="text-sm font-semibold text-red-600 cursor-pointer"
                />
            </div>
        </div>
    )
}

const Cart = ({cartItems, closeCart} : cartProps) => {
    return(
        <div className="absolute z-50 bg-slate-50 px-2 py-2 border border-slate-300 top-[40px] right-0 w-[320px]">
            <h4 className="relative text-center text-lg font-semibold text-sky-600">
                <span>Giỏ hàng của tôi</span>
                <AiOutlineClose 
                    onClick = {() => closeCart()}
                    className="absolute top-0 right-0 text-red-600 cursor-pointer" 
                />
            </h4>
            {cartItems.length ? 
                cartItems.map((item : CartItem, i) => {
                    return <Item {...item} key={i}/>
                })
                : <p className="text-sm text-sky-600 font-semibold">Giỏ hàng đang trống!</p>
            }
            <Link to='/cart'>
                <p onClick = {() => closeCart()}className="font-medium text-sky-400 text-sm cursor-pointer">Xem chi tiết...</p>
            </Link>
        </div>  
    )
}   

const DropDownCart = () => {
    const [open, setOpen] = useState(false)
    const cart = useAppSelector((state => state.cart))

    const closeCart = () => {
        setOpen(false)
    }

    return (
        <>
            <div 
                className='relative rounded-full px-1 py-1 bg-white border border-white hover:bg-slate-100 hover:border-slate-200'>
                <AiOutlineShoppingCart 
                    onClick={() => {setOpen(prev => !prev)}}
                    className='text-sky-600 text-xl'
                />
                {cart.items.length > 0 && 
                    <span className="text-center text-xs font-medium text-white bg-red-500 w-[16px] h-[16px] rounded-full absolute -top-[8px] -right-[8px]">
                        {cart.items.length}
                    </span>
                }
                {open ? <Cart cartItems={cart.items} closeCart={closeCart}/> : null}
            </div>

        </>
    )
}

export default DropDownCart