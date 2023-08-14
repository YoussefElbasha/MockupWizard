import React from 'react'

const Navbar = () => {
  return (
    <div className='flex text-white justify-between items-center px-20'>
        <div className='flex gap-4'>
            <p>Home</p>
            <p>About</p>
        </div>
        <div className='flex gap-4 font-bold text-sm'>
            <button className='text-blue-700'>Sign-in</button>
            <button className='bg-white text-blue-600 rounded-3xl py-2 px-3'>Register</button>
        </div>
    </div>
  )
}

export default Navbar