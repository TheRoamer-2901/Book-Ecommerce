import React from 'react'
import { Order, deliveryStatus as deliveryStatusProps } from '../types/Order'
import { useParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getOrderDetail } from '../lib/axios/order'
import { formatDate } from '../utils/order'
import { initOrderDate, latestStatus } from '../utils/order'
import { getDiscountPrice } from '../utils/product'
import { FaWpforms } from 'react-icons/fa'

const DeliveryStatus = ({date, state, description} : deliveryStatusProps) => {
    return (
        <div className='flex justify-between items-center gap-5'>
            <div className='flex flex-col items-center'>
                <FaWpforms className='text-emerald-500 w-[40px] h-[40px]'/>
                <h4 className='font-semibold'><span className='text-emerald-500'>{state}</span></h4>
            </div>
            <div>
                <h4><span className='italic font-semibold'>Thời gian: </span>{formatDate(date)}</h4>
                <p><span className='italic font-semibold'>Mô tả: </span>{description}</p>
            </div>
        </div>
    )
}

const PurchasedOrderDetail = () => {
    const {id : orderId} = useParams()
    const {data : order, loading} = useAsync<Order>(async () => {
        return await getOrderDetail(orderId as string)
    }, [])
    if(loading) return <h1>Loading...</h1>

    const cartItem = order?.cartItem
    const product = order?.cartItem.product
    return (
        <div>
            <div className='flex items-center justify-between w-full px-2 py-2 ml-3 rounded-sm'>
                <div className='w-[440px] h-[440px]'>
                    <img className="object-contains w-full"
                        src={cartItem?.product.img}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-semibold text-sky-600 self-center'>Thông tin cơ bản</h4>
                    <div className='font-semibold'>
                        <span className='italic'>Tên sản phẩm: </span>
                        {cartItem?.product.name}
                    </div>
                    <div className='font-semibold'>
                        <span className='italic'>Tình trạng: </span>
                        <span className=" text-emerald-500">{latestStatus(order!.deliveryLog)}</span>
                    </div>

                    <div className='font-semibold'>
                        <span className='italic'>Ngày đặt hàng: </span>
                        <span  >{initOrderDate(order!.deliveryLog)}</span>
                    </div>
                    <div className='font-semibold'>
                        <span className='italic'>Số lượng: </span>
                        <span  >{cartItem.quantity}</span>
                    </div>
                    <div className='font-semibold'>
                        <span className='italic'>Giá gốc: </span>
                        <span  >{cartItem.product.price*cartItem.quantity}đ</span>
                    </div>
                    <div className='font-semibold'>
                        <span className='italic'>Tiết kiệm: </span>
                        <span className='text-slate-400 italic line-through'>
                            {cartItem.product.price*cartItem.quantity
                             - 
                             getDiscountPrice(product.price, product.discountRate, cartItem.quantity, order!.appliedCouponValue)
                            }đ
                        </span>
                    </div>
                    
                    <div className='font-semibold'>
                        <span className='italic'>Thành tiền: </span>
                        <span  >
                            {getDiscountPrice(product.price, product.discountRate, cartItem.quantity, order!.appliedCouponValue )}đ
                        </span>
                    </div>
                    <button className="px-2 py-2 border border-red-500 hover:bg-red-100 font-semibold text-red-500 rounded-sm">
                        Hủy đơn hàng
                    </button>
                </div>

            </div>
        <div className='px-3 flex flex-col items-center w-full mx-5'>
            <h4 className='text-lg font-semibold text-sky-600'>Thông tin vận chuyển chi tiết</h4>

            <div className='font-semibold my-3'>
                <span className='italic'>Địa chỉ: </span>
                <span>{order?.location}</span>
            </div>
            {order?.deliveryLog.map((status, index) => <DeliveryStatus key={index} {...status}/>)}
        </div>
    </div>)
}

export default PurchasedOrderDetail