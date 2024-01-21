'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='h-[500px] w-full flex items-center justify-center flex-col'>
      <h2 className='text-3xl font-bold'>Something went wrong!!</h2>
      <button
      className='bg-slate-500 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}