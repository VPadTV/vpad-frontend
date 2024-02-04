import { HTTP, api } from "./base"
import type { Paginate, Post } from "@/types/entities"
import type { SimplePost } from "@/types/responses"

export abstract class PostAPI {
    static create = (body: PostCreateBody) => api<{}>('post', HTTP.POST, body)
    static get = (id: string) => api<Post>(`post/${id}`, HTTP.GET)
    static getMany = (body: PostGetManyBody) => api<Paginate<SimplePost>>(`post`, HTTP.GET, body)
    static update = (id: string, body: UpdatePostBody) => api<{}>(`post/${id}`, HTTP.PUT, body)
    static delete = (id: string) => api<PostDeleteResponse>(`post/${id}`, HTTP.DELETE)
}

export type PostCreateBody = {
    title: string
    text: string
    media: File
    thumb?: File
    nsfw?: boolean
    tags: string[]
}

export type SortBy = 'latest' | 'oldest' | 'high-views' | 'low-views'
export type PostGetManyBody = {
    userTierId?: string
    creatorId?: string
    sortBy: SortBy
    titleSearch?: string,
    nsfw: boolean
    page: number
    size: number
}

export type UpdatePostBody = {}

export enum PostDeleteStatus {
    POST_DELETED,
    AUTHOR_REMOVED
}
export type PostDeleteResponse = { status: PostDeleteStatus }