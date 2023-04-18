import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import AddProduct from './pages/AddProduct'
import UserProfileNavigation from './pages/UserNavigation'
import Profile from './pages/Profile'
import PurchasedOrder from './pages/PurchasedOrder'
import Checkout from './pages/Checkout'
import EditProfile from './pages/EditProfile'
import PurchasedOrderDetail from './pages/PurchasedOrderDetail'
import ShopProductDetail from './pages/ShopProductDetail'

function App() {

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen gap-2">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/shop/product/:id' element={<ShopProductDetail />} />
        <Route path='/shop/product/:id/edit' element={<EditProduct />} />
        <Route path='/shop/product/create' element={<AddProduct />} />
        <Route path='user' element={<UserProfileNavigation />}>
          <Route path='profile' element={<Profile />} />
          <Route path='profile/edit' element={<EditProfile />} />
          <Route path='purchased-order' element={<PurchasedOrder />} />
          <Route path='purchased-order/:id' element={<PurchasedOrderDetail />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
