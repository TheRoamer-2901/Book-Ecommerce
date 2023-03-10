import { useState } from "react"
import { FormActiveState } from "../types/Form"
import FormControl from './FormControl'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm" 

const AuthenFormControl = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [active, setActive] = useState<FormActiveState>("LOGIN")
  function setFormActive(newActiveState : FormActiveState) {
    setActive(newActiveState)
  }
  function toggleForm() {
    setOpen(prev => !prev)
  }
  return (
    <>
      <button
        onClick={() => {toggleForm()}} 
        className='px-3 py-1 font-semibold border rounded-sm border-sky-600 text-sky-600 hover:bg-slate-200'
      >
          Đăng nhập
      </button>
      {open && 
        <div 
          className="absolute right[100px] rounded-md bg-gray-100 px-3 py-3 top-[150px] right-[150px] z-30  w-[400px] h-[380px]"
        >
          <FormControl active={active} setFormActive={setFormActive} toggleForm={toggleForm}/>
          <div className="font-bold text-lg text-sky-600">
            {active === 'LOGIN' ? "Đăng nhập" : "Tạo tài khoản mới"}
          </div>
          { 
            active === "LOGIN" 
            ? <LoginForm />
            : <SignupForm />
          }

        </div>
      }
    </>
  )
}

export default AuthenFormControl