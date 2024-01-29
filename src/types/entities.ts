export type User = {
    id: string
    username: string
    nickname: string
    email: string
    profilePhotoUrl?: string
    about?: string
    contact?: string
    admin: boolean
}

export type Post = {
    id: string,
    url: string,
    title: string,
    author: User,
    likes: number | string,
    dislikes: number | string
    createdAt: Date,
}

export type SubscriptionTier = {
    id: string,
    name: string,
    price: string
}