import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { Product as productProps} from "../types/Product";


const ProductItem = ({id, name, author, img, price, discountRate} : productProps) => {
  
  return (
    <Link to={`/product/${id}`}>
      <div className="max-w-[280px] h-[400px] border border-gray-400 rounded-sm	cursor-pointer">
        <img 
          className="w-full h-[250px] object-cover"
          src={img}
        />
        <div className="px-[15px] py-[10px]">
          <h4 className="font-semibold text-sm">{name.length > 80 ? `${name.slice(0, 80)}...`: name}</h4>
          <p className="font-medium text-sm text-slate-300">{author}</p>
          <div className="flex">
            <AiFillStar className="text-amber-300"/>
            <AiFillStar className="text-amber-300"/>
            <AiFillStar className="text-amber-300"/>
            <AiFillStar className="text-amber-300"/>
            <AiFillStar className="text-amber-300"/>
          </div>
          <div>
              <span className="text-sm font-semibold">{Math.ceil(price*(1-discountRate/100))}</span>
              <span className="text-sm font-semibold text-red-600 ml-2">
                {`-${discountRate}%`}
              </span>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem