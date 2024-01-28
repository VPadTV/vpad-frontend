import type { UserAuth } from "@/types/auth";
import { api } from "./base"

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

export async function login(input: URLSearchParams): Promise<UserAuth | undefined> {
    const data = await api<UserAuth>('user/login', 'post', input)
    if (!data) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}

export async function logout(): Promise<undefined> {
    localStorage.removeItem('userAuth')
}