'use client'

import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import AuthCanvas from '@/app/components/auth-components/AuthCanvas'
import EyeIcon from '@/app/icons/eye-outline.svg'
import EyeOffIcon from '@/app/icons/eye-off-outline.svg'
import CloseCircle from '@/app/icons/close-circle-outline.svg'
import Google from '@/app/icons/google.svg'
import Facebook from '@/app/icons/facebook.svg'

interface registerData{
  Username: string,
  Email: string,
  Password: string,
  ConfirmPassword: string
}

const framer_error = {
  initial: {opacity: 0, y:10},
  animate: {opacity: 1, y:0}, 
  exit: {opacity: 0, y:10}, 
  transition: {duration: 0.2}
}
const schema = yup.object().shape({
  Username: yup.string().required('Username is required').min(3).max(20),
  Email: yup.string().required('Email is required').email('Please enter a valid email'),
  Password: yup.string().required('Password is required').min(8).max(32),
  ConfirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('Password')], 'Passwords do not match')
})

const page = () => {

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

  const onSubmitHandler = (data: registerData) => {
    console.log({data})
  }

  return (
    <div className='bg-blue-950 m-auto min-h-screen flex items-center justify-center'>
      <div>
        <div className='flex flex-col items-center justify-center md:flex-row'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col gap-2 text-white py-10 px-24 font-bold'>
            <div className='py-2 px-10'>
              <h1 className='text-center text-lg mx-8'>Create Account</h1>
            </div>
            <label className='text-xs'>Username*</label>
            <div className='relative'>
              <input placeholder='Enter username' {...register('Username')} className='focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-slate-600' />
              <span className='p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute' onClick={()=>{}}>
              <CloseCircle className='w-3.5 text-slate-600' />
              </span>
            </div>
            {errors.Username && <motion.p className='text-xs text-red-500 font-medium' {...framer_error}>{errors.Username?.message}</motion.p>}
            <label className='text-xs'>Email*</label>
            <div className='relative'>
              <input placeholder='Enter email' type='email' {...register('Email')} className='focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-slate-600' />
              <span className='p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute' onClick={()=>{}}>
              <CloseCircle className='w-3.5 text-slate-600' />
              </span>
            </div>
            {errors.Email && <motion.p className='text-xs text-red-500 font-medium' {...framer_error}>{errors.Email?.message}</motion.p>}
            <label className='text-xs'>Password*</label>
            <div className='relative'>
            <input placeholder='Enter password' type={passwordType} {...register('Password')} className='focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-slate-600' />
              <button type='button' className='p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute' onClick={toggleHidePassword}>
                {passwordType === 'password'? <EyeOffIcon className='w-3.5 text-slate-600' /> : <EyeIcon className='w-3.5 text-slate-600' />}
              </button>
            </div>
            {errors.Password && <motion.p className='text-xs text-red-500 font-medium' {...framer_error}>{errors.Password?.message}</motion.p>}
            <label className='text-xs'>Confirm Password*</label>
            <div className='relative'>
            <input placeholder='Confirm password' type={passwordType} {...register('ConfirmPassword')} className='focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-slate-600' />
              <button type='button' className='p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute' onClick={toggleHidePassword}>
                {passwordType === 'password'? <EyeOffIcon className='w-3.5 text-slate-600' /> : <EyeIcon className='w-3.5 text-slate-600' />}
              </button>
            </div>
            {errors.ConfirmPassword && <motion.p className='text-xs text-red-500 font-medium' {...framer_error}>{errors.ConfirmPassword?.message}</motion.p>}
            <button type='submit' className='my-4 hover:bg-indigo-500 transition ease-in-out duration-600 text-white bg-blue-500 rounded-lg p-3 text-sm shadow-lg shadow-blue-500/50'>Sign Up</button>
            <div>
              <div className='flex items-center justify-center gap-2'>
                <hr className='w-16' />
                <p className='text-xs font-normal'>Or continue with</p>
                <hr className='w-16' />
              </div>
              <div className='flex gap-10 justify-center my-8'>
                <button type='button' className='px-8 py-2 bg-white rounded-xl text-black'><Facebook /></button>
                <button type='button' className='px-8 py-2 bg-white rounded-xl text-black'><Google /></button>
              </div>
            </div>
            
          </div>
          </form>
          <AuthCanvas />
          <div className='p-10 text-white flex-grow justify-center flex flex-col items-start gap-10'>
            <div>
              <h1 className='text-4xl font-bold'>Unleash your</h1>
              <h1 className='text-4xl font-bold'>product's potential!</h1>
            </div>
            <div className='font-semibold'>
              <p>
                already have an account?
              </p>
              <p>
                you can <span className='text-blue-700'><a href='/signin'>sign in here!</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page