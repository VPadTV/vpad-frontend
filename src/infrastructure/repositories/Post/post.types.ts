export type PostCreateBody = {
    title: string
    text: string
    media: File
    thumb?: File
    nsfw?: boolean
    tags: string[]
}

export type SortBy = 'latest' | 'oldest' | 'high-views' | 'low-views'
export type PostGetManyBody = {
    userTierId?: string
    creatorId?: string
    sortBy: SortBy
    titleSearch?: string,
    nsfw: boolean
    page: number
    size: number
}

export type UpdatePostBody = {}

export enum PostDeleteStatus {
    POST_DELETED = 'Post Deleted',
    AUTHOR_REMOVED = 'Author Removed'
}
export type PostDeleteResponse = { status: PostDeleteStatus }
