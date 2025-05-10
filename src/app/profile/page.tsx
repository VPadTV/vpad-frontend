'use client'
import UserView from '@/components/User/Userpage'
import { Toaster } from 'react-hot-toast'

export default function page() {
  return (
    <>
      <UserView />
      <Toaster  />
    </>
  )
}
