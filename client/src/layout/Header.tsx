import { Link } from 'react-router-dom'
import DropDownCart from '../components/DropDownCart';
import AuthenFormControl from '../components/AuthenFormControl';
import SearchBar from '../components/SearchBar';
import { useAsync } from '../hooks/useAsync'
import { useAppDispatch } from '../hooks/hook';
import { userLoggedOut, userTokenRenewed } from '../redux/slices/userSlice';
import { getUserByAccessToken, renewUserAccessToken } from '../lib/axios/user'
import { getAuthUser } from '../redux/slices/userSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const authUser = getAuthUser()
  useAsync(() => {
    
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
  return (
    <div className='px-[100px] py-[20px] w-full flex items-center justify-between shadow-sm shadow-slate-300'>
        <ul className='w-1/3 flex items-center gap-3'>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/'>Trang chủ</Link></li>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/product'>Sách</Link></li>
            <li className='font-semibold text-sky-600 hover:underline'><Link to='/cart'>Giỏ hàng</Link></li>
            {authUser?.role.includes('Seller') 
            ? <li className='font-semibold text-sky-600 hover:underline'><Link to={`/shop/${authUser.id}`}>Shop của tôi</Link></li>
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