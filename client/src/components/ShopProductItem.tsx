import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Product as productProps} from "../types/Product";
import { useNavigate } from "react-router-dom";


const ShopProductItem = ({id, name, author, img, price, discountRate} : productProps) => {
  const navigate = useNavigate()
  return (
      <div className="relative max-w-[280px] h-[400px] border border-gray-400 rounded-sm">
        <div className="absolute bottom-[10px] right-[10px] z-30 flex items-center gap-1">
            <button className="w-5 h-5 text-amber-300 border border-amber-300 rounded-sm flex items-center justify-center">
                <AiFillEdit onClick={() => navigate(`/shop/product/${id}/edit`)}/>
            </button>
            <button className="w-5 h-5 text-red-500 border border-red-500 rounded-sm flex items-center justify-center">
                <BsFillTrashFill />
            </button>
        </div>
        <img 
          className="w-full h-[250px] object-cover"
          src={img}
        />
        <div className="px-[15px] py-[10px]">
            <Link to={`/shop/product/${id}`}>
                <h4 className="font-semibold text-sm  cursor-pointer hover:underline">
                    {name.length > 80 ? `${name.slice(0, 80)}...`: name}
                </h4>
            </Link>
          <p className="font-medium text-sm text-slate-300">{author}</p>
          <div className="flex">
            <AiOutlineStar className="text-amber-300"/>
            <AiOutlineStar className="text-amber-300"/>
            <AiOutlineStar className="text-amber-300"/>
            <AiOutlineStar className="text-amber-300"/>
            <AiOutlineStar className="text-amber-300"/>
          </div>
          <div>
              <span className="text-sm font-semibold">{Math.ceil(price*(1-discountRate/100))}</span>
              <span className="text-sm font-semibold text-red-600 ml-2">
                {`-${discountRate}%`}
              </span>
            </div>
        </div>
      </div>
  )
}

export default ShopProductItem