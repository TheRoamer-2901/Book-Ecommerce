import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/hook'
import { userLoggedOut } from '../redux/slices/userSlice'
import { logUserOut } from '../lib/axios/user'

type controlProps = {
  toggleOpen: () => void
}

const UserControl = ({toggleOpen} : controlProps) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(state => state.user.authUser)


  return (
    <ul className={`absolute top-[40px] right-0 bg-red-200] w-[120px]
      list-none font-semibold border rounded-sm border-sky-600 text-sky-600 hover:bg-slate-200}`}
      onClick={toggleOpen}
    >
      <li className="bg-white px-2 py-1 hover:bg-slate-200 text-center">
        <Link to='/user/profile'>
          Tài khoản
        </Link>
      </li>
      <li 
      className='text-red-500 px-2 py-1 cursor-pointer flex items-center gap-1 bg-white hover:bg-slate-200 text-center'
        onClick={async (e) => {
          await(logUserOut(authUser!.id))
          .then(() => {
            dispatch(userLoggedOut())
          })
        }}
      >
        <span>
          Đăng xuất
        </span>
        <FiLogOut />
      </li>
    </ul>
  )
}

export default UserControl