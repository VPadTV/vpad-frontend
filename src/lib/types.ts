export type User = {
    id: number,
    nickname: string
}

export type Video = {
    id: number,
    title: string,
    author: string,
    likes: number | string,
    dislikes: number | string
    createdAt: Date,
}