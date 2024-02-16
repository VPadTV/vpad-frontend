export type User = {
    id?: string
    username: string
    nickname: string
    email: string
    profilePhotoUrl?: string
    about?: string
    contact?: string
    admin: boolean
}

export enum MediaType {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export type Post = {
    id?: string,
    title: string,
    text: string,
    mediaUrl: string,
    mediaType: MediaType,
    meta: {
        authors: {
            id: string,
            nickname: string,
            profilePhotoUrl?: string
        }[],

        createdAt: Date | string,
        updatedAt: Date | string,
        nsfw: boolean,
        views: number | string,
        likes: number | string,
        dislikes: number | string,
        myVote?: number
        tags: string[],
    }
}

export type UserComment = {
    id: string
    body: string
    children: UserComment[]
}

export type SubscriptionTier = {
    id?: string,
    name: string,
    price: string
}

export type Paginate<T> = {
    total: number
    to: number
    from: number
    currentPage: number
    lastPage: number
    data: T[]
}