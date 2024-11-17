import type { Paginate } from "@infra/api/types.js"
import { HTTP, callAPI } from "../../api"
import type { PostCreateBody, PostGetManyBody, UpdatePostBody, PostGetManyResponse, PostGetResponse } from "./post.types"

const BASE = 'post'
export abstract class PostRepository {
    static create = (body: PostCreateBody) => callAPI<{}>(`${BASE}`, HTTP.POST, body)
    static get = (id: string) => callAPI<PostGetResponse>(`${BASE}/${id}`, HTTP.GET)
    static getMany = (body: PostGetManyBody) => callAPI<Paginate<PostGetManyResponse>>(BASE, HTTP.GET, body)
    static update = (id: string, body: UpdatePostBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE)
}
