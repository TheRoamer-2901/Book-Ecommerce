import { useRef } from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { Product } from '../types/Product'
import { useAsync } from '../hooks/useAsync'
import { getProductById, updateProductStat} from '../lib/axios/product'
import { useParams } from 'react-router-dom'

type IdParam = {
    id: string
}

const EditProductForm = () => {
    const couponRef = useRef<HTMLInputElement>(null)
    const genreRef = useRef<HTMLInputElement>(null)
    const { id : productId } = useParams() as IdParam
    const {data : product, updateData: updateProduct, loading} = useAsync<Product>(() => getProductById(productId), [productId])
    
    async function handleUpdateProduct(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const res = await(updateProductStat(productId, product!))
        updateProduct(res)
        
    }

    return (
        <div>
            <h4>Chỉnh sửa thông tin sản phẩm</h4>
                {loading ? <h1>Loading</h1> : 
                <form onSubmit={(e) => handleUpdateProduct(e)}>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                            <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='img'>
                                Hình ảnh minh họa
                            </label>
                            <input 
                                type="file"
                                className='focus:outline-none font-normal text-gray-500 mt-1'
                                id="img"
                                placeholder='Chọn hình ảnh minh họa cho sản phẩm'
                            />
                            <div className='w-[300px] h-[420px]'>
                                <img className='w-full h-full object-cover' src={product?.img}/>
                            </div>
                        </div>
                        <div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='product-name'>
                                    Tên sản phẩm
                                </label>
                                <input 
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="product-name"
                                    value={product?.name}
                                    onChange={(e) => updateProduct({...product!, name: e.target.value})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='author-name'>Tác giả</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="author-name"
                                    value={product?.author}
                                    onChange={(e) => updateProduct({...product!, author: e.target.value})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='price'>Giá gốc</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="price"
                                    value={product?.price}
                                    onChange={(e) => updateProduct({...product!, price: parseInt(e.target.value)})}
                                />
                            </div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='quantity'>Số lượng hiện có</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    id="quantity"
                                    value={product?.quantity}
                                    onChange={(e) => updateProduct({...product!, quantity: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div>
                            <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                                <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='discount-rate'>% Giảm giá</label>
                                <input                     
                                    className='focus:outline-none font-normal text-gray-500'
                                    placeholder='Nhập số. VD: 10' id="discount-rate"
                                    value={product?.discountRate}
                                    onChange={(e) => updateProduct({...product!, discountRate: parseInt(e.target.value)})}
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
                                            console.log(couponRef.current?.value);
                                            if(product?.coupons == undefined) {
                                                updateProduct({...product!, coupons: [parseInt(couponRef.current!.value)]})
                                            }
                                            else {
                                                
                                                let newCouponList = [...product?.coupons!, parseInt(couponRef.current!.value)]
                                                updateProduct({...product!, coupons: newCouponList})
                                            }
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
                                            <span>{coupon}k</span>
                                            <AiOutlineClose 
                                                onClick={() => {
                                                    let newCoupons = product?.coupons.filter(c => c !== coupon)
                                                    updateProduct({...product, coupons: newCoupons})
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
                                            updateProduct({...product!, genres: newGenreList})
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
                                                    updateProduct({...product, genres: newGenres})
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
                    
                    <div>
                        <button 
                            className='border border-red-500 hover:bg-red-50 px-2 py-2 rounded-md font-semibold text-red-500'
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            className='border border-amber-400 hover:bg-amber-50 px-2 py-2 rounded-md font-semibold text-amber-400'
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                    
                </form>
            }
        </div>
  )
}

export default EditProductForm