'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import AuthCanvas from '@/app/components/auth-components/AuthCanvas'

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

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitHandler = (data: registerData) => {
    console.log({data})
  }

  return (
    <div className='bg-slate-200 h-screen flex m-auto'>
      <div className='m-auto items-center justify-center w-4/5 bg-white rounded-xl shadow-xl'>
        <div className='flex'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col gap-2 py-32 px-24'>
            <div className='py-2 px-10'>
              <h1 className='text-center text-lg mx-14'>Create Account</h1>
            </div>
            <label className='text-xs'>Username*</label>
            <input placeholder='Enter a username' {...register('Username')} className='border-2 rounded p-2 text-xs' />
            {errors.Username && <motion.p className='text-xs text-red-600 font-medium' {...framer_error}>{errors.Username?.message}</motion.p>}
            <label className='text-xs'>Email*</label>
            <input placeholder='Enter an email' type='email' {...register('Email')} className='border-2 rounded p-2 text-xs' />
            {errors.Email && <motion.p className='text-xs text-red-600 font-medium' {...framer_error}>{errors.Email?.message}</motion.p>}
            <label className='text-xs'>Password*</label>
            <input placeholder='Enter a password' type='password' {...register('Password')} className='border-2 rounded p-2 text-xs' />
            {errors.Password && <motion.p className='text-xs text-red-600 font-medium' {...framer_error}>{errors.Password?.message}</motion.p>}
            <label className='text-xs'>Confirm Password*</label>
            <input placeholder='Confirm password' type='password' {...register('ConfirmPassword')} className='border-2 rounded p-2 text-xs' />
            {errors.ConfirmPassword && <motion.p className='text-xs text-red-600 font-medium' {...framer_error}>{errors.ConfirmPassword?.message}</motion.p>}
            <button type='submit' className='mt-4 border bg-purple-400 rounded p-2 text-sm'>Continue</button>
          </div>
          </form>
          <div className='p-10 border-l flex-grow justify-center flex items-center'>
            <AuthCanvas />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page