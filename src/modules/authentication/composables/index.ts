import type { LoginOrRegisterResponse, RegisterRequest, LoginRequest } from '@/domain/entities/Authentication'
import { authenticationRepository } from '@/infrastructure/repositories'

export function useAuthentication() {
    function getUserAuth(): LoginOrRegisterResponse | undefined {
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

    async function register(body: RegisterRequest) {
        const data = await authenticationRepository.register(body)
        if (!data) return undefined
        localStorage.setItem('userAuth', `${data.id} ${data.token}`)
        return data
    }

    async function login(body: LoginRequest) {
        const data = await authenticationRepository.login(body)
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
