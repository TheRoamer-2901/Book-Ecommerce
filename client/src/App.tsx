import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import UserProfileNavigation from './pages/UserNavigation'
import Profile from './pages/Profile'
import PurchasedOrder from './pages/PurchasedOrder'
import Checkout from './pages/Checkout'
import EditProfile from './pages/EditProfile'
import PurchasedOrderDetail from './pages/PurchasedOrderDetail'
function App() {

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
        <Route path='user' element={<UserProfileNavigation />}>
          <Route path='profile' element={<Profile />} />
          <Route path='profile/edit' element={<EditProfile />} />
          <Route path='purchased-order' element={<PurchasedOrder />} />
          <Route path='purchased-order/:id' element={<PurchasedOrderDetail />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/shop/:id' element={<Shop />} />
      </Routes>
    </div>
  )
}

export default App
