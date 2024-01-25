export type User = {
    id: string,
    nickname: string
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