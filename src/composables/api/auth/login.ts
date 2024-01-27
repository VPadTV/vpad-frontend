import type { UserAuth } from "@/types/auth"
import { post } from "../base"
import { BackendError } from "@/types/http"

export async function login(input: URLSearchParams): Promise<UserAuth | undefined> {
    const data = await post<UserAuth>('user/login', input)
    if (!data || data instanceof BackendError) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}