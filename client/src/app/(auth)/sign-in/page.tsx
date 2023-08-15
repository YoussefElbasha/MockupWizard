'use client'

import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import AuthCanvas from '@/app/components/auth-components/AuthCanvas'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Navbar from '@/app/components/auth-components/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import Input from '@/app/components/auth-components/Input'
import Button from '@/app/components/auth-components/Button'
import OauthComponent from '@/app/components/auth-components/OauthComponent'

interface loginData{
  email: string,
  password: string,
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(8).max(32),
})

const page = () => {

  const router = useRouter()
  const [passwordType, setPasswordType] = useState('password')

  const toggleHidePassword = () => {
    setPasswordType( (prev: string) => {
      if(prev === 'password') return 'text'

      return 'password'
    })
  }

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const loginUser = async (url: string, { arg }: { arg: loginData }) => {
    try {
      const response = await axios.post(url, arg)
      return response.data

    }catch(err: any) {
      throw err
    }
  }

  const { data, trigger, isMutating, error } = useSWRMutation('http://localhost:4000/user/login', loginUser)

  const onSubmitHandler = async (userData: loginData) => {
    const loadingPromise = toast.loading('Logging in...');
    try{
      await trigger(userData)
      toast.dismiss(loadingPromise)
      toast.success('Login success.')
      router.push('/')
      
    } catch(err: any) {
      toast.dismiss(loadingPromise)
      toast.error(err.response.data)
    }
    
  }

  return (
    <div className='bg-[#14162E] m-auto min-h-screen flex flex-col items-center justify-center relative'>

      <div className='absolute top-1/8 left-[6%] transform -translate-y-1/4'>
        <div className='w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50' />
      </div>
      <div className='absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4'>
        <div className='w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50' />
      </div>

        <div className='flex flex-grow flex-col items-center justify-center md:flex-row z-10'>
        <div className='p-10 text-white flex-grow justify-center flex flex-col items-start gap-10'>
            <div>
              <h1 className='text-4xl font-bold'>Sign in to design</h1>
              <h1 className='text-4xl font-bold'>you own product</h1>
            </div>
            <div className='font-semibold'>
              <p>
                If you don't have an account
              </p>
              <p>
                you can <span className='text-[#4461F2] hover:text-indigo-500'><a href='/signup'>Register here!</a></span>
              </p>
            </div>
          </div>
          <AuthCanvas />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col gap-3 text-white py-10 px-24 font-bold'>
            <div className='py-2 px-8'>
              <h1 className='text-center text-lg mx-8'>Sign in</h1>
            </div>
            <Input
              label="Email"
              placeholder="Enter email"
              register={register}
              registerName="email"
              errors={errors}
              onClick={()=>{}}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              register={register}
              registerName="password"
              errors={errors}
              onClick={toggleHidePassword}
              passwordType={passwordType}
              eyeIcon={true}
            />
            <Toaster />
            <Button
              label="Sign in"
              isMutating={isMutating}
            />
            <OauthComponent />
          </div>
          </form>
        </div>
    </div>
  )
}

export default page