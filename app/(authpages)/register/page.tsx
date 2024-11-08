
import GoogleIcon from '@/assets/logos/google'
import ZKrishi from '@/assets/logos/zkrishi'
import { signIn } from '@/auth'
import RegisterForm from '@/components/auth/register-form'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-[450px] border-2 px-5 rounded-lg flex flex-col items-center py-5'>
        <Link href="/" className="flex items-center gap-2 mb-2">
          <ZKrishi />
          <h2 className="text-4xl font-semibold text-teal-800">Z-Krishi</h2>
        </Link>
        <h1 className='text-xl font-semibold mb-7 text-gray-700'>Register Now</h1>
        <RegisterForm />
        <h1 className='mt-2'>Or,</h1>
        <form className='w-full' action={async () => {
          "use server"
          await signIn("google");
        }}>
          <button className='mt-2
           px-4 rounded-md bg-gray-100 shadow-sm py-[6px] flex items-center justify-center gap-2 hover:shadow-md w-full  text-sm'>Sign in with google
            <GoogleIcon />
          </button>
        </form>
        <Link href={"/signin"}>
          <p className='text-xs mt-4'>Already have an account?<span className='text-blue-600 underline ml-2'>Sign In</span></p>
        </Link>
      </div>
    </div>
  )
}

export default Register