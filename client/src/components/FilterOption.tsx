import { useAppSelector, useAppDispatch } from '../hooks/hook'
import { isRangeOption, isListOption } from '../types/Filter'
import { filterApplied, filterCleared } from '../redux/slices/productOption'
import { AiOutlineClose } from 'react-icons/ai'

type ApplyOption = {
    value: string,
    title: string,
    index: number
}

const AppliedFilterOption = () => {
    const dispatch = useAppDispatch()
    const appliedOptions : ApplyOption[] = useAppSelector(state => {
        const categories = state.productOption.filterOptions
        let options : ApplyOption[] = []
        for(let category of categories) {
            for(let i=0; i < category.options.length; i++) {
                let op = category.options[i]
                let newOption = {
                    value: "",
                    title: category.title,
                    index: i
                }
                if(op.selected && isRangeOption(op)) {
                    newOption.value = op.description

                    if(category.title === 'Đánh giá') {
                        newOption.value += ' sao'
                    }
                    options.push(newOption)

                }
                if(op.selected && isListOption(op)) {
                    newOption.value = op.value
                    options.push(newOption)
                } 
            }
        }
        return options
    })
    return (
        <div className='flex flex-wrap gap-2 mb-4'>
            {appliedOptions.map((op : ApplyOption, i) => {
                return (
                    <button 
                        key={i}
                        className='flex items-center border border-violet-600  text-violet-600 hover:bg-violet-100 rounded-2xl px-2 py-1'
                    >
                        {op.value} 
                        <span className='ml-2 hover:text-red-500'>
                            <AiOutlineClose onClick={() =>{
                                dispatch(filterApplied({title: op.title, index: op.index}))}}
                            />
                        </span>
                    </button>
                )
            })}
            {appliedOptions.length > 0 
                ?<button 
                        onClick={() => dispatch(filterCleared())}
                        className='flex items-center border hover:bg-red-100 border-red-600  text-red-600 rounded-2xl px-2 py-1'
                    >
                        Xóa hết<span className='ml-2'> <AiOutlineClose /></span>
                    </button>
                : null
            }
            
        </div>
    )
}

export default AppliedFilterOption