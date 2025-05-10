import { Suspense } from 'react'
import SignInComponent from '@/components/auth/Signin'

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInComponent />
    </Suspense>
  )
}