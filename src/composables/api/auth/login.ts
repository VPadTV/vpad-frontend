import type { UserAuth } from "@/types/auth"
import { HttpMethod, api } from "../base"

export async function login(input: URLSearchParams): Promise<UserAuth | undefined> {
    const data = await api<UserAuth>('user/login', 'post', input)
    if (!data) return undefined;
    localStorage.setItem('userAuth', `${data.id} ${data.token}`)
    return data;
}