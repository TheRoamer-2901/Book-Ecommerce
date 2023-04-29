import SideFilter from "../layout/SideFilter"
import ProductItem from "../components/ProductItem"
import { Product as ProductType} from "../types/Product"
import { getFilteredProductQuantity, getProductList, getProductListByFilter, getProductQuantity } from '../lib/axios/product'
import { useAsync } from "../hooks/useAsync"
import { useAppSelector } from "../hooks/hook"
import { getSelectedFilter } from '../redux/slices/filterOptionsSlice'
import AppliedFilterOption from "../components/FilterOption"
import Pagination from '../components/Pagination'
import { useState } from "react"
import { current } from "@reduxjs/toolkit"

let PAGE_ITEM = 12;

const Product = () => { 
  const filterOptions = useAppSelector(state => getSelectedFilter(state.filterOptions))
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {data, loading} = useAsync<ProductType[]>(() => {
    if (filterOptions.length === 0) {
      return getProductList(currentPage)
    } else {
      return getProductListByFilter(filterOptions, currentPage)
    }
    
  }, [JSON.stringify(filterOptions), currentPage])

  const {data: total, loading: maxPageLoading} = useAsync<number>(() => {
    if (filterOptions.length === 0) {
      return getProductQuantity().then(res => {
        return res.count
      })
    } else {
      return getFilteredProductQuantity(filterOptions).then(res => {        
        return res.count
      })
    }
  }, [JSON.stringify(filterOptions)])

  function updatePage(page: number) {
    setCurrentPage(page)
  }
  
  return (
    <div className="flex gap-4">
      <SideFilter />
      <div>
        <AppliedFilterOption />
          {loading ?               <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center"><h1>Loading...</h1></div>
            : <>
              <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
                {
                  data?.map((prod : ProductType, i) => { 
                    return <ProductItem {...prod} key={i} />
                  })
                }
              </div>
              <Pagination currentPage={currentPage} maxPage={Math.ceil(total!/PAGE_ITEM)} updatePage={updatePage}/>
            </>
          }
        </div>
    </div>
  )
}

export default Product