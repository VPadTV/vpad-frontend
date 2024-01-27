import { store } from "@/store/store"
import { BackendError } from "@/types/http"
import { getAuthorization } from "./auth"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined | BackendError> {

    if (query)
        url += '?' + new URLSearchParams(query as any)

    // fetch(url, {
    //     method: "GET",
    // })

    if (url.startsWith('posts'))
        return store.posts as T
    else if (url.startsWith('post'))
        return store.posts.find(p => p.id === query!.id) as T
    else if (url.startsWith('users'))
        return store.posts.map(p => p.author) as T
    else if (url.startsWith('user'))
        return store.posts.find(p => p.author.id === query!.id)?.author as T
    return undefined
}

export async function post<T>(url: string, body?: FormData | URLSearchParams): Promise<T | undefined | BackendError> {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
        method: "POST",
        body,
        headers: getAuthorization()
    })
    if (response.status !== 200) {
        if (response.headers.get('content-type') === 'application/json') {
            const jsonError = await response.json()
            return new BackendError(
                jsonError.code ?? 500,
                jsonError.error ?? 'Unknown'
            );
        }
        return undefined
    }
    return await response.json()

    // if (url.startsWith('login')) {
    //     store.userAuth = {
    //         token: 'test-token',
    //         id: 'qwerty'
    //     }
    //     return store.userAuth as T
    // }
    // else if (url.startsWith('register')) {}
}