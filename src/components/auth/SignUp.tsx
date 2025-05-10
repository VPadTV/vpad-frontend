'use client'
import React, { FormEvent, useState } from 'react'
import Input from '../ui/Input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { registerUser } from '@/redux/features/authSlice'

function SignUpComponent() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    about: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match")
      return
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long")
      return
    }
    
    try {
      await dispatch(registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname || undefined,
        about: formData.about || undefined
      })).unwrap()
      
      router.push('/signin')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Registration failed')
      } else {
        setErrorMessage('An unexpected error occurred')
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
              <h1 className='text-3xl font-bold mb-4'>Join VPad Today!</h1>
              <p className='text-center text-lg opacity-90 mb-6'>
                Create an account to start your journey. Share your creativity with the world.
              </p>
              <div className='flex gap-4 mt-4'>
                <div className='w-3 h-3 rounded-full bg-white/50'></div>
                <div className='w-3 h-3 rounded-full bg-white'></div>
                <div className='w-3 h-3 rounded-full bg-white/50'></div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <div className='flex flex-col items-center justify-center mb-8 md:hidden'>
                <img
                  src='/images/logonew.png'
                  className='w-[80px] h-[80px] mb-4'
                  alt="VPad Logo"
                />
                <h1 className='text-2xl font-bold text-primary'>Create Account</h1>
              </div>

              {errorMessage && (
                <div className='bg-danger/10 border border-danger text-danger p-4 rounded-lg mb-6'>
                  {errorMessage}
                </div>
              )}

              <div className='flex flex-col gap-6'>
                <Input
                  name="username"
                  label='Username'
                  placeholder='Choose your username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  label='Email'
                  placeholder='Enter your email address'
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="nickname"
                  label='Nickname (Optional)'
                  placeholder='How would you like to be called?'
                  value={formData.nickname}
                  onChange={handleChange}
                />
                <div className='relative'>
                  <Input
                    name="password"
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a strong password'
                    value={formData.password}
                    onChange={handleChange}
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
                <div className='relative'>
                  <Input
                    name="confirmPassword"
                    label='Repeat Password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-subtext hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                
                <Input
                  name="about"
                  label='About (Optional)'
                  placeholder='Tell us a bit about yourself'
                  value={formData.about}
                  onChange={handleChange}
                />
                
                <div className='flex items-center justify-between mt-4'>
                  <Link 
                    href='/signin'
                    className='text-sm text-subtext hover:text-primary transition-colors'
                  >
                    Already have an account? Sign in
                  </Link>
                  
                  <Button
                    type='submit'
                    className='w-[120px] bg-primary text-white hover:bg-secondary transition-colors'
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
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

export default SignUpComponent