import type { UserSimpleResponse } from "../User/user.types"

export type CommentCreateBody = {
    postId: string
    text: string
    parentId?: string | null
}

export type CommentCreateResponse = {
    id: string
}

export type CommentUpdateBody = {
    text: string
}

export type CommentGetManyBody = {
    postId?: string
    parentId?: string | null
    sortBy: 'latest' | 'oldest'
    page: number
    size: number
}

export type CommentGetManyResponse = {
    id: string,
    text: string,
    childrenCount: number,
    meta: {
        user: UserSimpleResponse,
        createdAt: string,
        updatedAt: string
        postId: string
    }
}
