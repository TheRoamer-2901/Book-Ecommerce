import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector, useAppDispatch } from '../hooks/hook';
import { searchOptionSelected } from '../redux/slices/productOption'


const SearchBar = () => {
    const dispatch = useAppDispatch()
    const searchOption = useAppSelector(state => state.productOption.searchOption.option) 
    const [open, setOpen] = useState(false)


    return (
        <div className='flex py-0 items-center border border-gray-300 rounded-md w-fit h-fit'>
            <AiOutlineSearch className='px-1 w-[30px] h-[30px] text-base border-r border-gray-300 hover:bg-gray-200'/>
            <input 
                className='pl-3 text-sm outline-none w-[250px] h-[30px]'
                type='text' 
                placeholder={`Tìm theo ${searchOption == 'AUTHOR' ? "Tác giả" : "tên sản phẩm"}...`}
            />
            <div 
                onClick={() => setOpen(prev => !prev)}
                className='relative px-1 py-1 h-[30px] flex items-center cursor-pointer border-l hover:bg-gray-200 border-gray-300'
            >
                <span className='text-sm font-semibold w-[70px]'>
                    {searchOption.toString() == 'AUTHOR' ? "Tác giả" : "Sản phẩm"}
                </span>
                <IoIosArrowDown className='ml-1 translate-y-[2.5px]'/>
                {open ? 
                <ul className='absolute top-[40px] right-0 rounded-sm bg-slate-50  border border-slate-30 list-none'>
                    <li 
                        onClick={(e) => dispatch(searchOptionSelected('PRODUCT'))}
                        className='hover:bg-slate-200 px-2 py-1'
                    >  
                        Sản phẩm
                    </li>   
                    <li 
                        onClick={(e) => dispatch(searchOptionSelected('AUTHOR'))}
                        className='hover:bg-slate-200 px-2 py-1'
                    >
                        Tác giả
                    </li>
                </ul> : null
                }
            </div>
        </div>
  )
}

export default SearchBar