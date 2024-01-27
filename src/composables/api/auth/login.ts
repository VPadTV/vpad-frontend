import type { UserAuth } from "@/types/auth"
import { post } from "../base"

export async function login(input: URLSearchParams): Promise<UserAuth | undefined> {
    const data = await post<UserAuth>('user/login', input)
    if (!data) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}