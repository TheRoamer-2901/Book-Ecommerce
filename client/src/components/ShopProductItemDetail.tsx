import { useState, useEffect } from 'react'
import { AiFillEdit , AiFillStar } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { getDiscountPrice } from '../utils/product.js'

const ProductItemDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState<Product | undefined>()


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
                <p className='font-semibold'><span className='italic'>Tác giả: </span><span className="font-medium">{product?.author}</span></p>
                <div className="flex items-center gap-2.5">
                    <span className='flex'>
                        <AiFillStar className="text-amber-300"/>
                        <AiFillStar className="text-amber-300"/>
                        <AiFillStar className="text-amber-300"/>
                        <AiFillStar className="text-amber-300"/>
                        <AiFillStar className="text-amber-300"/>
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
                <div className='flex items-center flex-wrap gap-2'>
                    {product?.coupons.map((coupon, i) => {return (
                    <div 
                        className='cursor-pointer px-2 py-1 border border-sky-600 text-sky-600 font-semibold w-fit rounded-md'
                        >
                        
                        Giảm {coupon/1000} k
                    </div>
                    )})}
                </div>
                <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>
                <div>
                    <p className='italic font-semibold'>Thể loại:</p>
                </div>
                    {product?.genres.map((genre, i) => <div className="font-semibold text-sky-600 border border-sky-600 px-2 py-2 w-fit rounded-md" key={i}>
                        {genre}
                    </div>)}
                <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                <div className='my-2'>
                    <p className='font-semibold'><span className='italic'>Số lượng: </span><span>{product?.quantity}</span></p>
                </div>

                <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>
                <div className='flex items-center gap-4'>
                    <button 
                        className="flex items-center rounded-md mt-5 px-[10px] py-[10px] border border-red-500 hover:bg-red-50 text-red-500"
                    >
                        <BsFillTrashFill className="text-lg font-semibold"/>
                        <span className="ml-2 font-semibold">Xóa sản phẩm</span>
                    </button>
                    <button 
                        onClick={() => {navigate(`/shop/product/${product?.id}/edit`)}}
                        className="flex items-center rounded-md mt-5 px-[10px] py-[10px] border border-amber-400 hover:bg-amber-50 text-amber-400"
                    >
                        <AiFillEdit className="text-lg font-semibold"/>
                        <span className="ml-2 font-semibold">Chỉnh sửa</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProductItemDetail