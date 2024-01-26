import { store } from "@/store/store"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined> {
    if (query)
        url += '?' + new URLSearchParams(query as any)

    // fetch(url, {
    //     method: "get",
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