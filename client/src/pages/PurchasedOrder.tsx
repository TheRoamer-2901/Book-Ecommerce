import { useState} from 'react'
import { useAsync } from '../hooks/useAsync'
import { useAppSelector } from '../hooks/hook'
import { getAllOrder } from '../lib/axios/order'
import { Order } from '../types/Order'
import OrderItem from '../components/OrderItem'

const PurchasedOrder = () => {
  const authUser = useAppSelector(state => state.user.authUser)
  const { data : orderList, loading } = useAsync<Order[]>(async () => {
    if(authUser.id) return await getAllOrder(authUser.id)
  }, [authUser.id]) 

  if(loading) return <h1>Loading...</h1>

  return (
    <div className='w-[900px]'>
      <h4 className='text-sky-600 text-lg font-semibold mx-auto my-2 w-fit'>Đơn hàng của tôi</h4>
      { orderList?.length === 0 ? <p>Bạn chưa có đơn hàng nào!</p>
      : orderList?.map((order, i) => <OrderItem {...order} key={i}/>)}
    </div>
  )
}

export default PurchasedOrder