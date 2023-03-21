import { useRef } from 'react'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { authenticateUser } from '../lib/axios/user'
import { userLoggedIn } from '../redux/slices/userSlice'
import { useAppDispatch } from '../hooks/hook'
import { useNavigate } from 'react-router-dom'

type loginFormProps = {
    toggleOpen : () => void
}

const LoginForm = ({toggleOpen}: loginFormProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(userRef.current != null && passwordRef.current != null) {
            await authenticateUser(userRef.current.value, passwordRef.current.value)
                    .then(res => {
                        dispatch(userLoggedIn(res))
                        toggleOpen()
                        navigate('/product')
                    }) 
                    .catch(err => console.log("Unauthorized!"))
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
            <label 
                className="text-sm text-sky-600 font-medium"
                htmlFor="username"
            >
                Tài khoản
            </label>         
            <input 
                ref={userRef} 
                type="text" 
                id="username" 
                name='username'
                className='text-gray-400 text-sm focus:outline-none py-2 px-2 font-medium'
            />
            <label 
            className="text-sm text-sky-600 font-medium"
            htmlFor="password"
            >
                Mật khẩu
            </label>         
            <input 
                ref={passwordRef} 
                type="password" 
                id="password" 
                name='password'
                className='text-gray-400 text-sm focus:outline-none py-2 px-2 font-medium'
            />
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