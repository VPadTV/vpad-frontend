import { BackendError } from "@/types/http"
import { getAuthorization, refreshToken } from "./auth"
import { useToast } from "vue-toastification"

export type HttpMethod = "get" | "post" | "put" | "delete"

export type ResponseRefreshToken = { token?: string }
export async function api<T>(url: string, method: HttpMethod, body?: FormData | URLSearchParams): Promise<T | undefined> {
    const toast = useToast()
    let response: Response
    try {
        response = await fetch(import.meta.env.VITE_API_URL + url + (method === "get" && body ? "?" + body : ""), {
            method,
            body: method === "get" ? undefined : body,
            headers: {
                ...getAuthorization(),
                'Expires': ''
            }
        })
    } catch (e) {
        toast.error('Error reaching the server')
        return undefined
    }
    if (response.status !== 200) {
        if (response.headers.get('content-type')?.startsWith('application/json')) {
            const jsonError = await response.json()
            const error = new BackendError(
                response.status ?? 500,
                jsonError.error ?? 'Unknown'
            );
            toast.error(`${error.code} - ${error.error}`)
            return undefined
        }
        toast.error(`Server error`)
        return undefined
    }
    const responseJson = await response.json() as T & ResponseRefreshToken
    if (responseJson.token)
        refreshToken(responseJson.token)

    return responseJson
}