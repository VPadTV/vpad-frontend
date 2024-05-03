import type { MediaType } from '@domain/constants/MediaType'
import type { Author } from '@domain/entities/Author'

interface Meta {
    authors: Author[]
    createdAt: Date | string
    updatedAt: Date | string
    nsfw: boolean
    views: number
    likes: number
    dislikes: number
    myVote?: number
    tags: string[]
}

export interface Post {
    id?: string
    title: string
    text: string
    mediaUrl: string
    mediaType: MediaType
    meta: Meta
}
