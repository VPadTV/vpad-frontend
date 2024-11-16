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

export type UpdatePostBody = {}

export enum PostDeleteStatus {
  POST_DELETED = 'Post Deleted',
  AUTHOR_REMOVED = 'Author Removed'
}

export type PostDeleteResponse = { status: PostDeleteStatus }
