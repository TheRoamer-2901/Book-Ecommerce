import {RxAvatar} from 'react-icons/rx'

type buttonProps = {
    content: string,
    onCLickFunc: () => any
}

const LoginButton = ({content, onCLickFunc} : buttonProps) => {
  return (
        <button
            onClick={() => {onCLickFunc()}} 
            className='gap-1 px-3 py-1 font-semibold border rounded-sm border-sky-600 text-sky-600 hover:bg-slate-200 flex items-center'
        >  
            <RxAvatar className='w-[25px] h-[25px]'/>

    
            <p>{content}</p>
        </button>

)}

export default LoginButton