'use client'
import React, { FormEvent, useState, useEffect } from 'react'
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'
import Input from '../ui/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loginUser } from '@/redux/features/authSlice'

function SignInComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectPath, setRedirectPath] = useState('/')
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  
  useEffect(() => {
    setRedirectPath(searchParams.get('redirect') || '/')
  }, [searchParams])
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    
    try {
      await dispatch(loginUser({
        emailOrUsername: email,
        password,
      })).unwrap()
      
      router.push(redirectPath)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Failed to sign in')
      } else {
        setErrorMessage(typeof error === 'string' ? error : 'Failed to sign in')
      }
    }
  }

  return (
    <>
      <div className='min-h-screen w-full bg-background'>
        <div className='mx-auto min-h-screen pt-[100px] w-full px-10'>
          <div className='grid md:grid-cols-2 gap-8 bg-card border border-theme p-8 rounded-3xl h-fit mx-auto max-w-[1000px] shadow-md'>
            {/* Welcome Card */}
            <div className='hidden md:flex flex-col justify-center items-center p-8 bg-gradient-primary rounded-2xl text-white'>
              <img
                src='/images/logonew.png'
                className='w-[120px] h-[120px] mb-8'
                alt="VPad Logo"
              />
              <h1 className='text-3xl font-bold mb-4'>Welcome Back!</h1>
              <p className='text-center text-lg opacity-90 mb-6'>
                Sign in to continue your creative journey with VPad. Your digital canvas awaits.
              </p>
              <div className='flex gap-4 mt-4'>
                <div className='w-3 h-3 rounded-full bg-white/50'></div>
                <div className='w-3 h-3 rounded-full bg-white'></div>
                <div className='w-3 h-3 rounded-full bg-white/50'></div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <div className='flex w-full cursor-pointer justify-end'>
                <FaTimes
                  size={20}
                  onClick={()=>router.back()}
                  className='hover:text-primary transition-colors'
                />
              </div>
              
              <div className='flex flex-col items-center justify-center mb-8 md:hidden'>
                <img
                  src='/images/logonew.png'
                  className='w-[80px] h-[80px] mb-4'
                  alt="VPad Logo"
                />
                <h1 className='text-2xl font-bold text-primary'>Welcome Back!</h1>
              </div>
              
              {errorMessage && (
                <div className='p-3 bg-red-100 text-red-700 rounded-lg mb-4 text-sm'>
                  {errorMessage}
                </div>
              )}

              <div className='flex flex-col gap-6'>
                <Input
                  label='Email or Username'
                  placeholder='Enter your email or username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className='relative'>
                  <Input
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-subtext hover:text-primary transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                
                <div className='flex items-center justify-between mt-4'>
                  <Link 
                    href='/signup'
                    className='text-sm text-subtext hover:text-primary transition-colors'
                  >
                    Need an account? Sign up
                  </Link>
                  
                  <Button
                    type='submit'
                    className='w-[120px] bg-primary text-white hover:bg-secondary transition-colors'
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInComponent