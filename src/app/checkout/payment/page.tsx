'use client'
import { completeCheckout } from '@/redux/slices/cartSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSolidTruck } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

function Page() {
    const router = useRouter()
    const dispatch = useDispatch()
    const handlePayment = () => {
        dispatch(completeCheckout())
        return router.push('/checkout/confirmation')
    }
  return (
    <div className='h-[400px] w-full max-w-[700px] mx-auto flex flex-col gap-6 justify-center items-center'>
        <h1 className='text-xl font-bold'>Choose Payment Method:</h1>
        <button
        onClick={handlePayment}
        className='flex items-center gap-6 justify-center w-full bg-button hover:bg-accent py-3 w-ful text-white rounded-lg '> <BiSolidTruck size={20} />  CASH ON DELIVERY</button>
    </div>
  )
}

export default Page