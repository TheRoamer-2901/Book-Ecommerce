import { useState } from 'react'
import { ImStarFull } from 'react-icons/im'
import { isRangeOption, RangeOption, ListOption, FilterCategory } from '../types/Filter'
import { categories } from '../assets/fitlerCategories'

const FilterOption = ({title, options, type} : FilterCategory ) => {
    const [ selected, setSelected ] = useState<number[]>([])
    function handleSelect(i : number) {
        if(type === 'SINGLE_SELECT') {
            setSelected(prevSelected => {
                return prevSelected.includes(i) ? [] : [i]
            })
        } 
        else if(type === 'MULTI_SELECT') {
            setSelected(prevSelected => {
                return prevSelected.includes(i) 
                    ? prevSelected.filter(s => s !==i)
                    : [i, ...prevSelected]
            })
        } 
    }
    return (
        <div className='mb-1 px-2 py-1'>
            <p className='font-semibold text-base'>{title}</p>
            <ul>
                {options.map((op, i) => {
                    return(
                        <li className='list-none flex items-center' key={i}>
                            <input 
                                className='w-[20px] h-[20px] border border-sky-600 rounded-md mr-2 focus:outline-none' 
                                type='checkbox'
                                checked = {selected.includes(i) ? true : false}
                                onClick={() => {handleSelect(i)}}
                            />
                            {title !== 'Đánh giá'
                                ? <span>{isRangeOption(op) ? op.description : op.value}</span>
                                : 
                                <span className='flex items-center'>
                                    {isRangeOption(op) && op.description} <ImStarFull className='ml-1 text-amber-200'/>
                                </span>
                            }
                        </li>
                    )
                })}
            </ul>
        </div>            
    )
}

const SideFilter = () => {
  return (
    <div className='border sticky top-0 py-2 border-gray-400 w-[250px] flex flex-col h-fit rounded-sm'>
        <div className='self-center flex items-center flex-col gap-2'>
            <h4>Phân loại</h4>
            <button className='border px-1 py-1 border-sky-600 text-sky-600 font-semibold hover'>
                Áp dụng
            </button>

        </div>
        {categories.map((c , i) => {
            return <FilterOption {...c} key={i}/>}
        )}
    </div>
  )
}




export default SideFilter