import { FormActiveState } from '../types/Form'
import { AiOutlineClose } from 'react-icons/ai'

type formStateProps = {
    active: FormActiveState
    setFormActive: (activeState: FormActiveState) => void
    toggleForm: () => void
}

const FormControl = ({active, setFormActive, toggleForm} : formStateProps) => {
  return (
    <div className="relative flex items-center gap-3">
        <AiOutlineClose 
            onClick={() => {toggleForm()}}
            className={`absolute mx-1 w-[17px] h-[17px] 
            text-center right-0 top-0 cursor-pointer text-red-500 rounded-full hover:bg-gray-300`}
        />
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