import { useState } from "react";
import { 
    AiOutlinePlus, 
    AiOutlineMinus,
    AiOutlineDollar 
} from "react-icons/ai";
import {
    productAdded,
    productReduced,
    productRemoved,
    itemSelected,
    couponApplied,
    updateCartItemQuantityToDB,
    deleteCartItemFromDB
} from "../redux/slices/cartSlice"
import { BsTrashFill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../hooks/hook";
import { CartItem } from "../types/Product";
import { useNavigate } from 'react-router-dom';
import { getDiscountPrice, getCheckoutValue } from "../utils/product";

type cartProps = {
    cartItems: CartItem[]
}

const Item = (props : CartItem) => {
    const authUser = useAppSelector(state => state.user.authUser)
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    function toggleOpen() {
        setOpen(prev => !prev)
    }

    return(
        <div className="flex items-center justify-between w-full">
            <div className="grid grid-cols-cart items-center gap-1">
                <div className="w-[30px] h-[30px]">
                    <input 
                        type="checkbox" 
                        className="outline-none"
                        checked={props.selected}
                        onChange={() => dispatch(itemSelected({product: props.product}))}
                    />
                </div>
                <div className="w-[120px] h-[150px] rounded-md overflow-hidden border border-gray-200">
                    <img 
                        className="w-full h-full object-cover"
                        src={props.product.img}
                    />
                </div>
                <div className="w-[350px] ">
                    {props.product.name}
                </div>
                <div className="cursor-pointer relative" onClick={() => {toggleOpen()}}>
                    {props.appliedCouponValue > 0 
                    ? <p className="font-medium text-base text-sky-600">{props.appliedCouponValue/1000}k</p>
                    : <p className="font-semibold text-base text-red-500">Chưa áp dụng mã giảm giá</p>}
                    {open ?                     
                    <ul className="rounded-md overflow-hidden absolute border  border-sky-600 font-semibold top-[30px] left-0">
                    {props.product.coupons.length > 0 
                    ?  props.product.coupons.map((coupon, i) => {
                        return (
                            <li
                            onClick={() => {dispatch(couponApplied(
                                {
                                    product: props.product,
                                    appliedCoupon: coupon
                                }
                            ))}}
                             className="w-[50px] px-2 py-1 hover:bg-sky-100 bg-white text-sky-600"key={i}
                            >
                                {coupon/1000}k
                            </li>)
                    })
                    : <li className="w-fit px-2 py-1 hover:bg-gray-100 bg-white">Hiện chưa có mã giảm giá</li>
                    }
                    </ul> : null
                    }
                </div>
                <div className="mt-1 flex items-center rounded-md border border-slate-200 h-fit w-fit">
                  <button 
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
                      className="p-2 border-r hover:bg-slate-100 border-slate-200"
                  >
                      <AiOutlineMinus />
                  </button>
                  <input type="text" value={props.quantity} className="h-full w-[40px] text-center outline-none"/>
                  <button 
                    onClick={(e) => {
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
                      className="p-2 border-l hover:bg-slate-100 border-slate-200"
                  >
                      <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sky-600 font-semibold ">
                      {getDiscountPrice(props.product.price, props.product.discountRate, props.quantity, props.appliedCouponValue)}đ
                  </span>
                  <BsTrashFill 
                      onClick={() => {
                        if(authUser.name !== "") {
                            dispatch(deleteCartItemFromDB({itemId: props.id}))
                        } else {
                            dispatch(productRemoved(props.id))
                        }
                      }}
                      className="text-sm font-semibold text-red-600 cursor-pointer"
                  />
                </div>
          </div>
        </div>
    )
}

const ItemList = ({cartItems} : cartProps) => {

    return(
        <>
            {cartItems.length ? 
                cartItems.map((item : CartItem, i) => {
                    return (
                    <>
                      <Item {...item} key={i}/>
                      <div className="w-4/5 h-[1px] bg-gray-200 my-2"></div>
                    </>)
                })
                : <p className="text-sm text-sky-600 font-semibold">Giỏ hàng của bạn chưa có sản phẩm nào!</p>
            }

        </>  
    )
}   

const Cart = () => {
    const cart = useAppSelector((state => state.cart))
    const navigate = useNavigate()
    const totalPrice = getCheckoutValue(cart.items)
    function goToCheckoutPage() {
        if(totalPrice == 0) {
            alert("Bạn chưa chọn bất kỳ sản phẩm nào!!")
        }
        else navigate('/checkout')
    }

    return (
        <div className="mt-4 border border-slate-300 px-4 py-4 w-full max-w-[1200px]">
            <p className="font-semibold text-xl text-center text-sky-600">Giỏ hàng của tôi</p>
            <ItemList cartItems={cart.items}/> 
            <div className="ml-auto w-fit flex items-center gap-3">
              <div className="text-sky-600 font-semibold text-base">{totalPrice}đ</div>
              <button className="px-2 py-2 border border-amber-300 font-semibold flex items-center hover:bg-amber-50 text-amber-300" onClick={() => goToCheckoutPage()}>
                <span>Thanh toán
                </span><AiOutlineDollar className="translate-y-[1px] ml-1"/>
              </button>
            </div>
        </div>
    )
}

export default Cart