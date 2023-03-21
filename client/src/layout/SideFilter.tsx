import { ImStarFull } from 'react-icons/im'
import { isRangeOption, RangeOption, ListOption, FilterCategory } from '../types/Filter'
import { getSelectedFilter } from '../redux/slices/productOption'
import { filterApplied } from '../redux/slices/productOption'
import { useAppSelector, useAppDispatch } from '../hooks/hook'

const FilterOption = ({title, options, type} : FilterCategory ) => {
    const dispatch = useAppDispatch()
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
                                checked = {op.selected ? true : false}
                                onChange={ () => {
                                    dispatch(filterApplied({title: title, index: i}))
                                }}
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
    const filterInitOptions = useAppSelector(state => state.productOption.filterOptions)
  return (
    <div className='border sticky top-0 py-2 border-gray-400 w-[250px] flex flex-col h-fit rounded-sm'>
        <div className='self-center flex items-center flex-col gap-2'>
            <h4>Phân loại</h4>

        </div>
        {filterInitOptions.map((c , i) => {
            return <FilterOption {...c} key={i}/>}
        )}
    </div>
  )
}



export default SideFilter