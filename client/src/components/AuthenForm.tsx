import { useState } from "react"
import { FormActiveState } from "../types/Form"
import FormControl from './FormControl'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm" 

const AuthenForm = () => {
  const [active, setActive] = useState<FormActiveState>("LOGIN")
  function setFormActive(newActiveState : FormActiveState) {
    setActive(newActiveState)
  }
  return (
    <div 
      className="absolute right[100px] rounded-md bg-gray-100 px-3 py-3 top-[150px] right-[150px] z-30  w-[400px] h-[380px]"
    >
      <FormControl active={active} setFormActive={setFormActive}/>
      <div className="font-bold text-lg text-sky-600">
        {active === 'LOGIN' ? "Đăng nhập" : "Tạo tài khoản mới"}
      </div>
      {
        active === "LOGIN" 
        ? <LoginForm />
        : <SignupForm />
      }
    </div>
  )
}

export default AuthenForm