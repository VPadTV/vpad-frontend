import type { RegisterBody, LoginBody } from '@infra/repositories/Authentication/auth.types.js'

import { AuthenticationRepository } from '@/infrastructure/repositories/Authentication/auth'
import type { UserGetResponse } from '@infra/repositories/User/user.types'
import type { ResponseRefreshToken } from '@infra/api'

export async function getUserAuth(): Promise<(UserGetResponse & ResponseRefreshToken) | null> {
  const token = localStorage.getItem('userAuth')
  if (!token) return null
  try {
    const response: UserGetResponse & ResponseRefreshToken = await fetch(import.meta.env.VITE_API_URL + 'user/whoami', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(a => a.json())
    if (!response) return null
    return response
  } catch (e) {
    return null;
  }
}

export async function getAuthorization(): Promise<{ Authorization: string } | undefined> {
  const user = await getUserAuth()
  if (!user?.token) return
  return {
    Authorization: 'Bearer ' + user.token
  }
}

export async function register(body: RegisterBody) {
  const data = await AuthenticationRepository.register(body)
  if (!data) return undefined
  localStorage.setItem('userAuth', data.token)
  return data
}

export async function login(body: LoginBody) {
  const data = await AuthenticationRepository.login(body)
  if (!data) return undefined
  localStorage.setItem('userAuth', data.token)
  return data
}

export async function refreshToken(newToken: string): Promise<void> {
  const current = await getUserAuth()
  if (!current?.id || !current?.token) return
  localStorage.setItem('userAuth', newToken)
}

export function logout(): void {
  localStorage.removeItem('userAuth')
}
