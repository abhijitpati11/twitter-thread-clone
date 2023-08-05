import React from 'react';
import { TbNeedleThread } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className='grid grid-cols-2'>
      <div className='bg-[#606060] h-screen grid place-items-center'>
        <TbNeedleThread className='text-white text-[230px]' />
      </div>
      <div className="grid place-items-center">
       <div 
        onClick={() => signIn('google')} 
        className="flex gap4 bg-white p-4 px-6 
                   items-center rounded-[7px] cursor-pointer">
        <FcGoogle className='text-[35px]' />
        <div>signIn With Google</div>
       </div>
      </div>
    </div>
  )
}

export default Login
