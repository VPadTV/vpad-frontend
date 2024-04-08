import { authenticationUseCase } from '@/plugins/use-cases/useCases'
import { LoginRequest, LoginResponse, RegisterRequest } from '@domain/entities/Authentication'

export function useAuthentication() {
  function getUserAuth(): LoginResponse | undefined {
    const raw = localStorage.getItem('userAuth')
    if (!raw) return
    const [id, token] = raw.split(' ')
    return { id, token }
  }

  function getAuthorization(): { Authorization: string } | undefined {
    const user = getUserAuth()
    if (!user) return
    return {
      Authorization: 'Bearer ' + user.token
    }
  }

  async function register(body: RegisterRequest): Promise<LoginResponse | undefined> {
    const data = await authenticationUseCase.createUser(new URLSearchParams(body))
    if (!data) return undefined
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data
  }

  async function login(body: LoginRequest): Promise<LoginResponse | undefined> {
    const data = await authenticationUseCase.login(new URLSearchParams(body))
    if (!data) return undefined
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data
  }

  function refreshToken(newToken: string): void {
    const current = getUserAuth()
    if (!current) return
    localStorage.setItem('userAuth', `${current.id} ${newToken}`)
  }

  function logout(): void {
    localStorage.removeItem('userAuth')
  }

  return {
    login,
    register,
    refreshToken,
    logout
  }
}
