import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector, useAppDispatch } from '../hooks/hook';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { getProductByName } from '../lib/axios/product';

type SearchResultItem = {
    id: string
    name: string,
    author: string
}

type SearchOption = "AUTHOR" | "PRODUCT"

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchOption, setSearchOption] = useState<SearchOption>("PRODUCT")
    const [open, setOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(true)
    const [searchResult, setSearchResult] = useState<SearchResultItem[]>([])
    const [searchValue, setSearchValue] = useState<string>("")
    
    function navigateToPage(item: SearchResultItem) {
        if(item.name) {     
            setSearchValue(item.name)       
            navigate(`/product/${item.id}`)
        } else{
            setSearchValue(item.author)
            navigate(`/author/${item.author}`)
        }
        setSearchOpen(false)
    }

    useDebounce(async () => {
        if(searchValue.trim()){
            const data = await getProductByName(searchValue.trim())                        
            setSearchResult(data)
        } else{
            setSearchResult([])
        }
    }, 500, [searchValue])
    
    return (
        <div className='relative flex py-0 items-center border border-gray-300 rounded-md w-fit h-fit'>
            <AiOutlineSearch className='px-1 w-[30px] h-[30px] text-base '/>
            <input 
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                    setTimeout(() => setSearchOpen(false), 300)
                }}
                value={searchValue}
                className='pl-3 text-sm outline-none w-[320px] h-[30px]'
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
                <ul className='absolute top-[40px] right-0 rounded-sm bg-slate-50 z-30 border border-slate-30 list-none'>
                    <li 
                        onClick={() => {setSearchOption("PRODUCT")}}
                        className='hover:bg-slate-200 px-2 py-1'
                    >  
                        Sản phẩm
                    </li>   
                    <li 
                        onClick={() => {setSearchOption("AUTHOR")}}
                        className='hover:bg-slate-200 px-2 py-1'
                    >
                        Tác giả
                    </li>
                </ul> : null
                }
            </div>
            {searchResult.length > 0 && searchOpen
            ? <ul className='absolute w-fit rounded-sm border border-gray-200 bg-gray-50 top-[50px] z-20'>
                {searchResult.slice(0, 10).map((item, i) => {
                    return (
                    <li 
                        onMouseUp={() => {navigateToPage(item)}}
                        key={i} 
                        className="px-1 py-1 hover:bg-gray-200 cursor-pointer"
                    >
                        {item.name}
                    </li>)
                })}
            </ul>
            : null}
            
        </div>
  )
}

export default SearchBar