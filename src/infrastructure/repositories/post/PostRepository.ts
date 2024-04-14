import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import type { Post } from '@/domain/entities/Posts'
import type { HttpClient } from '@/infrastructure/repositories/shared/HttpClient'

export class PostRepository extends BaseRepository<Post> {
    constructor(public httpClient: HttpClient) {
        super(httpClient)
    }

    duplicate() { }
}
