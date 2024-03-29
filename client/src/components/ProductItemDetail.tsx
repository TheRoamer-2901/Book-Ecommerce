import { useState, useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { CartItem, Product } from '../types/Product'
import { productAdded } from '../redux/slices/cartSlice'
import { addCartItemToDB, updateCartItemQuantityToDB } from '../redux/slices/cartSlice'
import { useAppSelector, useAppDispatch } from '../hooks/hook'
import { useAsync } from '../hooks/useAsync'
import { getDiscountPrice } from '../utils/product.js'
import { getProductById } from '../lib/axios/product'
import Loading from './Loading'

const ProductItemDetail = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.user.authUser)
    const cartItems = useAppSelector(state => state.cart.items)
    const [quantity, setQuantity] = useState<number>(0)

    function getCartItemId(cartItems : CartItem[], productId : string) : string | undefined {        
        const cartItem = cartItems.find(item => item.product?.id === productId)
        return cartItem ? cartItem.id : undefined
    }

    async function addToCart(product: Product | undefined, quantity: number, selected: boolean = false) {
        if(quantity > 0) {            
            const cartItemId = getCartItemId(cartItems, product!.id)
            if(authUser.name !== "") {                
                if(cartItemId) {
                    dispatch(updateCartItemQuantityToDB({
                        option: 'increase',
                        body: {
                            quantity: quantity, itemId: cartItemId
                        }
                    }))
                } else{
                    dispatch(addCartItemToDB({product: product, quantity: quantity, userId: authUser.id})).unwrap()
                }
            }
            else {                
                dispatch(productAdded({product: product, quantity: quantity, selected: selected}))
            }
        }
    }

    const {data : product, loading} = useAsync<Product>(() => {        
        return getProductById(id as string)
    }, [id])

    if(loading) return <Loading />  
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
                <div><span className='italic font-semibold'>Tác giả:</span> <span className='font-semibold'>{product?.author}</span></div>
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

                <div className='my-2'>
                    <p className='italic font-semibold'>Số lượng: </p>
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
                    <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                    <div>
                        <p className='italic font-semibold'>Thể loại:</p>
                    </div>
                        {product?.genres.map((genre, i) => <div className="font-semibold text-sky-600 border border-sky-600 px-2 py-2 w-fit rounded-md" key={i}>
                            {genre}
                        </div>)}
                    <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                    <button 
                        onClick={() => {addToCart(product, quantity)}}
                        className="flex items-center rounded-md mt-5 px-[10px] py-[10px]  text-sky-600 border border-sky-600"
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