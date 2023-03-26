
import { useAppSelector } from "../hooks/hook"
import { getUserAccountType } from "../utils/user"
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(state => state.user.authUser)


  return (
    <div className="px-3 py-3">
      <h4 className="font-semibold text-lg text-sky-600 my-1">Thông tin tài khoản</h4>
      <p>
        <span className="font-medium">
          Tên tài khoản: </span>{authUser?.name}
      </p>
      <p>
        <span className="font-medium">
          Email: </span>{authUser?.email ? authUser?.email : <span className="italic text-gray-400">Chưa cập nhật</span>}
      </p>
      <p>
        <span className="font-medium">Số điện thoại: </span>{authUser?.phone  ? authUser.phone : <span className="italic text-gray-400">Chưa cập nhật</span>}
      </p>
      <p>
        <span className="font-medium">Loại tài khoản: </span>{authUser ? getUserAccountType(authUser.role) : ""}
      </p>
      <button 
        onClick={() => {navigate("edit")}}
        className="px-2 py-1 text-amber-300 hover:bg-amber-50 border border-amber-300 rounded-sm flex items-center justify-center"
      >
        Cập nhật<AiFillEdit />
      </button>
    </div>
  )
}

export default Profile