import { videos } from "./mock/videos"
import { users } from "./mock/users"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined> {
    if (query)
        url += '?' + new URLSearchParams(query as any)
    console.log(`Calling ${url}`)
    // fetch(url, {
    //     method: "get",
    // })

    if (url === 'videos') return videos() as any
    else if (url === 'users') return users() as any
    return undefined
}