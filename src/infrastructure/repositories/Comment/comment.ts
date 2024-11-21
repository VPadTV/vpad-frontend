import type { Paginate } from "@infrastructure/api/types"
import { HTTP, callAPI } from "../../api/index.js"
import type { CommentCreateResponse, CommentCreateBody, CommentGetManyBody, CommentGetManyResponse, CommentUpdateBody } from "./comment.types.js"

const BASE = 'comment'
export abstract class CommentRepository {
    static create = (postId: string, body: CommentCreateBody) => callAPI<CommentCreateResponse>(`${BASE}/create/${postId}`, HTTP.POST, body)
    static getMany = (body: CommentGetManyBody) => callAPI<Paginate<CommentGetManyResponse>>(BASE, HTTP.GET, body)
    static get = (id: string) => callAPI<CommentGetManyResponse>(`${BASE}/${id}`, HTTP.GET)
    static update = (id: string, body: CommentUpdateBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE)
}
