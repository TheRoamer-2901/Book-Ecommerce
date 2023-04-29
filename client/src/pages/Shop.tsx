import { useState } from 'react'
import { useAsync } from "../hooks/useAsync"
import { 
  getShopProductList, 
  getShopProductListByFilter, 
  getShopProductQuantity, 
  getFilteredShopProductQuantity } from "../lib/axios/product"
import { Product as ProductType } from "../types/Product"
import { AiOutlinePlus } from 'react-icons/ai'
import SideFilter from '../layout/SideFilter'
import AppliedFilterOption from '../components/FilterOption'
import ShopProductItem from "../components/ShopProductItem"
import Pagination from '../components/Pagination'
import { getSelectedFilter } from "../redux/slices/filterOptionsSlice"
import { useAppSelector } from "../hooks/hook"
import { useNavigate } from "react-router-dom"

const PAGE_ITEM = 12

const Shop = () => {
  const authUser = useAppSelector(state => state.user.authUser)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const filterOptions = useAppSelector(state => getSelectedFilter(state.filterOptions))
  const {data : products, loading} = useAsync<ProductType[]>(() => {
    if (filterOptions.length === 0) {
      return getShopProductList(authUser?.token, currentPage)
    } else {
      return getShopProductListByFilter(filterOptions, authUser?.token, currentPage)
    }
    
  }, [JSON.stringify(filterOptions), authUser, currentPage])

  const {data: total, loading: maxPageLoading} = useAsync<number>(() => {
    if (filterOptions.length === 0) {
      return getShopProductQuantity(authUser.token).then(res => {
        return res.count
      })
    } else {
      return getFilteredShopProductQuantity(filterOptions, authUser.token).then(res => {        
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
        <div className="flex justify-between w-full mb-3">
          <AppliedFilterOption />
          <button className="border h-fit border-emerald-500 text-emerald-500 hover:bg-emerald-50 flex items-center  rounded-sm px-1 py-1" onClick={() => {navigate('/shop/product/create')}}>
            <AiOutlinePlus/>
            <p className="font-semibold">Thêm sản phẩm</p>
          </button>
        </div>
        {loading ? <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center"><h1>Loading...</h1></div>
            : <>
              <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
                {
                  products?.map((prod : ProductType, i) => { 
                    return <ShopProductItem {...prod} key={i} />
                  })
                }
              </div>
              {!maxPageLoading && <Pagination currentPage={currentPage} maxPage={Math.ceil(total!/PAGE_ITEM)} updatePage={updatePage}/>}
            </>
          }
      </div>
    </div>  )
}

export default Shop