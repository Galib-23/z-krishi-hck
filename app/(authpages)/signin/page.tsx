import GoogleIcon from '@/assets/logos/google'
import ZKrishi from '@/assets/logos/zkrishi'
import { signIn } from '@/auth'
import SignInForm from '@/components/auth/signin-form'
import Link from 'next/link'
import React from 'react'

const SignIn = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-[450px] border-2 px-5 rounded-lg flex flex-col items-center py-5'>
        <Link href="/" className="flex items-center gap-2 mb-2">
          <ZKrishi />
          <h2 className="text-4xl font-semibold text-teal-800">Z-Krishi</h2>
        </Link>
        <h1 className='text-xl font-semibold mb-7 text-gray-700'>Sign In</h1>
        <SignInForm />
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
        <Link href={"/register"}>
          <p className='text-xs mt-4'>Don&apos;t have an account?<span className='text-blue-600 underline ml-2'>Register</span></p>
        </Link>
      </div>
    </div>
  )
}

export default SignIn