import type { Post } from "@/domain/entities/Posts"
import { HTTP, callAPI } from "../../api"
import type { PostCreateBody, PostGetManyBody, UpdatePostBody, PostDeleteResponse } from "./post.types"
import type { Paginate } from "@/domain/entities/Api"

export abstract class PostRepository {
    static create = (body: PostCreateBody) => callAPI<{}>('post', HTTP.POST, body)
    static get = (id: string) => callAPI<Post>(`post/${id}`, HTTP.GET)
    static getMany = (body: PostGetManyBody) => callAPI<Paginate<unknown>>(`post`, HTTP.GET, body)
    static update = (id: string, body: UpdatePostBody) => callAPI<{}>(`post/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<PostDeleteResponse>(`post/${id}`, HTTP.DELETE)
}
