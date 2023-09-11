'use client'
import useSWR from 'swr'
import api from '../../../../util/Axios'
import ProfilePicture from './picture'
import Username from './username'

const Account = () => {
  const fetchUserInfo = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/me`
      )
      return response.data
    } catch (e) {
      return null
    }
  }
  const { data, mutate } = useSWR('user-info', fetchUserInfo, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (!data) return null

  return (
    <div className="container flex flex-col w-full gap-10 px-2 py-10 mx-auto md:px-28">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Account</h1>
        <p className="text-sm text-white/60">Manage your account.</p>
      </div>
      <ProfilePicture data={data} mutate={mutate} />
      <Username data={data} mutate={mutate} />
    </div>
  )
}

export default Account
