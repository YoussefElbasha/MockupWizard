'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar-components/Navbar'
import api from '../../util/Axios'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type UserInfo = {
  email: string
  username: string
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathName = usePathname()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const fetchUserInfo = async () => {
    try {
      const response = await api.get('http://api.app.localhost:4000/api/me')
      return response.data
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
  const { data, error, isLoading } = useSWR('user-info', fetchUserInfo)
  useEffect(() => {
    if (data) {
      setUserInfo(data)
      if (userInfo && (pathName === '/sign-in' || pathName === '/signup')) {
        router.replace('/')
      }
    }
  }, [data, pathName])
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative bg-background flex flex-col min-h-screen text-white">
          <Navbar
            user={userInfo!}
            isLoading={isLoading}
            navLinks={[
              { href: '/dashboard', name: 'Dashboard' },
              { href: '/', name: 'Home' },
              { href: '/account', name: 'Account' },
            ]}
          />
          {children}
        </div>
      </body>
    </html>
  )
}
