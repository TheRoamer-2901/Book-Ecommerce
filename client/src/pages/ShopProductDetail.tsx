import ShopProductItemDetail from "../components/ShopProductItemDetail";
import ShopItem from "../components/ShopItem";


const ShopProductDetail = () => {
  return (
    <div className="my-[20px] flex gap-6">
        <ShopProductItemDetail />
        <ShopItem />
    </div>
  )
}

export default ShopProductDetail