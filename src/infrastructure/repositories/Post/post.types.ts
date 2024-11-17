import type { UserSimpleResponse } from "../User/user.types"

export type PostCreateBody = {
    title: string
    text: string
    media: File
    thumb?: File
    nsfw?: boolean
    tags: string[]
    credits?: PostCredit[]
    minTierId?: string
    seriesId?: string
}

type PostCredit = {
    userId: string
    description: string
}

export type PostAuthor = {
    id: string
    nickname: string
    profilePhotoUrl: string
}

export type Post = {
    text: string

    meta: {
        author: PostAuthor
        credits: PostCredit[]
        likes: number
        dislikes: number
        views: number
        myVote: number
        minTierId: string;
        tags: string[]
        nsfw: boolean
        width: number
        height: number
    }
    thumbUrl: string
}

export type PostGetResponse = {
    text?: string
    mediaUrl: string
    thumbUrl?: string
    meta: {
        author: UserSimpleResponse
        credits: [
            {
                user: UserSimpleResponse
                description: "some description"
            }
        ],
        likes: 10
        dislikes: 20
        views: 40
        myVote: 1
    }
}

export type SortBy = 'latest' | 'oldest' | 'high-views' | 'low-views'
export type PostGetManyBody = {
    userTierId?: string
    creatorId?: string
    sortBy: SortBy
    titleSearch?: string
    nsfw: boolean
    page: number
    size: number
}

export type PostGetManyResponse = {
    id: string
    text?: string
    thumbUrl?: string
    meta: {
        width?: 300
        height?: 300
        nsfw: false
        tags: [
            "some"
        ],
        minTierId?: string
        author: UserSimpleResponse
        credits: [
            {
                user: UserSimpleResponse
                description: string
            }
        ],
        series?: {
            id: string
            name: string
        }
        views: 1000
        createdAt: string
    }
}

export type UpdatePostBody = {}
