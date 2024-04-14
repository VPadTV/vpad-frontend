import type { IBaseRepository } from '@domain/interfaces/shared/IBaseRepository'
import type { User } from '@domain/entities/User'

export interface IAuthenticationRepository extends IBaseRepository<User> {}
