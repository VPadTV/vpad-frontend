import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import type { Post } from '@/domain/entities/Posts'
import type { HttpClient } from '@/infrastructure/repositories/shared/HttpClient'
import type { IPostRepository } from '@/domain/interfaces/post/IPostRepository'

export class PostRepository extends BaseRepository<Post> implements IPostRepository {
  constructor(public httpClient: HttpClient) {
    super(httpClient)
  }

  duplicate() {}
}
