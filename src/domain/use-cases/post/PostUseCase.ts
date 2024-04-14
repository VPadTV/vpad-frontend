import type { RequestParams, ApiBaseResponse } from '@/domain/entities/Api'
import type { IPostRepository } from '@/domain/interfaces/post/IPostRepository'
import type { Post } from '@/domain/entities/Posts'

export class PostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async getAllPosts(url: string, params?: RequestParams): Promise<ApiBaseResponse<Post> | null> {
    return await this.repository.getAll(url, params)
  }
  async getPostById(url: string, id: string): Promise<ApiBaseResponse<Post> | null> {
    return await this.repository.getById(url, id)
  }
  async createPost(url: string, post: Post): Promise<ApiBaseResponse<Post>> {
    return await this.repository.create(post, url)
  }
  async updatePost(id: string, post: Post): Promise<ApiBaseResponse<Post>> {
    return await this.repository.update(id, post)
  }
  async deletePost(id: string): Promise<ApiBaseResponse<Post>> {
    return await this.repository.delete(id)
  }
}
