import type { Paginate } from "@infra/api/types.js"
import { HTTP, callAPI } from "../../api"
import type { PostCreateBody, PostGetManyBody, UpdatePostBody, PostDeleteResponse, Post } from './post.types'

export abstract class PostRepository {
    static create = (body: PostCreateBody) => callAPI<{}>('post', HTTP.POST, body)
    static get = (id: string) => callAPI(`post/${id}`, HTTP.GET)
    static getMany = (body?: PostGetManyBody) => callAPI<Paginate<Post>, PostGetManyBody>(`post`, HTTP.GET, body)
    static update = (id: string, body: UpdatePostBody) => callAPI<{}, UpdatePostBody>(`post/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<PostDeleteResponse>(`post/${id}`, HTTP.DELETE)
}
