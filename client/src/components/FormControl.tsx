import { FormActiveState } from '../types/Form'

type formStateProps = {
    active: FormActiveState
    setFormActive: (activeState: FormActiveState) => void
}

const FormControl = ({active, setFormActive} : formStateProps) => {
  return (
    <div className="flex items-center gap-3">
        <p className={`relative cursor-pointer ${
                active === "LOGIN" 
                ?   `after:absolute after:h-[2px] after:w-2/3 after:bg-sky-600 after:top-6 after:right-3
                    font-semibold  text-sky-600`
                :   "text-gray-400 font-medium"}`
            }
            onClick={() => {setFormActive("LOGIN")}}
        >
            Đăng nhập
        </p>            
        <p className={`relative cursor-pointer ${
                active === "SIGNUP" 
                ?   `after:absolute after:h-[2px] after:w-2/3 after:bg-sky-600 after:top-6 after:right-3
                    font-semibold  text-sky-600`
                :   "text-gray-400 font-medium"}`
            }
            onClick={() => {setFormActive("SIGNUP")}}
        >
            Đăng ký
        </p>            
    </div>
    )
}

export default FormControl