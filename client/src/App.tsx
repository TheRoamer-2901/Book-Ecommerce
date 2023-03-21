import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import Checkout from './pages/Checkout'
function App() {

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/shop/:id' element={<Shop />} />
      </Routes>
    </div>
  )
}

export default App
