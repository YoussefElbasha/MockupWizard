'use client'
import { useState } from 'react'
import api from '../../../../util/Axios'
import toast from 'react-hot-toast'

const Username = ({ data, mutate }: any) => {
  const [userName, setUserName] = useState(data?.username)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    const prevData = { ...data }

    try {
      setIsLoading(true)
      mutate({ ...data, username: userName }, false)

      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/edit-profile`,
        {
          username: userName,
        }
      )

      mutate(
        { ...data, username: userName },
        {
          revalidate: true,
        }
      )

      toast.success('Username updated.')
    } catch (e) {
      toast.error('Failed to update username.')
      mutate(prevData, false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-white/60">Email</p>
        <p className="text-white">{data?.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm text-white/60">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-1/3 h-full p-3 text-white border rounded focus:outline-none bg-black/20 border-white/10 focus:border-primary"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
      </div>
      <button
        className="px-4 py-2 text-sm text-white rounded bg-primary hover:bg-primary/70 w-fit disabled:bg-gray-300/40"
        disabled={userName === data?.username || isLoading}
        onClick={handleUpdate}>
        {isLoading ? 'Updating...' : 'Update'}
      </button>
    </>
  )
}

export default Username
