import React from 'react'
import { Order as orderProps } from '../types/Order'
import { initOrderDate, latestStatus } from '../utils/order'
import { getDiscountPrice } from '../utils/product'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({id,     location, deliveryLog, cartItem, appliedCouponValue} : orderProps) => {
    const navigate = useNavigate()
    const product = cartItem.product
  return (
    <div>
        <div className='flex items-center justify-between w-full border border-slate-400 px-2 py-2 ml-3 rounded-sm'>
                <div className='w-[200px] h-[200px]'>
                    <img className="object-contains w-full"
                        src={cartItem.product.img}
                    />
                </div>
            <div className='flex flex-col'>
                <div className='font-semibold'>
                    <span className='italic'>Tên sản phẩm: </span>
                    {cartItem.product.name}
                </div>
                <div className='font-semibold'>
                    <span className='italic'>Tình trạng: </span>
                    <span className=" text-emerald-500">{latestStatus(deliveryLog)}</span>
                </div>
                <div className='font-semibold'>
                    <span className='italic'>Địa chỉ: </span>
                    <span>{location}</span>
                </div>
                <div className='font-semibold'>
                    <span className='italic'>Ngày đặt hàng: </span>
                    <span  >{initOrderDate(deliveryLog)}</span>
                </div>
                <div className='font-semibold'>
                    <span className='italic'>Số lượng: </span>
                    <span  >{cartItem.quantity}</span>
                </div>
                <div className='font-semibold'>
                    <span className='italic'>Thành tiền: </span>
                    <span  >{getDiscountPrice(product.price, product.discountRate, cartItem.quantity, appliedCouponValue )}</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <button className="px-2 py-2 border border-sky-600 hover:bg-sky-100 font-semibold text-sky-600 rounded-sm" onClick={() => {navigate(`/user/purchased-order/${id}`)}}>
                    Xem chi tiết
                </button>
                <button className="px-2 py-2 border border-red-500 hover:bg-red-100 font-semibold text-red-500 rounded-sm">
                    Hủy đơn hàng
                </button>
            </div>
        </div>
    </div>
  )
}

export default OrderItem