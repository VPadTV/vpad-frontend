import { ERepositories } from '@/infrastructure/constants'
import { RepositoryFactory } from '@/infrastructure/repositories/shared/RepositoryFactory'
import type { AuthenticationRepository } from '@infrastructure/repositories/authentication/AuthenticationRepository'
import { AuthenticationUseCase } from '@domain/use-cases/authentication/AuthenticationUseCase'

const authenticationRepository = RepositoryFactory.createRepository(
  ERepositories.Authentication
) as AuthenticationRepository

const authenticationUseCase = new AuthenticationUseCase(authenticationRepository)

export { authenticationUseCase }
