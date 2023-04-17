import { useState, useRef } from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { NewProduct } from '../types/Product'
import { createNewProduct } from '../lib/axios/product'

const defaultProduct = {
    name : "",
    author: "",
    img: "",
    price: 0,
    quantity: 0,
    discountRate: 0,
    genres: [],
    coupons: []
}

const AddProductForm = () => {
    const navigate = useNavigate()
    const couponRef = useRef<HTMLInputElement>(null)
    const genreRef = useRef<HTMLInputElement>(null)

    const [ product, setProduct] = useState<NewProduct>(defaultProduct)
    async function handleCreateProduct(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await(createNewProduct(product)).then((newProduct) => {
            console.log(newProduct.id);    
            alert("Tạo sản phẩm thành công!")
            navigate(`/shop/product/${newProduct.id}/edit`)
        })
        
        
    }

    return (
        <div>
            <h4 className='text-lg font-semibold text-sky-600 mx-auto w-fit mb-3'>Tạo sản phẩm mới</h4>
                <form className="min-w-[900px]" onSubmit={(e) => handleCreateProduct(e)}>
                    <div className='flex items-center gap-7'>
                        <div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md w-fit'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='img'>
                                    Link ảnh minh họa
                                </label>
                                    <input 
                                    type="text"
                                    className='focus:outline-none font-normal text-gray-500 mt-1 w-full'
                                    id="img"
                                    onChange={(e) => setProduct({...product!, img: e.target.value})}
                                    placeholder='Nhập link hình ảnh minh họa sản phẩm'
                                />
                                <div className='w-[300px] h-[420px]'>
                                    <img className='w-full h-full object-cover' src={product?.img}/>
                                </div>                                                   
                            </div>
                            <div className='m-auto w-fit mt-2'>
                                <button 
                                    className='mr-2 border border-red-500 hover:bg-red-50 px-2 py-2 rounded-md font-semibold text-red-500'
                                    type="button"
                                    onClick={() => {navigate('/shop')}}
                                >
                                    Hủy bỏ
                                </button>
                                <button 
                                    className='border border-amber-400 hover:bg-amber-50 px-2 py-2 rounded-md font-semibold text-amber-400'
                                    type="submit"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 flex-1'>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='product-name'>
                                    Tên sản phẩm
                                </label>
                                <input 
                                    className='focus:outline-none font-normal text-gray-500 w-full'
                                    id="product-name"
                                    value={product?.name}
                                    onChange={(e) => setProduct({...product!, name: e.target.value})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='author-name'>Tác giả</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="author-name"
                                    value={product?.author}
                                    onChange={(e) => setProduct({...product!, author: e.target.value})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='price'>Giá gốc</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="price"
                                    value={product?.price}
                                    onChange={(e) => setProduct({...product!, price: parseInt(e.target.value)})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='quantity'>Số lượng hiện có</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="quantity"
                                    value={product?.quantity}
                                    onChange={(e) => setProduct({...product!, quantity: parseInt(e.target.value)})}
                                />
                            </div>

                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='discount-rate'>% Giảm giá</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    placeholder='Nhập số. VD: 10' id="discount-rate"
                                    value={product?.discountRate}
                                    onChange={(e) => setProduct({...product!, discountRate: parseInt(e.target.value)})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <h4 className='absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20'>Mã giảm giá</h4>
                                <div className='flex items-center border border-teal-500 rouded-md mt-1'>
                                    <input 
                                        placeholder='Thêm mã giảm giá'
                                        className='outline-none px-2 text-sm font-semibold text-teal-500 flex-1'
                                        ref={couponRef}
                                    />
                                    <AiOutlinePlus
                                        onClick={() => {
                                            if(product?.coupons == undefined) {
                                                setProduct({...product!, coupons: [parseInt(couponRef.current!.value)]})
                                            }
                                            else {   
                                                let newCouponList = [...product?.coupons!, parseInt(couponRef.current!.value)]
                                                setProduct({...product!, coupons: newCouponList})
                                            }
                                            couponRef.current!.value = ""
                                        }}
                                        className='w-[30px] h-[30px] border-l border-teal-500 cursor-pointer px-1 py-1 font-semibold hover:bg-teal-100 text-teal-500 text-base'
                                    />
                                </div>
                                <div className='mt-2 flex flex-wrap gap-2'>
                                    {product?.coupons?.map((coupon, i) =>{
                                        return(
                                        <div 
                                            key={i}
                                            className='flex items-center px-2 py-1 border border-sky-600 text-sky-600 font-semibold w-fit rounded-md'>
                                            <span>{coupon/1000}k</span>
                                            <AiOutlineClose 
                                                onClick={() => {
                                                    let newCoupons = product?.coupons.filter(c => c !== coupon)
                                                    setProduct({...product, coupons: newCoupons})
                                                }}
                                                className='ml-1 hover:text-red-500 rounded-full cursor-pointer translate-y-[1px] text-sky-600'
                                            />
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <h4 className='absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20'>Thể loại</h4>
                                <div className='flex items-center border border-teal-500 rouded-md mt-1'>
                                    <input 
                                        placeholder='Thêm thể loại'
                                        className='outline-none px-2 text-sm font-semibold text-teal-500 flex-1'
                                        ref={genreRef}
                                    />
                                    <AiOutlinePlus 
                                        onClick={() => {                                            
                                            let newGenreList = [...product?.genres!, genreRef.current!.value]
                                            setProduct({...product!, genres: newGenreList})
                                            genreRef.current!.value = ""
                                        }}
                                        className='w-[30px] h-[30px] border-l border-teal-500 cursor-pointer px-1 py-1 font-semibold hover:bg-teal-100 text-teal-500 text-base'
                                    />
                                </div>
                                <div className='mt-2 flex flex-wrap'>
                                    {product?.genres?.map((genre, i) =>{
                                        return(
                                        <div 
                                            key={i}
                                            className='flex items-center px-2 py-1 border border-sky-600 text-sky-600 font-semibold w-fit rounded-md'>
                                            <span>{genre}</span>
                                            <AiOutlineClose 
                                                onClick={() => {
                                                    let newGenres = product?.genres.filter(g => g !== genre)
                                                    setProduct({...product, genres: newGenres})
                                                }}
                                                className='ml-1 hover:text-red-500 rounded-full cursor-pointer translate-y-[1px] text-sky-600'
                                            />
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </form>
        </div>
  )
}

export default AddProductForm