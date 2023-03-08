import ProductItemDetail from "../components/ProductItemDetail";
import ShopItem from "../components/ShopItem";


const ProductDetail = () => {
  return (
    <div className="my-[20px] flex gap-6">
        <ProductItemDetail />
        <ShopItem />
    </div>
  )
}

export default ProductDetail