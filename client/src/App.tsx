import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
function App() {

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
