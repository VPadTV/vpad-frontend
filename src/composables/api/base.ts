import { listOf } from "@/utils/mock/listOf"
import { user } from "@/utils/mock/user"
import { post } from "@/utils/mock/post"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T | undefined> {
    if (query)
        url += '?' + new URLSearchParams(query as any)

    // fetch(url, {
    //     method: "get",
    // })

    switch (url) {
        case 'post':
            return post() as T
        case 'posts':
            return listOf(post) as T
        case 'users':
            return listOf(user) as T
        default:
            break;
    }
    return undefined
}