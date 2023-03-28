import { useAsync } from "../hooks/useAsync"
import { getProductList } from "../lib/axios/product"
import { useParams } from "react-router-dom"
import { Product as productProps } from "../types/Product"
import SideFilter from '../layout/SideFilter'
import AppliedFilterOption from '../components/FilterOption'
import ShopProductItem from "../components/ShopProductItem"
import { useAppSelector } from "../hooks/hook"

const Shop = () => {
  const {id : sellerId}  = useParams<string>()
  const authUser = useAppSelector(state => state.user.authUser)
  const {data : products, loading} = useAsync(() => {
    return getProductList(authUser?.id, authUser?.token)
  }, [authUser])

  return (
    <div className="flex gap-4">
      <SideFilter />
      <div>
        <AppliedFilterOption />
        <div className="w-full max-w-[1300px] grid grid-cols-fill gap-3.5 justify-self-center">
          {loading ? <h1>Loading...</h1>: products?.map((prod : productProps, i) => { 
            return <ShopProductItem {...prod} key={i} />
          })}
        </div>
      </div>
    </div>  )
}

export default Shop