import { BackendError } from "@/types/http"
import { getAuthorization, logout, refreshToken } from "./auth"
import { useToast } from "vue-toastification"
import { asFormData } from "@/utils"
import { ErrorMessage, getErrorMessage, isCode } from "./errorMessage"
import { useRouter } from "vue-router"

export enum HTTP {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}

export type ResponseRefreshToken = { token?: string }
type BodyItem = string | number | boolean

export type APIArgs = { [key: string]: BodyItem | BodyItem[] | File } | URLSearchParams | FormData
function parseArguments(args?: APIArgs) {
    if (!args || args instanceof URLSearchParams || args instanceof FormData) return args;
    if (Object.values(args).some(v => v instanceof File)) return asFormData(args)
    return new URLSearchParams(args as any)
}

export async function api<T>(url: string, method: HTTP, args?: APIArgs): Promise<T | undefined> {
    const toast = useToast()
    let response: Response
    const body = parseArguments(args)

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
                getErrorMessage(jsonError.error) ?? 'Unknown'
            );
            toast.error(`${error.code} - ${error.error}`)
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
        refreshToken(responseJson.token)

    return responseJson
}