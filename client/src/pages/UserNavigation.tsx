import { useEffect } from "react"
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from "../hooks/hook"

const UserProfileNavigation = () => {

  const authUser = useAppSelector(state => state.user.authUser)
  console.log(authUser);
  
  /*
  const navigate = useNavigate()
  useEffect(() => {
    if(!authUser) {
      alert("Bạn không có quyền truy cập vào dữ liệu này! Vui lòng đăng nhập và thử lại")
      navigate('/')
    }
  }, [])
  */
  return (
    <div className='mr-auto y-3 px-2 flex'>
      <ul className='list-none mr-auto ml-[100px] border-r-2 border-sky-600 my-3 px-3 min-w-[100px]'>
        <li className='w-full hover:underline hover:text-sky-600 hover:font-semibold text-slate-500'>
          <Link to='profile'>Tài khoản</Link>
        </li>
        <li className='w-full hover:underline hover:text-sky-600 hover:font-semibold text-slate-500'>
          <Link to='purchased-order'>Đơn hàng</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default UserProfileNavigation