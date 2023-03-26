import { useAppSelector } from "../hooks/hook"
import { mailMsg, sendMail } from '../lib/sendgrid/send'

const EditProfile = () => {
    const authUser = useAppSelector(state => state.user.authUser)
    async function updateUserProfile(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let OTP : number = 123456
        let mailContent : mailMsg = {
            to: "dangkhoa29012002@gmail.com", // Change to your recipient
            from: "dangkhoa29012002@gmail.com", // Change to your verified sender
            subject: "Thay đổi thông tin tài khoản",
            text: "123",
            html: `<h1>Your OTP is ${OTP}</h1>`
        }
        const mailRes = await sendMail(mailContent)
        console.log(mailRes);       
    }

     return (
        <div>
            <h4 className='mb-3'>Chỉnh sửa thông tin tài khoản</h4>
            <form onSubmit={(e) => updateUserProfile(e)}>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-name'>
                        Tên tài khoản
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500'
                        id="user-name"
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='password'>
                        Mật khẩu
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500'
                        id="password"
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-name'>
                        Xác nhận mật khẩu
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500'
                        id="password"
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-name'>
                        Email
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500'
                        id="password"
                    />
                </div>
                <div className='relative border border-sky-600 px-2 py-2 rounded-md'>
                    <label className="absolute -top-[13px] text-sky-600 bg-white px-1 font-semibold z-20" htmlFor='user-name'>
                        Số điện thoại
                    </label>
                    <input 
                        className='focus:outline-none font-normal text-gray-500'
                        id="password"
                    />
                </div>
                
                <button
                    className="px-2 py-1 mt-2 text-white font-semibold bg-amber-300 border hover:opacity-90 border-amber-500 rounded-sm flex items-center justify-center"
                >
                    Xác nhận
                </button>
            </form>
        </div>
    )
}

export default EditProfile