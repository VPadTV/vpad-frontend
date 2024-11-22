import { useToast } from "vue-toastification"
import { ErrorMessage, isCode } from "./errorMessage"
import { useRouter } from "vue-router"
import { asFormData } from "@/modules/shared/helpers"
import { getAuthorization, logout, refreshToken } from "@/modules/authentication/composables"

export enum HTTP {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}

export type ResponseRefreshToken = { token?: string }
type BodyItem = string | number | boolean
export type APIArgs<T> = { [key: string]: BodyItem | BodyItem[] | File } | URLSearchParams | FormData | T

function parseArguments<R>(args?: APIArgs<R>) {
    if (!args || args instanceof URLSearchParams || args instanceof FormData) return args as (FormData | URLSearchParams);
    if (Object.values(args).some(v => v instanceof File)) return asFormData(args)
    return new URLSearchParams(args as any)
}

export async function callAPI<T = unknown, R = any>(url: string, method: HTTP, args?: APIArgs<R>): Promise<T & ResponseRefreshToken | undefined> {
    const toast = useToast()
    let response: Response
    const body = parseArguments<R>(args)

    try {
        response = await fetch(import.meta.env.VITE_API_URL + url + (method === "get" && body ? "?" + body : ""), {
            method,
            body: method === "get" ? undefined : body,
            headers: {
                ...((await getAuthorization()) ?? {}),
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
            toast.error(`${response.status ?? 500} - ${jsonError.error ?? 'Unknown'}`)
            if (isCode(jsonError.error, ErrorMessage.EXPIRED_TOKEN)) {
                const router = useRouter()
                logout()
                router.go(0)
            }
            return undefined
        }
        toast.error(`Server error`)
        return undefined
    }
    const responseJson = await response.json() as T & ResponseRefreshToken
    if (responseJson.token)
       await refreshToken(responseJson.token)

    return responseJson
}
