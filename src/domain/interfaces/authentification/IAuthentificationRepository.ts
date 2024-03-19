import type { IBaseRepository } from '@domain/interfaces/shared/IBaseRepository'
import type { User } from '@domain/entities/User'

export interface IAuthentificationRepository extends IBaseRepository<User> {}
