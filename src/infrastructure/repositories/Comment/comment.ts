import type { Paginate } from "@/infrastructure/api/types"
import { HTTP, callAPI } from "../../api/index.js"
import type { CommentCreateBody, CommentGetManyBody, CommentGetManyResponse, CommentUpdateBody } from "./comment.types.js"

const BASE = 'comment'
export abstract class CommentRepository {
    static create = (body: CommentCreateBody) => callAPI<{}>(BASE, HTTP.POST, body)
    static getMany = (body: CommentGetManyBody) => callAPI<Paginate<CommentGetManyResponse>>(BASE, HTTP.GET, body)
    static update = (id: string, body: CommentUpdateBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE)
}
