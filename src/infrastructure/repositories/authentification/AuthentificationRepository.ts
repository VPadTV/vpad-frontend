import { BaseRepository } from '@infrastructure/repositories/shared/BaseRepository'
import type { User } from '@domain/entities/User'
import type { IUserRepository } from '@domain/interfaces/user/IUserRepository'
import type { HttpClient } from '@infrastructure/repositories/shared/HttpClient'

export class AuthentificationRepository extends BaseRepository<User> implements IUserRepository {
  constructor(public httpClient: HttpClient) {
    super(httpClient)
  }
}
