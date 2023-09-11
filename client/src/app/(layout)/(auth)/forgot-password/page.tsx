'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../../../../util/Axios'
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendPasswordResetEmail = async () => {
    if (email.length === 0) return toast.error('Email is required')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return toast.error('Invalid email')

    try {
      setIsLoading(true)

      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email,
      })

      router.push(`/forgot-password/success?email=${email}`)
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full max-w-lg gap-10 py-10 mx-auto">
      <h1 className="text-xl font-semibold">Forgot Password</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Enter email"
            type="email"
            className="focus:outline-none p-3 pr-10 w-full h-full bg-white rounded text-xs text-[#667085]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="p-3 text-xs font-semibold text-white transition-colors duration-200 rounded bg-primary hover:bg-primary/70 disabled:bg-gray-300/40"
          disabled={isLoading}
          onClick={handleSendPasswordResetEmail}>
          {isLoading ? 'Sending...' : 'Send Password Reset Email'}
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
