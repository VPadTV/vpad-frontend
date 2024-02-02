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

export type Post = {
    id?: string,
    title: string,
    text: string,
    mediaUrl: string,
    mediaType: "IMAGE" | "VIDEO",
    meta: {
        authors: {
            id: string,
            nickname: string,
            profilePhotoUrl?: string
        }[],

        createdAt: Date | string,
        updatedAt: Date | string,
        nsfw: boolean,
        likes: number | string,
        dislikes: number | string
        tags: string[],
        views: number,
    }
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