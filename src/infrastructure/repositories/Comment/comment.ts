import type { Paginate } from "@/infrastructure/api/types"
import { HTTP, callAPI } from "../../api/index.js"
import type { CommentCreateBody, CommentGetManyBody, CommentGetManyResponse, CommentUpdateBody } from "./comment.types.js"

export abstract class CommentRepository {
    static create = (body: CommentCreateBody) => callAPI<{}>('comment', HTTP.POST, body)
    static getMany = (body: CommentGetManyBody) => callAPI<Paginate<CommentGetManyResponse>>('comment', HTTP.GET, body)
    static update = (id: string, body: CommentUpdateBody) => callAPI<{}>(`comment/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`comment/${id}`, HTTP.DELETE)
}
