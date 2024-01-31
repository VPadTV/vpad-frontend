export type PostGetManyResponse = {
    id: string
    title: string
    text: string
    mediaUrl: string
    mediaType: "IMAGE" | "VIDEO"
    thumbUrl?: string
    meta: {
        nsfw: boolean
        tags: string[]
        authors: SimpleUser[]
        views: number
        createdAt: string
    }
}

export type SimpleUser = {
    id: string,
    nickname: string,
    profilePhotoUrl: string,
}