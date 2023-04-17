import { useEffect } from "react"
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from "../hooks/hook"

const UserProfileNavigation = () => {

  const authUser = useAppSelector(state => state.user.authUser)
  
  const navigate = useNavigate()
  useEffect(() => {
    if(!authUser.name) {
      alert("Bạn không có quyền truy cập vào dữ liệu này! Vui lòng đăng nhập và thử lại")
      navigate('/')
    }
  }, [])
  
  return (
    <div className='mr-auto y-3 px-2 flex'>
      <ul className='list-none mr-auto ml-[100px] border-r-2 border-sky-600 my-3 px-3 min-w-[100px]'>
        <li>
          <NavLink className={({isActive}) => {
            return isActive ? 'text-sky-600 font-semibold' : 'text-slate-500 hover:underline hover:text-sky-600 hover:font-semibold'
          }} to='profile'>
            Tài khoản
          </NavLink>
        </li>
        <li className='w-full hover:underline hover:text-sky-600 hover:font-semibold text-slate-500'>
          <NavLink  className={({isActive}) => {
            return isActive ? 'text-sky-600 font-semibold' : 'text-slate-500 hover:underline hover:text-sky-600 hover:font-semibold'
          }} to='purchased-order'>
            Đơn hàng
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default UserProfileNavigation