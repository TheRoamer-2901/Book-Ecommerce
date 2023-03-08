import { ImStarFull } from 'react-icons/im'

type FilterCategory = {
    title: string,
    options: string[] | number[],
    type?: 'single' | 'multi'
}

const categories : FilterCategory[] = [
    {
        title: "Price",
        options: ["Dưới 100k", "100k-500k", "500k-1000k", "Trên 1000k"]
    },
    {
        title: "Rating",
        options: ["From 3", "From 4", "From 5",]
    },
    {
        title: "Genre",
        options: ["Drama", "Fantasy", "Sci-fi", "Adventure", "Light novel", "Romance", "Comedy"]
    }
]

const FilterOption = ({title, options} : FilterCategory ) => {
    return (
        <div className='mb-1 px-2 py-1'>
            <p className='font-semibold text-base'>{title}</p>
            <ul>
                {options.map((op, i) => {
                    return(
                        <li className='list-none flex items-center' key={i}>
                            <input 
                                className='w-[20px] h-[20px] border border-sky-600 rounded-md mr-2 focus:outline-none' 
                                type='checkBox'
                            />
                            {title !== 'Rating' 
                                ? <span>{op}</span>
                                : 
                                <span className='flex items-center'>
                                    {op} <ImStarFull className='ml-1 text-amber-200'/>
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
    <div className='border sticky top-0 border-gray-400 w-[250px] h-fit rounded-sm'>
        {categories.map((c, i) => <FilterOption {...c} key={i}/>)}
    </div>
  )
}




export default SideFilter