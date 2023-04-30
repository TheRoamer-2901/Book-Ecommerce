import { RxAvatar } from "react-icons/rx"
type buttonProps = {
    img?: string,
    content: string,
    onCLickFunc: () => any
}

const Button = ({img, content, onCLickFunc} : buttonProps) => {
  
  return (
    <button
        onClick={() => {onCLickFunc()}} 
        className='gap-1 px-3 py-1 font-semibold border rounded-sm border-sky-600 text-sky-600 hover:bg-slate-200 flex items-center'
    >  
        {img ?
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            <img src={img} className="w-full h-full object-cover"/>
          </div>
        : <RxAvatar className='w-[22px] h-[22px]'/>}

        <p>{content}</p>
    </button>
  )
}

  
export default Button