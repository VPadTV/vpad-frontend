import type { UserAuth } from "@/types/auth";

export const getUser = (): UserAuth | undefined => {
    const raw = localStorage.getItem('userAuth')
    if (!raw) return
    const [id, token] = raw.split(' ')
    return { id, token }
}

export const getAuthorization = (): { 'Authorization': string } | undefined => {
    const user = getUser()
    if (!user) return
    return {
        'Authorization': 'Bearer ' + user.token
    }
}