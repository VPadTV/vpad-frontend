import type { IBaseRepository } from '@domain/interfaces/shared/IBaseRepository'
import type { Post } from '@domain/entities/Posts'

export interface IPostRepository extends IBaseRepository<Post> {}
