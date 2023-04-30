import { useState } from "react"
import { FormActiveState } from "../types/Form"
import { useAppSelector } from "../hooks/hook"
import Button from "./Button"
import LoginButton from "./LoginButton"
import FormControl from './FormControl'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm" 
import UserControl from "./UserControl"

const AuthenFormControl = () => {
  const user = useAppSelector(state => state.user.authUser)
  const [open, setOpen] = useState<boolean>(false)
  const [active, setActive] = useState<FormActiveState>("LOGIN")
  function setFormActive(newActiveState : FormActiveState) {
    setActive(newActiveState)
  }
  function toggleOpen() {
    setOpen(prev => !prev)
  }
  
  return (
    <div className="relative">
      {user.name === ""
      ? <LoginButton content="Đăng nhập" onCLickFunc={toggleOpen}/>
      : <Button img={user?.img} content={user.name} onCLickFunc={toggleOpen}/>
      }

      {open && !user.name &&
        <div 
          className="absolute right[100px] rounded-md bg-gray-100 px-3 py-3 top-[150px] right-[150px] z-30  w-[400px] h-[380px]"
        >
          <FormControl active={active} setFormActive={setFormActive} toggleForm={toggleOpen}/>
          <div className="font-bold text-lg text-sky-600">
            {active === 'LOGIN' ? "Đăng nhập" : "Tạo tài khoản mới"}
          </div>
          { 
            active === "LOGIN" 
            ? <LoginForm toggleOpen={toggleOpen}/>
            : <SignupForm />
          }

        </div>
      }
      {open && user.name && <UserControl toggleOpen={toggleOpen}/>}
    </div>
  )
}

export default AuthenFormControl