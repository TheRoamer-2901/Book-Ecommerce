import { useState, useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { productAdded } from '../redux/slices/cartSlice'
import { useAppDispatch } from '../hooks/hook'
import { getDiscountPrice } from '../utils/product.js'

const ProductItemDetail = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState<number>(0)
    const [product, setProduct] = useState<Product | undefined>()

    function addToCart(product: Product | undefined, quantity: number) {
        if(quantity > 0) {
            dispatch(productAdded({...product, quantity: quantity}))
        }
    }

    useEffect(() => {
      fetch(`http://localhost:3000/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
    }, [id])
    return (
        <div className='flex border h-fit border-gray-200 rounded-sm'>
            <div className='h-[500px] w-[350px] overflow-hidden'>
                <img 
                    className='w-full h-full object-cover'
                    src={product?.img} 
                />
            </div>
            <div className="px-3 py-4 border-l w-[550px]">
                <h4 className="font-semibold text-xl">{product?.name}</h4>
                <div>Tác giả: <span className="text-sky-400 font-medium">{product?.author}</span></div>
                <div className="flex items-center gap-2.5">
                    <span className='flex'>
                        <AiOutlineStar className="text-amber-300"/>
                        <AiOutlineStar className="text-amber-300"/>
                        <AiOutlineStar className="text-amber-300"/>
                        <AiOutlineStar className="text-amber-300"/>
                        <AiOutlineStar className="text-amber-300"/>
                    </span>
                    <span className='text-sm text-gray-400'>(Xem 1000 đánh giá)</span>
                    <span className='text-sm text-gray-400'>Đã bán 1000+</span>

            </div>
            <div>
                <div className='w-full h-full my-2 px-2 py-2 rounded-md bg-slate-100 border-b border-r border-gray-200'>
                    <p>
                        <span className='mr-2 text-rose-500 text-2xl font-semibold'>
                            {product && getDiscountPrice(product.price, product.discountRate)}
                            </span>
                        <span className='mr-1 font-normal text-sm line-through text-gray-400'>{product?.price}đ</span>
                        <span className='text-rose-500 font-semibold'>{`-${product?.discountRate}%`}</span>
                    </p>
                </div>
                <div className='my-3 w-full h-[1px] bg-gray-200'></div>
                <div>
                    <div 
                        className=
                            'px-2 py-1 border border-sky-600 text-sky-600 font-semibold w-fit rounded-md'>
                        Giảm 15k
                    </div>
                </div>
                <div className='my-3 w-full h-[1px] bg-gray-200'></div>

                <div className='my-2'>
                    <p>Số lượng</p>
                    <div className="mt-1 flex items-center rounded-md border border-slate-200 h-fit w-fit">
                        <button 
                            onClick={() => setQuantity(prev => {return prev > 0 ? prev-1 : 0})}
                            className="p-2 border-r hover:bg-slate-100 border-slate-200"
                        >
                            <AiOutlineMinus />
                        </button>
                        <input type="text" value={quantity} className="h-full w-[40px] text-center outline-none"/>
                        <button 
                            onClick={() => setQuantity(prev => prev+1)}
                            className="p-2 border-l hover:bg-slate-100 border-slate-200"
                        >
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <button 
                        onClick={() => {addToCart(product, quantity)}}
                        className="flex items-center rounded-md mt-5 px-[10px] py-[10px]  text-sky-400 border border-sky-600"
                    >
                        <BsCartPlus className="text-lg font-semibold"/>
                        <span className="ml-2 font-semibold">Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProductItemDetail