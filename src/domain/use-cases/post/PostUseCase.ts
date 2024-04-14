import type { RequestParams } from '@/domain/entities/Api'
import type { Post } from '@/domain/entities/Posts'
import type { PostRepository } from '@/infrastructure/repositories/post/PostRepository'

export class PostUseCase {
    constructor(private readonly repository: PostRepository) { }

    async getAllPosts(url: string, params?: RequestParams) {
        return await this.repository.getAll(url, params)
    }
    async getPostById(url: string, id: string) {
        return await this.repository.getById(url, id)
    }
    async createPost(url: string, post: Post) {
        return await this.repository.create(post, url)
    }
    async updatePost(id: string, post: Post) {
        return await this.repository.update(id, post)
    }
    async deletePost(id: string) {
        return await this.repository.delete(id)
    }
}
