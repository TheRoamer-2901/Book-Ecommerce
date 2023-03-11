import { useState, useEffect, ReactNode } from "react"
import SideFilter from "../layout/SideFilter"
import ProductItem from "../components/ProductItem"
import { Product as productProps } from "../types/Product"
import AppliedFilterOption from "../components/FilterOption"

const Product = () => { 
  const [productList, setProductlist] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/product')
    .then(res => res.json())
    .then(data => setProductlist(data))
  }, [])
  return (
    <div className="flex gap-4 mt-[30px]">
      <SideFilter />
      <div>
        <AppliedFilterOption />
        <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
          {productList?.map((prod : productProps, i) => { 
            return <ProductItem {...prod} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Product