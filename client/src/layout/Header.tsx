import { Link } from 'react-router-dom'
import DropDownCart from '../components/DropDownCart';
import AuthenFormControl from '../components/AuthenFormControl';
import SearchBar from '../components/SearchBar';

const Header = () => {
  return (
    <div className='px-[100px] py-[20px] w-full flex items-center justify-between shadow-sm shadow-slate-300'>
        <ul className='w-1/3 flex items-center gap-3'>
            <li className='font-semibold text-sky-400 hover:underline'><Link to='/'>Trang chủ</Link></li>
            <li className='font-semibold text-sky-400 hover:underline'><Link to='/product'>Sách</Link></li>
            <li className='font-semibold text-sky-400 hover:underline'><Link to='/cart'>Giỏ hàng</Link></li>
        </ul>
        <SearchBar />
        <div className='flex items-center gap-3'>
          <AuthenFormControl />
          <div>
            <DropDownCart />
          </div>
        </div>
    </div>
  )
}

export default Header