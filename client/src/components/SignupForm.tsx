import React from 'react'

const SignupForm = () => {
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
            <input type="password" id="confirm-password"/>
            <label 
                className="text-sm text-sky-600 font-medium"
                htmlFor="password"
            >
                Xác nhận mật khẩu
            </label>         
            <input type="password" id="confirm-password"/>

            <button 
            className="w-full h-fit py-2 border rounded-sm bg-white border-sky-600 text-sky-600 font-semibold text-sm"
            type="submit">
                Đăng ký
            </button>
        </form>
    )  
}

export default SignupForm