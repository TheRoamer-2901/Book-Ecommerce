
type buttonProps = {
    content: string
    onCLickFunc: () => any
}

const Button = ({content, onCLickFunc} : buttonProps) => {
  return (
    <button
        onClick={() => {onCLickFunc()}} 
        className='px-3 py-1 font-semibold border rounded-sm border-sky-600 text-sky-600 hover:bg-slate-200'
    >  
        {content}
    </button>
  )
}

export default Button