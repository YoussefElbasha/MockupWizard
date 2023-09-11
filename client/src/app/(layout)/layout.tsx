'use client'
import Navbar from '../components/navbar-components/Navbar'
import api from '../../../util/Axios'
import useSWR from 'swr'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathName = usePathname()
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
  const { data, isValidating } = useSWR('user-info', fetchUserInfo, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  useEffect(() => {
    if (data && (pathName === '/sign-in' || pathName === '/signup')) {
      router.replace('/dashboard')
    }
  }, [data, pathName, router])

  return (
    <>
      <Navbar
        user={data}
        isLoading={isValidating}
        navLinks={[
          { href: '/dashboard', name: 'Dashboard' },
          { href: '/', name: 'Home' },
          { href: '/account', name: 'Account' },
        ]}
      />
      {children}
    </>
  )
}
