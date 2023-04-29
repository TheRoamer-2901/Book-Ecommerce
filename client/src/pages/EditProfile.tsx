import { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../hooks/hook"
import { IoArrowBackOutline } from 'react-icons/io5'
import { mailMsg, sendMail } from '../lib/sendgrid/send'
import { updateUserProfile } from '../lib/axios/user'
import { userProfileUpdated } from '../redux/slices/userSlice'
import { useNavigate } from "react-router-dom"
import OTPCountDown from '../components/OTPCountDown'

const EditProfile = () => {
    const [ duration, setDuration ] = useState<number>(-1)
    const authUser = useAppSelector(state => state.user.authUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const nameRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const OTPRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        nameRef.current!.value = authUser.name
        linkRef.current!.value = authUser.img
        imageRef.current!.src = authUser.img
        emailRef.current!.value = authUser.email
        phoneRef.current!.value  = authUser.phone
    }, [authUser])

    async function handleUpdate(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(passwordRef.current!.value !== confirmRef.current!.value) {
            alert("Mật khẩu không trùng khớp")
            return
        }
        
        await updateUserProfile(authUser.token, {
            name: nameRef.current!.value,
            img : linkRef.current!.value,
            password: passwordRef.current!.value,
            email: emailRef.current!.value,
            phone: phoneRef.current!.value

        }).then(profile => {
            dispatch(userProfileUpdated({updatedProfile: profile}))
            alert("Cập nhật thông tin cá nhân thành công!")
            navigate('/user')
        })
     
    }

     return (
        <div className="mx-5 my-2 relative pl-7 flex items-center">
            <IoArrowBackOutline 
                onClick={() => {navigate('/user/profile')}}
                className="absolute top-[5px] left-0 text-gray-300 hover:text-sky-600 cursor-pointer w-[25px] h-[20px]"
            />
            <form onSubmit={(e) => handleUpdate(e)} className="flex flex-col gap-4 w-full max-w-[500px] min-w-[350px]">
                <h4 className='mb-3 font-semibold text-lg text-sky-600 self-center  '>Chỉnh sửa thông tin tài khoản</h4>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-name'>
                        Tên tài khoản
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="user-name"
                        ref={nameRef}
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-avatar'>
                        Link ảnh đại diện
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="user-avatar"
                        onChange={(e) => {imageRef.current!.src = e.target.value}}
                        ref={linkRef}
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='password'>
                        Mật khẩu
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="password"
                        type="password"
                        ref={passwordRef}
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='confirm-password'>
                        Xác nhận mật khẩu
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="confirm-password"
                        type="password"
                        ref={confirmRef}
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='email'>
                        Email
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="email"
                        type="email"
                        ref={emailRef}
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='phone-number'>
                        Số điện thoại
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500 w-full'
                        id="phone-number"
                        ref={phoneRef}
                    />
                </div>
                {duration < 0
                ? <button
                    type="button"
                    onClick={() => {setDuration(180)}}
                className="self-center px-2 py-1 mt-2 w-fit text-sky-600 font-semibold border hover:bg-sky-50 border-sky-600 rounded-sm flex items-center justify-center"   
                >
                    Gửi yêu cầu
                </button>
                :
                <div>
                    <p className='mb-3 text-sm font-medium text-emerald-500 italic'>
                        Mã OTP đã được gửi qua email của bạn!
                        <br /> 
                        Vui lòng nhập trong thời gian quy định để cập nhật thông tin!
                        <br />
                        <span className='text-red-600'>Tính năng đang trong quá trình hoàn thiện, để kiểm tra sự cập nhật, hãy ấn tiếp tục mà không cần nhập mã OTP</span>
                    </p>
                    <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                        <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='phone-number'>
                            OTP
                        </label>
                        <input 
                            className='focus:outline-none font-normal text-gray-500 w-full'
                            id="phone-number"
                            ref={OTPRef}
                        />
                    </div>
                    <button
                        type = "submit"
                        className="self-center px-2 py-1 mt-2 w-fit text-amber-300 font-semibold border hover:bg-amber-50 border-amber-300 rounded-sm flex items-center justify-center"
                    >
                        Xác nhận
                    </button>
                </div>}
                {duration >= 0 &&    <OTPCountDown remainingTime={duration} countDown={() => {setDuration(prev => prev-1)}}/>         
}

                
            </form>
            <div className="ml-5 " >
                <p className="font-semibold text-sky-600 italic">Ảnh đại diện: </p>
                <div className="w-[350px] h-[350px] border border-sky-600 rounded-md">
                    <img className="object-cover w-full h-full" ref={imageRef} />
                </div>
            </div>
        </div>
    )
}

export default EditProfile