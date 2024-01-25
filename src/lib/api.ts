import { listOf } from "./mock/listOf"
import { video } from "./mock/video"
import { user } from "./mock/user"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined> {
    if (query)
        url += '?' + new URLSearchParams(query as any)

    // fetch(url, {
    //     method: "get",
    // })

    if (url === 'videos') return listOf(video) as any
    else if (url === 'users') return listOf(user) as any
    return undefined
}