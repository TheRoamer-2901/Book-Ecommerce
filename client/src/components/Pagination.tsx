import { FaAngleLeft } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { FaAngleDoubleRight } from 'react-icons/fa'

type pageRange = {
  start: number,
  selected: number,
  end: number,
  setCurrent: (page: number) => void
}

type paginationProps = {
  currentPage: number,
  maxPage: number,
  updatePage: (page: number) => void
}

const PageRange = ({start, selected, end, setCurrent}: pageRange) => {
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return <>
    {pages.map((page, i) => {
      return page === selected 
      ? <div className='w-[24px] h-[24px] font-semibold text-sky-600 border-2 border-sky-600 bg-sky-50 rounded-full flex items-center justify-center cursor-pointer' key={i}>{page}</div>
      : <div className='w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600 flex items-center justify-center font-semibold cursor-pointer' key={i} onClick={() => setCurrent(page)}>{page}</div>

    })
    }
  </>
}

const Pagination = ({currentPage, maxPage, updatePage} : paginationProps) => {
  let start = 0, end = 0;
  
  if(maxPage > 5) {
    start = currentPage - 2 > 0 ? currentPage-2 : 1;
    end = currentPage + 2 <= maxPage ? currentPage + 2 : maxPage;
    if(end- start + 1 < 5 && start <= 2) {
      end = start + 4
    }
    if(end- start + 1 < 5 && end >= maxPage-1) {
      start = end - 4
    }
  } else{
    start = 1
    end = maxPage
  }
  
  return (
    <div className='flex items-center mx-auto py-2 w-fit gap-2'>
        {maxPage > 5 ?
        <>
        <FaAngleDoubleLeft className = {currentPage > 1 
        ? 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600'
        : 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer'
        } 
          onClick={() => {if(currentPage > 1) updatePage(1)}}
        />
        <FaAngleLeft className = {currentPage > 1 
            ? 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600'
            : 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer'
            }
            onClick={() => {if(currentPage > 1) updatePage(currentPage-1)}}
        />
        </>  : null
        }
        <PageRange start={start} end={end} selected={currentPage} setCurrent={updatePage}/>
        {maxPage > 5 ?
        <>
        <FaAngleRight className = {currentPage < maxPage
        ? 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600'
        : 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer'
        }
          onClick={() => {if(currentPage < maxPage) updatePage(currentPage+1)}}

        />
        <FaAngleDoubleRight className = {currentPage < maxPage
        ? 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600'
        : 'w-[24px] h-[24px] border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer'
        } 
          onClick={() => {if(currentPage < maxPage) updatePage(maxPage)}}
        />
        </>  : null
        }

    </div>
  )
}

export default Pagination