"use client" 
import Image from 'next/image'
import AuthCanvas from './components/auth-components/AuthCanvas'


export default function Home() {
  return (
    <div>
      <div className='bg-blue-950 h-screen flex m-auto'>
      <div className='m-auto items-center'>
        <div className='flex items-center h-screen'>
          <AuthCanvas />
        <div className='p-10 text-white flex-grow justify-center flex flex-col items-start gap-10'>
            <div>
              <h1 className='text-4xl font-bold'>Unleash your products potential!</h1>
            </div>
            <div className='font-semibold'>
              <p>
               have a design you want to add? you can <span className='text-blue-700'><a href='/signup'>Start Now!</a></span>
              </p>
            </div>
        </div>
            
        </div>  
       </div>
    </div>
  </div>
        

  )
}
