import type { UserAuth } from "@/types/auth";
import { HTTP, api } from "./base"

export const getUserAuth = (): UserAuth | undefined => {
    const raw = localStorage.getItem('userAuth')
    if (!raw) return
    const [id, token] = raw.split(' ')
    return { id, token }
}

export const getAuthorization = (): { 'Authorization': string } | undefined => {
    const user = getUserAuth()
    if (!user) return
    return {
        'Authorization': 'Bearer ' + user.token
    }
}

type RegisterBody = {
    username: string
    nickname?: string
    email: string
    password: string
    about?: string
}
export async function register(body: RegisterBody): Promise<UserAuth | undefined> {
    const data = await api<UserAuth>('user/register', HTTP.POST, new URLSearchParams(body))
    if (!data) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}

type LoginBody = {
    emailOrUsername: string
    password: string
}
export async function login(body: LoginBody): Promise<UserAuth | undefined> {
    const data = await api<UserAuth>('user/login', HTTP.POST, new URLSearchParams(body))
    if (!data) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}
export async function refreshToken(newToken: string): Promise<undefined> {
    const current = getUserAuth()
    if (!current) return
    localStorage.setItem('userAuth', `${current.id} ${newToken}`)
}

export async function logout(): Promise<undefined> {
    localStorage.removeItem('userAuth')
}