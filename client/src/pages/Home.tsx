import React from 'react'
import main from '../assets/main.jpg'
import detective from '../assets/detective.jpg'
import science from '../assets/science.jpg'
import romance from '../assets/romance.jpg'
import adventure from '../assets/adventure.jpg'
import spychology from '../assets/psychology.jpg'
import novel from '../assets/novel.jpg'
import fantasy from '../assets/fantasy.jpg'
import comic from '../assets/comic.jpg'
import { FaShippingFast } from "react-icons/fa"
import { GiReceiveMoney } from "react-icons/gi"
import { MdAddToHomeScreen } from "react-icons/md"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (  
    <div>
      <section className='w-full max-w[1050px]'>
        <h4 className='text-xl font-semibold text-sky-600'>
          <span>Sàn thương mại điện tử</span> <br />
          <span className='translate-x-[20px]'>cho độc giả Việt</span>
        </h4>
        <div className='w-[450px] h-[300px] mx-auto'>
          <img src={main} className='w-full h-full object-contain'/>

        </div>
      </section>
      <h4 className='text-xl font-semibold text-sky-600 mb-5'>
       Thể loại đa dạng
      </h4>
      <div className='grid grid-cols-4 gap-2 max-w-[1050px]'>
        <div className='translate-y-[50px] relative'>
          <img src = {detective} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-white text-white bg-gray-300 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Trinh thám
          </div>
        </div>
        <div className='relative'>
          <img src = {science} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-red-600 text-red-600 bg-red-200 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Khoa học
          </div>
        </div>
        <div className='translate-y-[50px] relative'>
          <img src = {romance} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 order border-pink-600 text-pink-600 bg-pink-200 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Lãng mạn
          </div>
        </div>
        <div className='relative'>
          <img src = {adventure} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-amber-400 text-amber-400 bg-amber-50 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Phiêu lưu
          </div>
        </div>
        <div  className='translate-y-[50px] relative'>
          <img src = {spychology} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-emerald-500 text-emerald-500 bg-emerald-100 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Tâm lý
          </div>
        </div>
        <div className='relative'>
          <img src = {novel} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-gray-400 text-gray-400 bg-gray-100 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Tiểu thuyết
          </div>
        </div>
        <div className='translate-y-[50px]'>
          <img src = {fantasy} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-sky-600 text-sky-600 bg-sky-200 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Giả tưởng
          </div>
        </div>
        <div className='relative'>
          <img src = {comic} className='w-full h-full object-cover'/>
          <div className='absolute top-[10px] left-1/2 -translate-x-1/2 border border-black text-black bg-gray-100 px-2 py-1 rounded-sm font-semibold animate-blink'>
            Truyện tranh
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <button className='mt-[70px] mx-auto w-fit px-2 py-1 text-lg font-semibold text-sky-600 border border-sky-600 hover:bg-sky-100' onClick={() => {navigate('/product')}}>
            Mua ngay
        </button>
      </div>
      <section className='mb-[100px]'>
        <h4 className='text-lg font-semibold text-sky-600 mb-5'>
        Và nhiều tiện ích khác
        </h4>
        <div className='flex items-center gap-10 justify-center'>
          <div className='flex flex-col items-center gap-4'>
            <div className='font-semibold text-xl rounded-full h-[40px] w-[40px] border border-emerald-500 text-emerald-500 flex items-center justify-center'>1</div>
            <div className='border border-emerald-500 px-2 py-2 rounded-md flex items-center gap-5'>
              <FaShippingFast className='w-[50px] h-[50px] text-emerald-500'/>
              <p className="font-semibold text-lg text-emerald-500">Giao hàng nhanh chóng</p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 translate-y-[30px]'>
            <div className='font-semibold text-xl rounded-full h-[40px] w-[40px] border border-yellow-300 text-yellow-300 flex items-center justify-center'>2</div>
            <div className='border border-yellow-300 px-2 py-2 rounded-md flex items-center gap-5 self-end'>
              <GiReceiveMoney className='w-[50px] h-[50px] text-yellow-300'/>
              <p className="font-semibold text-lg text-yellow-300">Ưu đãi hấp dẫn</p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 translate-y-[60px]'>
            <div className='font-semibold text-xl rounded-full h-[40px] w-[40px] border border-violet-600 text-violet-600 flex items-center justify-center'>3</div>
            <div className='border border-violet-600 px-2 py-2 rounded-md flex items-center gap-5'>
              <MdAddToHomeScreen className='w-[50px] h-[50px] text-violet-600'/>
              <p className="font-semibold text-lg text-violet-600">Thao tác dễ dàng</p>
            </div>
          </div>

        </div>
      </section>

    
  
    
    </div>

  
   
  )
}

export default Home