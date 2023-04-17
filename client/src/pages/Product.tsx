import SideFilter from "../layout/SideFilter"
import ProductItem from "../components/ProductItem"
import { Product as ProductType} from "../types/Product"
import { getProductList, getProductListByFilter } from '../lib/axios/product'
import { useAsync } from "../hooks/useAsync"
import { useAppSelector } from "../hooks/hook"
import { getSelectedFilter } from '../redux/slices/filterOptionsSlice'
import AppliedFilterOption from "../components/FilterOption"

const Product = () => { 
  const filterOptions = useAppSelector(state => getSelectedFilter(state.filterOptions))
  const {data, loading} = useAsync<ProductType[]>(() => {
    if (filterOptions.length === 0) {
      return getProductList()
    } else {
      return getProductListByFilter(filterOptions)
    }
    
  }, [JSON.stringify(filterOptions)])
   
  
  return (
    <div className="flex gap-4">
      <SideFilter />
      <div>
        <AppliedFilterOption />
        <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
          {loading ? <h1>Loading...</h1>: 
            data?.map((prod : ProductType, i) => { 
            return <ProductItem {...prod} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Product