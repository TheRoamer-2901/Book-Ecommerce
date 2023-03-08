import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineShop } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"

const ShopItem = () => {
  return (
    <div className="mt-[20px] p-3 w-fit h-fit border border-gray-300 rounded-sm">
        <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <img 
            className="w-full h-full object-cover"
            src="https://vcdn.tikicdn.com/cache/w100/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png.webp" alt="" 
            />
        </div> 
        <div className='font-semibold'>Tiki Trading</div>
        </div>
        <div className="flex items-center justify-center my-2">
            <div className="flex flex-col items-center">
                <div className="flex items-center font-medium">
                    4.7/5<span><AiOutlineStar className="ml-1 text-amber-300 "/></span>
                </div>
                <div className="text-xs text-gray-300">5.3tr+</div>
            </div>
            <div className="w-[1px] h-[12px] bg-gray-300 mx-4"></div>
            <div className="flex flex-col items-center">
                <div className="flex items-center font-medium">
                    Theo dõi
                </div>
                <div className="text-xs text-gray-300">100k+</div>
            </div>
        </div>
        <div className="flex items-center justify-between gap-2">
            <button className="text-sky-600 flex items-center gap-1 border border-sky-600 px-2 py-1 rounded-md" >
                <AiOutlineShop /> <span>Xem Shop</span>
            </button>
            <button className="text-sky-600 flex items-center gap-1 border border-sky-600 px-2 py-1 rounded-md" >
                <AiOutlinePlus /> <span>Theo dõi</span>
            </button>
        </div>
    </div>
  )
}

export default ShopItem