export interface Comment {
  id?: string
  postId?: string
  body: string
  children: Comment[]
}
