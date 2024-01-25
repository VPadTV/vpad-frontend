export type User = {
    id: string,
    nickname: string
}

export type Video = {
    id: string,
    title: string,
    author: User,
    likes: number | string,
    dislikes: number | string
    createdAt: Date,
}