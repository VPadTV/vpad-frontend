import { store } from "@/store/store"
import { BackendError } from "@/types/http"
import { getAuthorization } from "./auth"
import { useToast } from "vue-toastification"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined> {

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

export type HttpMethod = "get" | "post" | "put" | "delete"

export async function api<T>(url: string, method: HttpMethod, body?: FormData | URLSearchParams): Promise<T | undefined> {
    const toast = useToast()
    let response: Response
    try {
        response = await fetch(import.meta.env.VITE_API_URL + url, {
            method,
            body,
            headers: getAuthorization()
        })
    } catch (e) {
        toast.error('Error reaching the server')
        return undefined
    }
    if (response.status !== 200) {
        if (response.headers.get('content-type')?.startsWith('application/json')) {
            const jsonError = await response.json()
            const error = new BackendError(
                jsonError.code ?? 500,
                jsonError.error ?? 'Unknown'
            );
            toast.error(`${error.code} - ${error.error}`)
            return undefined
        }
        toast.error(`Server error`)
        return undefined
    }
    return await response.json() as T
}