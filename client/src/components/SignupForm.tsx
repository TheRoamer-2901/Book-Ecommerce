import { useRef } from 'react'
import { createUser } from '../lib/axios/user'

const SignupForm = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)

    async function handleSignup(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(userRef.current == null || passwordRef.current == null || confirmRef == null) {
            console.log("empty field")
        }
        if(userRef.current && passwordRef.current && confirmRef.current) {
            if(passwordRef.current.value !== confirmRef.current.value) {
                console.log("Password confirmation mismatched! Please try again !!!")
                return;
            }
            const user = await createUser(userRef.current.value, passwordRef.current.value)
            console.log("new user: ", user)

        }
    }
    return (
        <form onSubmit={(e) => {handleSignup(e)}} className="flex flex-col gap-3">
            <label 
                className="text-sm text-sky-600 font-medium"
                htmlFor="username"
            >
                Tài khoản
            </label>         
            <input 
                ref={userRef}
                placeholder='Tên người dùng...'
                type="text" 
                id="username"
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
                placeholder='Mật khẩu...'
                type="password" 
                id="password"
                className='text-gray-400 text-sm focus:outline-none py-2 px-2 font-medium'
            />
            <label 
                className="text-sm text-sky-600 font-medium"
                htmlFor="confirm-password"
            >
                Xác nhận mật khẩu
            </label>         
            <input 
                ref={confirmRef}
                placeholder='Mật khẩu...'
                type="password" 
                id="confirm-password"
                className='text-gray-400 text-sm focus:outline-none py-2 px-2 font-medium'
            />

            <button 
            className="w-full h-fit py-2 border rounded-sm bg-white border-sky-600 text-sky-600 font-semibold text-sm"
            type="submit">
                Đăng ký
            </button>
        </form>
    )  
}

export default SignupForm