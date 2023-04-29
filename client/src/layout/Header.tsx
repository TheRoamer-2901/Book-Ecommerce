import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropDownCart from '../components/DropDownCart';
import AuthenFormControl from '../components/AuthenFormControl';
import SearchBar from '../components/SearchBar';
import { useAsync } from '../hooks/useAsync'
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { userLoggedOut, userTokenRenewed } from '../redux/slices/userSlice';
import { getUserByAccessToken, renewUserAccessToken } from '../lib/axios/user'
import { getAuthUser } from '../redux/slices/userSlice'
import { syncCart } from '../lib/axios/cart';
import { syncCartWithDB } from '../redux/slices/cartSlice';

const Header = () => {
  const dispatch = useAppDispatch()
  const authUser = getAuthUser()
  const cartItems = useAppSelector(state => state.cart.items)
  useAsync<any>(() => {
    
    return getUserByAccessToken(authUser?.token)
            .then(res => console.log(res))
            .catch(errStatus => {
              if(errStatus == 403) {
                return renewUserAccessToken()
                      .then(userWithNewToken => {
                        dispatch(userTokenRenewed(userWithNewToken))
                      })
                
              } else {
                dispatch(userLoggedOut())
              }
            })
  }, [])

  useEffect(() => {
    if(authUser.name !== "") {
      dispatch(syncCartWithDB({
        items: cartItems,
        token: authUser.token
      }))
    }
  }, [JSON.stringify(authUser)])
  return (
    <div className='px-[100px] py-[20px] w-full flex items-center justify-between shadow-sm shadow-slate-300 mb-3'>
        <ul className='w-1/3 flex items-center gap-3'>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/'>Trang chủ</Link></li>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/product'>Sách</Link></li>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/cart'>Giỏ hàng</Link></li>
            {authUser?.role.includes('Seller') 
            ? <li className='font-semibold text-sky-600 hover:underline'><Link to={`/shop`}>Shop của tôi</Link></li>
            : null}
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