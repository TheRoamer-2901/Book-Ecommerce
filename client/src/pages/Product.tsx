import SideFilter from "../layout/SideFilter"
import ProductItem from "../components/ProductItem"
import { Product as productProps } from "../types/Product"
import { getProductList, getProductListByFilter } from '../lib/axios/product'
import { useAsync } from "../hooks/useAsync"
import AppliedFilterOption from "../components/FilterOption"

const Product = () => { 
  
  const {data, loading} = useAsync(() => {
      return getProductList()

  }, [])
  
    
  
  return (
    <div className="flex gap-4">
      <SideFilter />
      <div>
        <AppliedFilterOption />
        <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
          {loading ? <h1>Loading...</h1>: data?.map((prod : productProps, i) => { 
            return <ProductItem {...prod} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Product