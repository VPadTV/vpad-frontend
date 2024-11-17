import type { Paginate } from "@/infrastructure/api/types"
import { HTTP, callAPI } from "../../api"
import type { PostCreateBody, PostGetManyBody, UpdatePostBody, PostGetManyResponse, PostGetResponse } from "./post.types"

export abstract class PostRepository {
    static create = (body: PostCreateBody) => callAPI<{}>('post', HTTP.POST, body)
    static get = (id: string) => callAPI<PostGetResponse>(`post/${id}`, HTTP.GET)
    static getMany = (body: PostGetManyBody) => callAPI<Paginate<PostGetManyResponse>>(`post`, HTTP.GET, body)
    static update = (id: string, body: UpdatePostBody) => callAPI<{}>(`post/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`post/${id}`, HTTP.DELETE)
}
