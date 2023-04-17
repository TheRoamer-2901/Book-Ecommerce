import { useEffect } from 'react'

type otpProps = {
    remainingTime : number
    countDown : () => void
}

const OTPCountDown = ( { remainingTime, countDown } : otpProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            countDown()
        }, 1000)
        return () => {clearTimeout(timeout)}
    }, [remainingTime])
    return (
        <div className='absolute text-red-500 font-semibold right-0 rounded-sm border border-red-500 px-1 py-1'>{
            Math.floor(remainingTime/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:
            {(remainingTime%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
        </div>
    )         
}

export default OTPCountDown