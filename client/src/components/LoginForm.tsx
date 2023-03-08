import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'



const LoginForm = () => {
    return (
        <form className="flex flex-col gap-3">
            <label 
                className="text-sm text-sky-600 font-medium"
                htmlFor="username"
            >
                Tài khoản
            </label>         
            <input type="text" id="username"/>
            <label 
            className="text-sm text-sky-600 font-medium"
            htmlFor="password"
            >
                Mật khẩu
            </label>         
            <input type="password" id="password"/>
            <div className='h-[2px] w-2/3 bg-gray-300 self-center'></div>
            <span className='self-center text-sm font-medium text-gray-400'>Hoặc đăng nhập bằng</span>
            <div className='flex items-center self-center'>
                <BsFacebook className='w-[40px] aspect-square rounded-full'/>
                <FcGoogle className='w-[40px] aspect-square rounded-full'/>
            </div>
            <button 
            className="w-full h-fit py-2 border rounded-sm bg-white border-sky-600 text-sky-600 font-semibold text-sm"
            type="submit">
                Đăng nhập
            </button>
        </form>
    )
}

export default LoginForm