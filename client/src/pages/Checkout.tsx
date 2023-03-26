import { useState } from "react";
import { 
    AiOutlinePlus, 
    AiOutlineMinus,
    AiOutlineDollar 
} from "react-icons/ai";
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import {
    productAdded,
    productReduced,
    couponApplied
} from "../redux/slices/cartSlice"
import MoMoIcon from '../assets/momo_icon_square.png';
import { useAppSelector, useAppDispatch } from "../hooks/hook";
import { CartItem } from "../types/Product";
import { useNavigate } from 'react-router-dom';
import { getDiscountPrice, getCheckoutValue } from "../utils/product";
import { PaymentMethod } from "../types/Payment";

type checkoutProps = {
  checkoutedItems: CartItem[]
}

const Item = (props : CartItem) => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    function toggleOpen() {
        setOpen(prev => !prev)
    }

    return(
        <div className="relative flex items-center flex-col justify-between w-full my-2 border border-slate-300 px-2 py-2">
            <div className="absolute top-2 right-2 flex items-center h-[20px] cursor-pointer"><span><HiOutlineLocationMarker className="text-black w-[16px] h-[16px]"/> </span>Chọn địa chỉ</div>
            <div className="grid grid-cols-checkout items-center gap-1">
                <div className="w-[120px] h-[150px] rounded-md overflow-hidden border border-gray-200">
                    <img 
                        className="w-full h-full object-cover"
                        src={props.img}
                    />
                </div>
                <div className="w-[350px] font-semibold">
                    {props.name}
                </div>
                <div className="cursor-pointer relative" onClick={() => {toggleOpen()}}>
                    {props.appliedCouponValue > 0 
                    ? <p className="font-medium text-base text-sky-600">{props.appliedCouponValue}k</p>
                    : <p className="font-semibold text-base text-red-500">Chưa áp dụng mã giảm giá</p>}
                    {open ?                     
                    <ul className="rounded-md overflow-hidden absolute border  border-sky-600 font-semibold top-[30px] left-0">
                    {props.coupons.length > 0 
                    ?  props.coupons.map((coupon, i) => {
                        return (
                            <li
                            onClick={() => {dispatch(couponApplied({...props, appliedcoupon: coupon}))}}
                             className="w-[50px] px-2 py-1 hover:bg-sky-100 bg-white text-sky-600"key={i}
                            >
                                {coupon}k
                            </li>)
                    })
                    : <li className="w-fit px-2 py-1 hover:bg-gray-100 bg-white">Hiện chưa có mã giảm giá</li>
                    }
                    </ul> : null
                    }
                </div>
                <div className="mt-1 flex items-center rounded-md border border-slate-200 h-fit w-fit">
                  <button 
                      onClick={() => dispatch(productReduced(props))}
                      className="p-2 border-r hover:bg-slate-100 border-slate-200"
                  >
                      <AiOutlineMinus />
                  </button>
                  <input type="text" value={props.quantity} className="h-full w-[40px] text-center outline-none"/>
                  <button 
                      onClick={(e) => {
                        dispatch(productAdded({id: props.id, quantity: 1, selected: props.selected}))
                    }}
                      className="p-2 border-l hover:bg-slate-100 border-slate-200"
                  >
                      <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sky-600 font-semibold ">
                      {getDiscountPrice(props.price, props.discountRate, props.quantity, props.appliedCouponValue)}đ
                  </span>
                  <span className="font-normal text-slate-300 line-through">{props.price*props.quantity}đ</span>
                </div>
            </div>
            <div className="mr-auto mt-2 w-2/5">
              <span className="text-base font-semibold">Chi chú cho người bán:</span>
              <textarea className="w-full h-[50px] p-2 border resize-none font-medium text-sm"></textarea>
            </div>
      </div>
    )
}

const ItemList = ({checkoutedItems} : checkoutProps) => {

    return(
        <>
            {checkoutedItems.length ? 
                checkoutedItems.map((item : CartItem, i) => {
                    return (
                      <Item {...item} key={i}/>
                    )
                })
                : <p className="text-sm text-sky-600 font-semibold">Bạn chưa chọn bất kỳ sản phẩm nào để thanh toán!</p>
            }

        </>  
    )
}   

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(undefined)
    const checkoutedItems = useAppSelector((state => {
      return state.cart.items.filter(item => item.selected)
    }))
    const navigate = useNavigate()
    const totalPrice = getCheckoutValue(checkoutedItems)
    function handleCheckout(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(paymentMethod == "Direct") {
            alert("Đặt hàng thành công!!")
        }
    }

    return (
        <form className="mt-4 border border-slate-300 px-4 py-4 w-full max-w-[1200px]" onSubmit={(e)=>{handleCheckout(e)}}>
            <p className="font-semibold text-xl text-center text-red-600">Thanh toán đơn hàng</p>
            <ItemList checkoutedItems={checkoutedItems}/> 
            <div>
              <p className="text-base text-sky-600 font-semibold">Hình thức thanh toán</p>
              <div className="flex gap-2">
                <div 
                  className={`border rounded-md px-2 py-2 w-fit flex items-center h-[40px] cursor-pointer `+
                  `${paymentMethod === "Direct" ? "bg-emerald-50 border-emerald-600" : "border-slate-200 hover:bg-emerald-50 hover:border-emerald-600"}`}
                  onClick={() => {setPaymentMethod("Direct")}}
                >
                  <FaMoneyBillWaveAlt className="mr-2 text-emerald-600"/>
                  <span className=" text-emerald-600 font-semibold">Trực tiếp khi nhận hàng</span>
                </div>
                <div 
                 className={`border rounded-md px-2 py-2 w-fit flex items-center h-[40px] cursor-pointer `+
                 `${paymentMethod === "MoMo" ? "border-[#d82d8b] bg-[#ffd6e7]" : "border-slate-200 hover:border-[#d82d8b] hover:bg-[#ffd6e7]"}`}
                  onClick={() => {setPaymentMethod("MoMo")}}
                >
                  <img src={MoMoIcon} className="h-full object-contain mr-2"/> 
                  <span className="text-[#d82d8b] font-semibold">Ví điện tử MoMo</span>
                </div>
              </div>
            </div>
            <div className="ml-auto w-fit flex items-center gap-3">
              <div className="text-sky-600 font-semibold text-base"><span className="font-bold text-red-600">TỔNG CỘNG: </span>{totalPrice}đ</div>
              <button className="px-2 py-2 border border-amber-300 font-semibold flex items-center hover:bg-amber-50 text-amber-300"  type="submit">
                <span>Thanh toán
                </span><AiOutlineDollar className="translate-y-[1px] ml-1"/>
              </button>
            </div>
        </form>
    )
}

export default Checkout