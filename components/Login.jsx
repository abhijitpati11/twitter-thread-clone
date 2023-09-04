import React, { useState } from 'react';
import { TbNeedleThread } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const Login = () => {
  
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const handleLoginButton = () => {
    setName("");
    setPassword("");
    alert("This feature is under development and will be available soon...Please use Google Authentication");
  }

  return (
    <div>
      <div className='flex justify-center items-center h-screen bg-indigo-600'>
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'> 
          <h1 className='text-3xl block text-center font-semibold'>
            <i className='fa-solid fa-user'></i>
            Login to Thread
          </h1>
          
          <div className="mt-3">
            <label htmlFor="userName" className='block text-base mb-2'>Username</label>
            <input type="text" 
              className='border w-full text-base px-2 py-1 focus:outline-none
              focus:ring-0 focus:border-gray-600'
              placeholder='Enter Username'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className='block text-base mb-2'>Password</label>
            <input type="password" 
              className='border w-full text-base px-2 py-1 focus:outline-none
              focus:ring-0 focus:border-gray-600'
              placeholder='Enter Password' 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div>
              <input type="checkbox" />
              <label htmlFor="label">Remember Me</label>
            </div>
            <div>
              <a href="@" className='hover:text-red-500'> Forgot Password? </a>
            </div>
          </div>

          <div className='mt-5'>
            <button type='submit'
              className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md
              hover:bg-transparent hover:text-indigo-700'
              onClick={handleLoginButton}
            >
              &nbsp;&nbsp;Login
            </button>
          </div>

          <div className='relative flex mt-4 items-center'>
            <div className='flex-grow border-t-4 border-gray-400 ml-3'></div>
            <span className='mx-3'>Or login With</span>
            <div className='flex-grow border-t-4 border-gray-400 mr-3'></div>
          </div>

          <div className='mt-5'>
            <button type='submit'
              className='border-2 border-indigo-700 bg-transparent text-dark py-1 w-full rounded-lg
              hover:bg-indigo-700 hover:text-white'
              onClick={()=> signIn('google')}
            > 
              <div className='flex justify-center text-center' >
                <span className='mt-1'><FcGoogle /></span>
                <span>SignIn With Google</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
