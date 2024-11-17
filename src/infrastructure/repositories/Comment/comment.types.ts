import type { UserSimpleResponse } from "../User/user.types"

export type CommentCreateBody = {
    postId: string
    text: string
}

export type CommentCreateResponse = {
    id: string
}

export type CommentUpdateBody = {
    text: string
}

export type CommentGetManyBody = {
    postId?: string
    commentId?: string
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
    }
}